// action types
import {
  SOME_ACTION,
} from './boilerplateActions';

// module action types
import {
  AUTH_LOGIN_SUCCESS,
} from '../../modules/auth/authActions';

const initialState = {
  form: {
    username: '',
    password: '',
  },
};

export default function boilerplateScene(state = initialState, action) {
  switch (action.type) {
    case SOME_ACTION: {
      const {name, value} = action;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        },
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        form: {
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
