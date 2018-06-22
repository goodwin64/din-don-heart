import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import {
  historyPT,
  isLoginFetchingPT,
  localizationPT,
  userLogInPT,
  userLogOutPT,
  userStartLoginPT,
} from '../../helpers/proptypes.helper';
import LoginContainer from './LoginForm.styled';
import { userLoggedIn, userLoggedOut, userStartLogin } from '../../actions/userActions';
import FakeAuthService from './FakeAuthService';
import Loader from '../Loader/Loader';

export class LoginForm extends React.PureComponent {
  static propTypes = {
    localization: localizationPT.isRequired,
    userLoggedIn: userLogInPT.isRequired,
    userLoggedOut: userLogOutPT.isRequired,
    userStartLogin: userStartLoginPT.isRequired,
    isLoginFetching: isLoginFetchingPT.isRequired,
    history: historyPT.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  isLoginDisallowed() {
    return !(
      this.state.email.length > 0 && this.state.password.length > 0
    );
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.userStartLogin();
    const email = event.target.email.value;
    const credentials = {
      email,
    };

    FakeAuthService(credentials)
      .then(() => this.props.userLoggedIn(email))
      .then(() => this.props.history.push('/home'))
      .catch(this.props.userLoggedOut);
  };

  render() {
    return (
      <LoginContainer>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>{this.props.localization.emailLabel}</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>{this.props.localization.passwordLabel}</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          {
            this.props.isLoginFetching
              ? <Loader />
              : (
                <Button block bsSize="large" type="submit" disabled={this.isLoginDisallowed()}>
                  {this.props.localization.loginButtonText}
                </Button>
              )
          }
        </form>
      </LoginContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isLoginFetching: state.user.isLoginFetching,
    localization: state.appCommonParams.localization,
  };
}

export default connect(mapStateToProps, {
  userLoggedIn,
  userLoggedOut,
  userStartLogin,
})(LoginForm);
