// storage
import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS } from '../../constants/constants';

// api
import * as authApi from '../../api/authApi.js'; // uncomment this for real api
// import * as authApi from '../../api/authMock.js'; // mock api for testing

// other module actions
import * as navigationActions from '../navigation/navigationActions';
import * as appActions from '../app/appActions';
import * as meActions from '../me/meActions';

// i18n
import dictionary from './dictionary';
import { t } from '../../i18n';

// other
import { SCENES } from '../../routes';
import { ActionConst } from 'react-native-router-flux';

// action types
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_ERROR = 'AUTH_LOGOUT_ERROR';
export const AUTH_CREATE_SESSION = 'AUTH_CREATE_SESSION';
export const AUTH_DESTROY_SESSION = 'AUTH_DESTROY_SESSION';
export const AUTH_GET_LAST_SESSION = 'AUTH_GET_LAST_SESSION';
export const AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD';
export const AUTH_RESET_PASSWORD_SUCCESS = 'AUTH_RESET_PASSWORD_SUCCESS';
export const AUTH_RESET_PASSWORD_ERROR = 'AUTH_RESET_PASSWORD_ERROR';
export const AUTH_REGISTER = 'AUTH_REGISTER';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';
export const AUTH_REQUEST_VERIFICATION = 'AUTH_REQUEST_VERIFICATION';
export const AUTH_REQUEST_VERIFICATION_SUCCESS = 'AUTH_REQUEST_VERIFICATION_SUCCESS';
export const AUTH_REQUEST_VERIFICATION_ERROR = 'AUTH_REQUEST_VERIFICATION_ERROR';

const _login = () => ({
  type: AUTH_LOGIN,
});

const _loginSuccess = token => ({
  type: AUTH_LOGIN_SUCCESS,
  token,
});

const _loginError = error => ({
  type: AUTH_LOGIN_ERROR,
  error,
});

export const login = (username, password) => {
  return (dispatch, getState) => {
    dispatch(_login());

    // return authApi.loginBadRequest(username, password) // uncomment this to test bad request on login
    return authApi
      .login(username, password)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(resp => {
        const { token } = resp;

        dispatch(_loginSuccess(token));
        dispatch(createSession(token));
        dispatch(meActions.getMe());
        dispatch(navigationActions.changeScene(SCENES.home.key, {}, ActionConst.RESET));
        dispatch(appActions.onMessage(t(dictionary.loginSuccess)));
        return resp;
      })
      .catch(error => {
        dispatch(_loginError(error));
        return error;
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({
      type: AUTH_LOGOUT,
    });
    dispatch(destroySession());
    dispatch(navigationActions.changeScene(SCENES.login.key, {}, ActionConst.RESET));
  };
};

const _resetPassword = () => ({
  type: AUTH_RESET_PASSWORD,
});

const _resetPasswordSuccess = token => ({
  type: AUTH_RESET_PASSWORD_SUCCESS,
  token,
});

const _resetPasswordError = error => ({
  type: AUTH_RESET_PASSWORD_ERROR,
  error,
});

export const resetPassword = username => {
  return (dispatch, getState) => {
    dispatch(_resetPassword());

    return authApi
      .resetPassword(username)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(resp => {
        const { token } = resp;

        dispatch(_resetPasswordSuccess(token));
        dispatch(navigationActions.changeScene(SCENES.login.key, {}, ActionConst.RESET));
        dispatch(appActions.onMessage(t(dictionary.passwordSent)));
        return resp;
      })
      .catch(error => {
        dispatch(_resetPasswordError(error));
        return error;
      });
  };
};

const _register = () => ({
  type: AUTH_REGISTER,
});

const _registerSuccess = token => ({
  type: AUTH_REGISTER_SUCCESS,
  token,
});

const _registerError = error => ({
  type: AUTH_REGISTER_ERROR,
  error,
});

const _requestVerification = () => ({
  type: AUTH_REQUEST_VERIFICATION,
});

const _requestVerificationSuccess = () => ({
  type: AUTH_REQUEST_VERIFICATION_SUCCESS,
});

const _requestVerificationError = error => ({
  type: AUTH_REQUEST_VERIFICATION_ERROR,
  error,
});

export const register = (fullName, username, password) => {
  let nameSegments = fullName.split(' '),
    firstName = nameSegments.shift(),
    lastName = nameSegments.join(' ');
  let profile = {
    firstName: firstName,
    lastName: lastName,
  };

  return (dispatch, getState) => {
    dispatch(_register());

    return authApi
      .register(profile, username, password)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(resp => {
        const { token } = resp;

        dispatch(_registerSuccess(token));
        dispatch(createSession(token));
        dispatch(meActions.getMe());
        dispatch(navigationActions.changeScene(SCENES.tour.key, {}, ActionConst.RESET));
        dispatch(appActions.onMessage(t(dictionary.registerSuccess)));
        return resp;
      })
      .catch(error => {
        dispatch(_registerError(error));
        return error;
      });
  };
};

export const requestVerification = (username) => {
  return (dispatch, getState) => {
    dispatch(_requestVerification());

    return authApi
      .resendVerification(username)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(resp => {
        dispatch(_requestVerificationSuccess());
        dispatch(appActions.onMessage(t(dictionary.verificationResent)));
        return resp;
      })
      .catch(error => {
        dispatch(_requestVerificationError(error));
        return error;
      });
  };
};

export const getLastSession = () => {
  return (dispatch, getState) => {
    dispatch({
      type: AUTH_GET_LAST_SESSION,
    });
    return AsyncStorage.getItem(STORAGE_KEYS.token, (error, token) => {
      if (!error && token) {
        dispatch(createSession(token));
        dispatch(meActions.getMe());
      }
      return token;
    });
  };
};

export const createSession = token => ({
  type: AUTH_CREATE_SESSION,
  token,
});

export const destroySession = () => ({
  type: AUTH_DESTROY_SESSION,
});
