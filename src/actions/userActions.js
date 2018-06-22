import { USER_LOGIN_FETCHING, USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants/actionTypes';

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
