// action types
import {
  REGISTER_SCENE_CHANGE_FORM_VALUE,
} from './createAccountActions';

// module action types
import {
  AUTH_REGISTER_SUCCESS,
} from '../../modules/auth/authActions';

const initialState = {
  form: {
    fullName: '',
    username: '',
    password: '',
  },
};

export default function createAccountScene(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SCENE_CHANGE_FORM_VALUE: {
      const {name, value} = action;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        },
      };
    }
    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        form: {
          fullName: '',
          username: '',
          password: '',
        },
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
