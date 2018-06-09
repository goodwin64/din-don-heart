import React from 'react';
import { shallow } from 'enzyme';

import { LoginForm } from './LoginForm';
import { PasswordInput, UsernameInput } from './LoginForm.styled';

describe('Login form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginForm
      localization={{
          tooShort: 'too short text',
          tooLong: 'too long text',
        }}
    />);
  });

  it('should render login and password inputs', () => {
    expect(wrapper.find(UsernameInput).length).toEqual(1);
    expect(wrapper.find(PasswordInput).length).toEqual(1);
  });

  it('should add "error" prop if pass is too short/long', () => {
    expect(wrapper.find(PasswordInput).prop('error')).toBeNull();
    console.log('wrapper.debug() 1', wrapper.debug());

    wrapper.find(PasswordInput).simulate('change', {
      target: {
        value: '',
        dataset: { inputType: 'password' },
      },
    });

    expect(wrapper.find(PasswordInput).prop('error')).toEqual('too short text');

    wrapper.find(PasswordInput).simulate('change', {
      target: {
        value: '12345678',
        dataset: { inputType: 'password' },
      },
    });

    expect(wrapper.find(PasswordInput).prop('error')).toBeNull();

    wrapper.find(PasswordInput).simulate('change', {
      target: {
        value: '1234567890_1234567890_1234567890',
        dataset: { inputType: 'password' },
      },
    });

    expect(wrapper.find(PasswordInput).prop('error')).toEqual('too long text');
  });
});
