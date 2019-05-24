// action types
import {
  AUTH_CREATE_SESSION,
  AUTH_DESTROY_SESSION,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_ERROR,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
} from './authActions';

// storage
import {STORAGE_KEYS} from '../../constants/constants';
import {AsyncStorage} from 'react-native';

const initialState = {
  token: null,
  isLoggingIn: false,
  isResetting: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_CREATE_SESSION: {
      const {token} = action;
      AsyncStorage.setItem(STORAGE_KEYS.token, token);
      return {
        ...state,
        token,
      };
    }
    case AUTH_DESTROY_SESSION: {
      AsyncStorage.removeItem(STORAGE_KEYS.token);
      return {
        ...initialState,
      };
    }
    case AUTH_LOGIN: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
      };
    }
    case AUTH_LOGIN_ERROR: {
      return {
        ...state,
        isLoggingIn: false
      };
    }
    case AUTH_RESET_PASSWORD: {
      return {
        ...state,
        isResetting: true,
      };
    }
    case AUTH_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetting: false,
      };
    }
    case AUTH_RESET_PASSWORD_ERROR: {
      return {
        ...state,
        isResetting: false
      };
    }
    case AUTH_REGISTER: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
      };
    }
    case AUTH_REGISTER_ERROR: {
      return {
        ...state,
        isLoggingIn: false
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
