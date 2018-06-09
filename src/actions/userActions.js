import { USER_LOGIN_FETCHING, USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants/actionTypes';

export const userLoggedIn = () => ({
  type: USER_LOGGED_IN,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const userStartLogin = () => ({
  type: USER_LOGIN_FETCHING,
});
