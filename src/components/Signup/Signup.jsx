import React from 'react';
import { connect } from 'react-redux';

import {
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

import LoaderButton from '../Loader/LoaderButton';
import './Signup.css';
import { signUpUser } from '../../actions/userActions';
import FakeAuthService from '../LoginForm/FakeAuthService';
import { signedUpUsernamePT, signUpUserPT } from '../../helpers/proptypes.helper';

export class Signup extends React.Component {
  static propTypes = {
    signUpUser: signUpUserPT.isRequired,
    signedUpUsername: signedUpUsernamePT,
  };

  static defaultProps = {
    signedUpUsername: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      newUser: null,
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const { email } = this.state;

    FakeAuthService.signUp({
      email,
      password: this.state.password,
    })
      .then(() => {
        this.setState({ newUser: email });
        this.props.signUpUser(email);
      })
      .catch(() => console.error('User already exists'))
      .then(() => {
        this.setState({ isLoading: false });
      });
  };

  renderSignedUpMessage() {
    return (
      <div>
        You were signed up as {this.props.signedUpUsername}
      </div>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderSignedUpMessage()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isLoginFetching: state.user.isLoginFetching,
    signedUpUsername: state.user.signedUpUsername,
    localization: state.appCommonParams.localization,
  };
}

export default connect(mapStateToProps, {
  signUpUser,
})(Signup);
