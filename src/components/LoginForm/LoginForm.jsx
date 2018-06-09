import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { localizationPT } from '../../helpers/proptypes.helper';
import LoginContainer from './LoginForm.styled';

export class LoginForm extends React.Component {
  static propTypes = {
    localization: localizationPT.isRequired,
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
          <Button
            block
            bsSize="large"
            disabled={this.isLoginDisallowed()}
            type="submit"
          >
            {this.props.localization.loginButtonText}
          </Button>
        </form>
      </LoginContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    localization: state.appCommonParams.localization,
  };
}

export default connect(mapStateToProps)(LoginForm);
