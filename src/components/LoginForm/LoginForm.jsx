import React from 'react';

import { PasswordInput, UsernameInput } from './LoginForm.styled';

class LoginForm extends React.Component {
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
      nextSubState.error = 'too short';
    } else if (isPassword && inputValue.length > 20) {
      nextSubState.error = 'too long';
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
          value="Log in"
          disabled={this.isLoginDisallowed()}
        />
      </form>
    );
  }
}

export default LoginForm;
