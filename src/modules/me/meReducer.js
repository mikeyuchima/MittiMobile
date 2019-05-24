// action types
import {
  ME_GET,
  ME_GET_SUCCESS,
  ME_GET_ERROR,
  ME_UPDATE_MY_PROFILE,
  ME_UPDATE_MY_PROFILE_SUCCESS,
  ME_UPDATE_MY_PROFILE_ERROR,
  ME_UPDATE_MY_SETTINGS,
  ME_UPDATE_MY_SETTINGS_SUCCESS,
  ME_UPDATE_MY_SETTINGS_ERROR,
  ME_GET_QUESTIONS,
  ME_GET_QUESTIONS_SUCCESS,
  ME_GET_QUESTIONS_ERROR,
  ME_SET_QUESTION,
  ME_GET_STATS,
  ME_GET_STATS_SUCCESS,
  ME_GET_STATS_ERROR,
} from './meActions';

// other module action types
import {
  AUTH_DESTROY_SESSION,
} from '../auth/authActions';

const initialState = {
  isFetchingMe: false,
  isUpdatingMyProfile: false,
  isUpdatingMySettings: false,
  me: null,
  isFetchingMyQuestions: false,
  myQuestions: [],
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case AUTH_DESTROY_SESSION: {
      return {
        ...initialState,
      };
    }
    case ME_GET: {
      return {
        ...state,
        isFetchingMe: true,
      };
    }
    case ME_GET_SUCCESS: {
      const {me} = action;
      return {
        ...state,
        isFetchingMe: false,
        me,
      };
    }
    case ME_GET_ERROR: {
      return {
        ...state,
        isUpdatingMyProfile: false,
      };
    }
    case ME_UPDATE_MY_PROFILE: {
      return {
        ...state,
        isUpdatingMyProfile: true,
      };
    }
    case ME_UPDATE_MY_PROFILE_SUCCESS: {
      const {me} = action;
      return {
        ...state,
        isUpdatingMyProfile: false,
        me,
      };
    }
    case ME_UPDATE_MY_PROFILE_ERROR: {
      return {
        ...state,
        isUpdatingMyProfile: false,
      };
    }
    case ME_UPDATE_MY_SETTINGS: {
      return {
        ...state,
        isUpdatingMySettings: true,
      };
    }
    case ME_UPDATE_MY_SETTINGS_SUCCESS: {
      const {me} = action;
      return {
        ...state,
        isUpdatingMySettings: false,
        me,
      };
    }
    case ME_UPDATE_MY_SETTINGS_ERROR: {
      return {
        ...state,
        isUpdatingMySettings: false,
      };
    }
    case ME_GET_QUESTIONS: {
      return {
        ...state,
        isFetchingMyQuestions: true,
      };
    }
    case ME_GET_QUESTIONS_SUCCESS: {
      const {questions: myQuestions} = action;
      return {
        ...state,
        isFetchingMyQuestions: false,
        myQuestions,
      };
    }
    case ME_GET_QUESTIONS_ERROR: {
      return {
        ...state,
        isFetchingMyQuestions: false,
      };
    }
    case ME_SET_QUESTION: {
      return {
        ...state,
        myQuestions: [
          ...state.myQuestions,
          action.question,
        ],
      };
    }
    case ME_GET_STATS: {
      return {
        ...state,
        isFetchingMyStats: true,
      };
    }
    case ME_GET_STATS_SUCCESS: {
      const {stats} = action;
      return {
        ...state,
        isFetchingMyStats: false,
        me: {
          ...state.me,
          stats,
        },
      };
    }
    case ME_GET_STATS_ERROR: {
      return {
        ...state,
        isFetchingMyStats: false,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
