import { USER_LOGIN_FETCHING, USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from '../constants/actionTypes';

export const userLoggedIn = email => ({
  type: USER_LOGGED_IN,
  payload: {
    email,
  },
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const userStartLogin = () => ({
  type: USER_LOGIN_FETCHING,
});

export const signUpUser = email => ({
  type: USER_SIGNED_UP,
  payload: {
    email,
  },
});
