import React from 'react';
import { mount } from 'enzyme';

import { LoginForm } from './LoginForm';

const getFakeInputEvent = (inputValue, inputType) => ({
  target: {
    value: inputValue,
    id: inputType,
  },
});

describe('Login form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LoginForm
      localization={{
        emailLabel: 'email',
        passwordLabel: 'pass',
        loginButtonText: 'log in',
      }}
    />);
  });

  it('should disable Login button if email/pass too short', () => {
    // initial state: both email and password are empty (incorrect)
    expect(wrapper.find('button[type="submit"]').prop('disabled')).toBe(true);

    wrapper
      .find('input[type="email"]')
      .simulate('change', getFakeInputEvent('email@example.com', 'email'));
    // only email is correct
    expect(wrapper.find('button[type="submit"]').prop('disabled')).toBe(true);

    wrapper
      .find('input[type="password"]')
      .simulate('change', getFakeInputEvent('12345678', 'password'));
    // both email and password are correct
    expect(wrapper.find('button[type="submit"]').prop('disabled')).toBe(false);

    wrapper
      .find('input[type="email"]')
      .simulate('change', getFakeInputEvent('', 'email'));
    // empty email, incorrect
    expect(wrapper.find('button[type="submit"]').prop('disabled')).toBe(true);
  });
});
