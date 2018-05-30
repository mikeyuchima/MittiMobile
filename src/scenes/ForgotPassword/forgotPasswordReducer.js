// action types
import {
  FORGOT_PASSWORD_SCENE_CHANGE_FORM_VALUE,
} from './forgotPasswordActions';

// module action types
import {
  AUTH_RESET_PASSWORD_SUCCESS,
} from '../../modules/auth/authActions';

const initialState = {
  form: {
    username: '',
  },
};

export default function forgotPasswordScene(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_SCENE_CHANGE_FORM_VALUE: {
      const {name, value} = action;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        },
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
