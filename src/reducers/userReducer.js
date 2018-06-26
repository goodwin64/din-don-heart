import { USER_LOGIN_FETCHING, USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from '../constants/actionTypes';

export const userInitialState = {
  isLoggedIn: false,
  isLoginFetching: false,
  type: 'guest',
  name: 'Anonymous',
  signedUpUsername: null,
};

export default function ecgResultReducer(state = userInitialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: true,
        isLoginFetching: false,
        type: action.payload.email.includes('admin') ? 'admin' : 'user',
      };
    }

    case USER_LOGGED_OUT: {
      return userInitialState;
    }

    case USER_LOGIN_FETCHING: {
      return {
        ...state,
        isLoginFetching: true,
      };
    }

    case USER_SIGNED_UP: {
      const email = action.payload.email || '';
      const username = email.replace(/@.*/, '');
      return {
        ...state,
        signedUpUsername: username,
      };
    }

    default: {
      return state;
    }
  }
}
