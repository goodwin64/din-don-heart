import React from 'react';
import { connect } from 'react-redux';

import { PasswordInput, UsernameInput } from './LoginForm.styled';
import { localizationPT } from '../../helpers/proptypes.helper';

export class LoginForm extends React.Component {
  static propTypes = {
    localization: localizationPT.isRequired,
  };

  constructor(props) {
    super(props);

    const defaultInputParameters = {
      value: '',
      error: null,
    };

    this.state = {
      username: { ...defaultInputParameters },
      password: { ...defaultInputParameters },
    };
  }

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    const { inputType } = event.target.dataset;

    const nextSubState = {
      value: inputValue,
      error: null,
    };

    const isPassword = inputType === 'password';
    if (isPassword && inputValue.length < 8) {
      console.log('this.props.localization.tooShort', this.props.localization.tooShort);
      nextSubState.error = this.props.localization.tooShort;
    } else if (isPassword && inputValue.length > 20) {
      console.log('this.props.localization.tooLong', this.props.localization.tooLong);
      nextSubState.error = this.props.localization.tooLong;
    }

    this.setState({
      [inputType]: nextSubState,
    });
  };

  isLoginDisallowed = () => (
    this.state.username.error ||
    this.state.username.value.length === 0 ||
    this.state.password.error ||
    this.state.password.value.length === 0
  );

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <UsernameInput
          value={this.state.username.value}
          error={this.state.username.error}
          data-input-type="username"
          type="email"
          placeholder="name@example.com"
          onChange={this.handleInputChange}
          required
        />
        <PasswordInput
          value={this.state.password.value}
          error={this.state.password.error}
          data-input-type="password"
          type="password"
          placeholder="password"
          onChange={this.handleInputChange}
          required
        />
        <input
          type="submit"
          value={this.props.localization.loginButtonText}
          disabled={this.isLoginDisallowed()}
        />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    localization: state.appCommonParams.localization,
  };
}

export default connect(mapStateToProps)(LoginForm);
