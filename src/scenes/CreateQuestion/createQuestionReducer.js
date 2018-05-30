import {
  CREATE_QUESTION_SCENE_SET_QUESTION_CATEGORY_ID,
  CREATE_QUESTION_SCENE_CHANGE_FORM_VALUE,
  CREATE_QUESTION_SCENE_SET_POSITION,
  CREATE_QUESTION_SCENE_SET_ADDRESS,
  CREATE_QUESTION_SCENE_CANCEL_QUESTION,
  CREATE_QUESTION_SCENE_CREATE,
  CREATE_QUESTION_SCENE_CREATE_SUCCESS,
  CREATE_QUESTION_SCENE_CREATE_ERROR,
} from './createQuestionActions';

const initialState = {
  categoryId: undefined,
  isCreatingQuestion: false,
  form: {
    question: "",
    address: "",
  },
  position: {
    // default to Toronto, ON
    lat: 43.653982,
    lng: -79.380319,
  },
};

export default function createQuestionScene(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUESTION_SCENE_SET_QUESTION_CATEGORY_ID: {
      return {
        ...state,
        categoryId: action.categoryId,
      };
    }
    case CREATE_QUESTION_SCENE_CHANGE_FORM_VALUE: {
      const {name, value} = action;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        },
      };
    }
    case CREATE_QUESTION_SCENE_SET_POSITION: {
      return {
        ...state,
        position: action.position,
      };
    }
    case CREATE_QUESTION_SCENE_SET_ADDRESS: {
      return {
        ...state,
        form: {
          ...state.form,
          address: action.address,
        }
      };
    }
    case CREATE_QUESTION_SCENE_CANCEL_QUESTION: {
      return {
        ...initialState,
        categoryId: undefined,
      };
    }
    case CREATE_QUESTION_SCENE_CREATE: {
      return {
        ...state,
        isCreatingQuestion: true,
      };
    }
    case CREATE_QUESTION_SCENE_CREATE_SUCCESS: {
      return {
        ...initialState,
        categoryId: undefined,
      };
    }
    case CREATE_QUESTION_SCENE_CREATE_ERROR: {
      return {
        ...initialState,
        categoryId: undefined,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
