import { USER_LOGIN_FETCHING, USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants/actionTypes';

export const userInitialState = {
  isLoggedIn: false,
  isLoginFetching: false,
};

export default function ecgResultReducer(state = userInitialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: true,
        isLoginFetching: false,
      };
    }

    case USER_LOGGED_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        isLoginFetching: false,
      };
    }

    case USER_LOGIN_FETCHING: {
      return {
        ...state,
        isLoginFetching: true,
      };
    }

    default: {
      return state;
    }
  }
}
