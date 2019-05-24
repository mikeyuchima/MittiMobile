// action types
import {
  PROFILE_SCENE_CHANGE_FORM_VALUE,
  PROFILE_SCENE_TOGGLE_EDIT_MODE,
  PROFILE_SCENE_GET,
  PROFILE_SCENE_GET_SUCCESS,
  PROFILE_SCENE_GET_ERROR,
} from './profileActions';

// module action types
import {
  ME_UPDATE_MY_PROFILE_SUCCESS,
} from '../../modules/me/meActions';
import {
  AUTH_DESTROY_SESSION,
} from '../../modules/auth/authActions';

const initialState = {
  user: null,
  isFetchingProfile: false,
  isEditable: false,
  form: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isPhonePrivate: false,
  },
  isEditMode: false,
};

export default function profileScene(state = initialState, action) {
  switch (action.type) {
    case PROFILE_SCENE_CHANGE_FORM_VALUE: {
      const {name, value} = action;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        },
      };
    }
    case PROFILE_SCENE_TOGGLE_EDIT_MODE: {
      const {isEditMode} = action;
      return {
        ...state,
        // reset form
        form: {
          firstName: state.user.profile.firstName,
          lastName: state.user.profile.lastName,
          email: state.user.username,
          phone: state.user.profile.phone,
          isPhonePrivate: !state.user.profile.isPhonePublic,
        },
        isEditMode,
      };
    }
    case PROFILE_SCENE_GET: {
      return {
        ...state,
        isFetchingProfile: true,
      };
    }
    case PROFILE_SCENE_GET_SUCCESS: {
      const {user, isEditable} = action;
      return {
        ...state,
        user,
        isEditable,
        isFetchingProfile: false,
      };
    }
    case PROFILE_SCENE_GET_ERROR: {
      return {
        ...state,
        isFetchingProfile: false,
      };
    }
    case ME_UPDATE_MY_PROFILE_SUCCESS: {
      const {me: user} = action;
      return {
        ...state,
        user: {
          ...user,
          stats: {
            ...state.user.stats,
          }
        },
        isEditMode: false,
      };
    }
    case AUTH_DESTROY_SESSION: {
      return {
        ...initialState,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
