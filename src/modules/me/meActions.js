// api
import * as meApi from '../../api/meApi.js'; // uncomment this for real api
// import * as meApi from '../../api/meMock.js'; // mock api for testing

// other module actions
import * as appActions from '../app/appActions';
import * as authActions from '../auth/authActions';

// i18n
import dictionary from './dictionary';
import { t } from '../../i18n';

// action types
export const ME_GET = 'ME_GET';
export const ME_GET_SUCCESS = 'ME_GET_SUCCESS';
export const ME_GET_ERROR = 'ME_GET_ERROR';
export const ME_UPDATE_MY_PROFILE = 'ME_UPDATE_MY_PROFILE';
export const ME_UPDATE_MY_PROFILE_SUCCESS = 'ME_UPDATE_MY_PROFILE_SUCCESS';
export const ME_UPDATE_MY_PROFILE_ERROR = 'ME_UPDATE_MY_PROFILE_ERROR';
export const ME_UPDATE_MY_SETTINGS = 'ME_UPDATE_MY_SETTINGS';
export const ME_UPDATE_MY_SETTINGS_SUCCESS = 'ME_UPDATE_MY_SETTINGS_SUCCESS';
export const ME_UPDATE_MY_SETTINGS_ERROR = 'ME_UPDATE_MY_SETTINGS_ERROR';
export const ME_GET_QUESTIONS = 'ME_GET_QUESTIONS';
export const ME_GET_QUESTIONS_SUCCESS = 'ME_GET_QUESTIONS_SUCCESS';
export const ME_GET_QUESTIONS_ERROR = 'ME_GET_QUESTIONS_ERROR';
export const ME_SET_QUESTION = 'ME_SET_QUESTION';
export const ME_GET_STATS = 'ME_GET_STATS';
export const ME_GET_STATS_SUCCESS = 'ME_GET_STATS_SUCCESS';
export const ME_GET_STATS_ERROR = 'ME_GET_STATS_ERROR';
export const ME_REMOVE_ACCOUNT = 'ME_REMOVE_ACCOUNT';
export const ME_REMOVE_ACCOUNT_SUCCESS = 'ME_REMOVE_ACCOUNT_SUCCESS';
export const ME_REMOVE_ACCOUNT_ERROR = 'ME_REMOVE_ACCOUNT_ERROR';

export const getMyStats = () => {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({
      type: ME_GET_STATS,
    });

    return meApi
      .findStats(token)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(resp => {
        dispatch({
          type: ME_GET_STATS_SUCCESS,
          stats: resp,
        });
        return resp;
      })
      .catch(error => {
        dispatch({
          type: ME_GET_STATS_ERROR,
          error,
        });
        return error;
      });
  };
};

export const getMyQuestions = () => {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch({
      type: ME_GET_QUESTIONS,
    });

    const skip = 0;
    const limit = 10;

    return meApi
      .findQuestions(token, skip, limit)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(resp => {
        dispatch({
          type: ME_GET_QUESTIONS_SUCCESS,
          questions: resp.rows,
        });
        return resp.rows;
      })
      .catch(error => {
        dispatch({
          type: ME_GET_QUESTIONS_ERROR,
          error,
        });
        return error;
      });
  };
};

export const setMyQuestion = (question) => ({
  type: ME_SET_QUESTION,
  question,
});

const _getMe = () => ({
  type: ME_GET,
});

const _getMeSuccess = me => ({
  type: ME_GET_SUCCESS,
  me,
});

const _getMeError = error => ({
  type: ME_GET_ERROR,
  error,
});

export const getMe = () => {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(_getMe());

    // return meApi.getUnauthorized(token) // to test invalid session
    return meApi
      .get(token)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(me => {
        dispatch(_getMeSuccess(me));
        return me;
      })
      .catch(error => {
        dispatch(_getMeError(error));
        return error;
      });
  };
};

const _updateMyProfile = (me) => ({
  type: ME_UPDATE_MY_PROFILE,
  me,
});

const _updateMyProfileSuccess = me => ({
  type: ME_UPDATE_MY_PROFILE_SUCCESS,
  me,
});

const _updateMyProfileError = error => ({
  type: ME_UPDATE_MY_PROFILE_ERROR,
  error,
});

export const updateMyProfile = me => {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    dispatch(_updateMyProfile(me));

    // return meApi.getUnauthorized(token) // to test invalid session
    return meApi
      .updateMyProfile(token, me)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(me => {
        dispatch(_updateMyProfileSuccess(me));
        dispatch(appActions.onMessage(t(dictionary.profileUpdated)));
        return me;
      })
      .catch(error => {
        dispatch(_updateMyProfileError(error));
        return error;
      });

    return promise;
  };
};

const _updateMySettings = settings => ({
  type: ME_UPDATE_MY_SETTINGS,
  settings,
});

const _updateMySettingsSuccess = me => ({
  type: ME_UPDATE_MY_SETTINGS_SUCCESS,
  me,
});

const _updateMySettingsError = error => ({
  type: ME_UPDATE_MY_SETTINGS_ERROR,
  error,
});

export const updateMySettings = settings => {
  return (dispatch, getState) => {
    const { token } = getState().auth;
    dispatch(_updateMySettings(settings));

    // return meApi.getUnauthorized(token) // to test invalid session
    return meApi
      .updateMySettings(token, settings)
      .then(resp => dispatch(appActions.processApiResponse(resp)))
      .then(me => {
        dispatch(_updateMySettingsSuccess(me));
        dispatch(appActions.onMessage(t(dictionary.settingsUpdated)));
        return me;
      })
      .catch(error => {
        dispatch(_updateMySettingsError(error));
        return error;
      });

    return promise;
  };
};

const _removeAccount = () => ({
  type: ME_REMOVE_ACCOUNT,
});

const _removeAccountSuccess = () => ({
  type: ME_REMOVE_ACCOUNT_SUCCESS,
});

const _removeAccountError = error => ({
  type: ME_REMOVE_ACCOUNT_ERROR,
  error,
});

export const removeAccount = me => {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch(_removeAccount());
    return meApi
      .deleteMyProfile(token, me)
      .then(() => {
        dispatch(_removeAccountSuccess());
        dispatch(appActions.onMessage(t(dictionary.accountRemoved)));
        dispatch(authActions.logout());

        return me;
      })
      .catch(error => {
        dispatch(_removeAccountError());

        return error;
      });

    return promise;
  };
};
