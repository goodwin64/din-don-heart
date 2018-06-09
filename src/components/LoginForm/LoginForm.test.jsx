import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from './LoginForm';
import { PasswordInput, UsernameInput } from './LoginForm.styled';

describe('Login form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginPage />);
  });

  it('should render login and password inputs', () => {
    expect(wrapper.find(UsernameInput).length).toEqual(1);
    expect(wrapper.find(PasswordInput).length).toEqual(1);
  });

  it('should add "error" prop if name/pass is too short/long', () => {
    expect(wrapper.find(UsernameInput).prop('error')).toBeNull();
    expect(wrapper.find(PasswordInput).prop('error')).toBeNull();

    wrapper.find(PasswordInput).simulate('change', {
      target: {
        value: '',
        dataset: { inputType: 'username' },
      },
    });
    wrapper.find(UsernameInput).simulate('change', {
      target: {
        value: '',
        dataset: { inputType: 'password' },
      },
    });

    expect(wrapper.find(UsernameInput).prop('error')).toEqual('too short');
    expect(wrapper.find(PasswordInput).prop('error')).toEqual('too short');

    wrapper.find(UsernameInput).simulate('change', {
      target: {
        value: '12345678',
        dataset: { inputType: 'username' },
      },
    });
    wrapper.find(PasswordInput).simulate('change', {
      target: {
        value: '12345678',
        dataset: { inputType: 'password' },
      },
    });

    expect(wrapper.find(UsernameInput).prop('error')).toBeNull();
    expect(wrapper.find(PasswordInput).prop('error')).toBeNull();

    wrapper.find(PasswordInput).simulate('change', {
      target: {
        value: '1234567890_1234567890_1234567890',
        dataset: { inputType: 'username' },
      },
    });
    wrapper.find(UsernameInput).simulate('change', {
      target: {
        value: '1234567890_1234567890_1234567890',
        dataset: { inputType: 'password' },
      },
    });

    expect(wrapper.find(UsernameInput).prop('error')).toEqual('too long');
    expect(wrapper.find(PasswordInput).prop('error')).toEqual('too long');
  });
});
