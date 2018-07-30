import {ActionConst} from 'react-native-router-flux';

import {
  COMMUNITY_SCENE_OPEN_ANSWER_LIST,
  COMMUNITY_SCENE_CLOSE_ANSWER_LIST,
  COMMUNITY_SCENE_CHANGE_TEXT_VALUE,
  COMMUNITY_SCENE_OPEN_OPTION_DROPDOWN,
  COMMUNITY_SCENE_CLOSE_OPTION_DROPDOWN,
  COMMUNITY_SCENE_SET_FOCUS_FLAG,
  COMMUNITY_SCENE_RESET_FOCUS_FLAG,
  COMMUNITY_SCENE_FIND_QUESTIONS,
  COMMUNITY_SCENE_FIND_QUESTIONS_SUCCESS,
  COMMUNITY_SCENE_FIND_QUESTIONS_ERROR,
  COMMUNITY_SCENE_FIND_QUESTION,
  COMMUNITY_SCENE_FIND_QUESTION_SUCCESS,
  COMMUNITY_SCENE_FIND_QUESTION_ERROR,
  COMMUNITY_SCENE_CREATE_POST_OPEN,
  COMMUNITY_SCENE_CREATE_POST_CLOSE,
  COMMUNITY_SCENE_CREATE_ANSWER,
  COMMUNITY_SCENE_CREATE_ANSWER_SUCCESS,
  COMMUNITY_SCENE_CREATE_ANSWER_ERROR,
  COMMUNITY_SCENE_FIND_ANSWERS,
  COMMUNITY_SCENE_FIND_ANSWERS_SUCCESS,
  COMMUNITY_SCENE_FIND_ANSWERS_ERROR,
  COMMUNITY_SCENE_MARK_CLOSE_QUESTION,
  COMMUNITY_SCENE_MARK_CLOSE_QUESTION_SUCCESS,
  COMMUNITY_SCENE_MARK_CLOSE_QUESTION_ERROR,
  COMMUNITY_SCENE_REGION_CHANGE,
} from './communityActions';

const initialState = {
  answerText: '',
  isCreatingAnswer: false,
  isAnswerListOpen: false,
  isAnswerInputOnFocus: false,
  isOptionDropdownOpen: false,
  isCreatePostModalOpen: false,
  isRegionChanged: false,
  question: {},
  questions: [],
  isFetchingQuestions: false,
  answers: [],
  isFetchingAnswers: false,
  currentRegion: {},
  questionId: null,
};

export default function communityScene(state = initialState, action) {
  switch (action.type) {
    case ActionConst.PUSH: {
      // this is to make sure the answer list is always closed
      return {
        ...state,
        isAnswerListOpen: false,
        navigationParams: action.navigationParams, // TODO figure this out what to do
      };
    }
    case COMMUNITY_SCENE_OPEN_ANSWER_LIST: {
      return {
        ...state,
        answers: [],
        isAnswerListOpen: true,
        isAnswerInputOnFocus: false,
        isOptionDropdownOpen: false,
        question: action.question,
      };
    }
    case COMMUNITY_SCENE_CLOSE_ANSWER_LIST: {
      return {
        ...state,
        answers: [],
        isAnswerListOpen: false,
        isAnswerInputOnFocus: false,
        isOptionDropdownOpen: false,
        question: {},
      };
    }
    case COMMUNITY_SCENE_CHANGE_TEXT_VALUE: {
      return {
        ...state,
        answerText: action.answerText,
        isAnswerListOpen: true,
        isOptionDropdownOpen: false,
        isAnswerInputOnFocus: true,
      };
    }
    case COMMUNITY_SCENE_OPEN_OPTION_DROPDOWN: {
      return {
        ...state,
        isAnswerListOpen: true,
        isOptionDropdownOpen: true,
        isAnswerInputOnFocus: false,
      };
    }
    case COMMUNITY_SCENE_CLOSE_OPTION_DROPDOWN: {
      return {
        ...state,
        isOptionDropdownOpen: false,
        isAnswerInputOnFocus: false,
      };
    }
    case COMMUNITY_SCENE_SET_FOCUS_FLAG: {
      return {
        ...state,
        isAnswerListOpen: true,
        isOptionDropdownOpen: false,
        isAnswerInputOnFocus: true,
      };
    }
    case COMMUNITY_SCENE_RESET_FOCUS_FLAG: {
      return {
        ...state,
        isAnswerInputOnFocus: false,
      };
    }
    case COMMUNITY_SCENE_FIND_QUESTIONS: {
      return {
        ...state,
        isFetchingQuestions: true,
        isRegionChanged: false,
      };
    }
    case COMMUNITY_SCENE_FIND_QUESTIONS_SUCCESS: {
      const {questions} = action;
      return {
        ...state,
        isFetchingQuestions: false,
        questions,
      };
    }
    case COMMUNITY_SCENE_FIND_QUESTIONS_ERROR: {
      return {
        ...state,
        isFetchingQuestions: false,
      };
    }
    case COMMUNITY_SCENE_FIND_QUESTION: {
      const {questionId} = action;

      return {
        ...state,
        isFetchingQuestions: true,
        isRegionChanged: false,
        questionId,
      };
    }
    case COMMUNITY_SCENE_FIND_QUESTION_SUCCESS: {
      const {question} = action;
      const questions = [{obj: question}];
      return {
        ...state,
        isFetchingQuestions: false,
        questions,
      };
    }
    case COMMUNITY_SCENE_FIND_QUESTION_ERROR: {
      return {
        ...state,
        isFetchingQuestions: false,
      };
    }
    case COMMUNITY_SCENE_CREATE_POST_OPEN: {
      return {
        ...state,
        isCreatePostModalOpen: true,
      };
    }
    case COMMUNITY_SCENE_CREATE_POST_CLOSE: {
      return {
        ...state,
        isCreatePostModalOpen: false,
      };
    }
    case COMMUNITY_SCENE_FIND_ANSWERS: {
      return {
        ...state,
        isFetchingAnswers: true,
        isAnswerListOpen: true,
      };
    }
    case COMMUNITY_SCENE_FIND_ANSWERS_SUCCESS: {
      const {answers} = action;
      return {
        ...state,
        answerText: '',
        isFetchingAnswers: false,
        answers,
      };
    }
    case COMMUNITY_SCENE_FIND_ANSWERS_ERROR: {
      return {
        ...state,
        isFetchingAnswers: false
      };
    }
    case COMMUNITY_SCENE_CREATE_ANSWER: {
      return {
        ...state,
        isCreatingAnswer: true,
      };
    }
    case COMMUNITY_SCENE_CREATE_ANSWER_SUCCESS: {
      const {answer} = action;
      return {
        ...state,
        isCreatingAnswer: false,
        answerText: '',
        answers: [
          ...state.answers,
          answer,
        ],
      };
    }
    case COMMUNITY_SCENE_CREATE_ANSWER_ERROR: {
      return {
        ...state,
        isCreatingAnswer: false
      };
    }
    // case COMMUNITY_SCENE_MARK_CLOSE_QUESTION: {
    //   return {
    //     ...state,
    //     isCreatingAnswer: true,
    //   };
    // }
    case COMMUNITY_SCENE_MARK_CLOSE_QUESTION_SUCCESS: {
      const {question} = action;
      const questions = state.questions.filter(q => q.obj._id !== question._id);
      return {
        ...state,
        questions,
        isAnswerListOpen: false,
      };
    }
    // case COMMUNITY_SCENE_MARK_CLOSE_QUESTION_ERROR: {
    //   return {
    //     ...state,
    //     isCreatingAnswer: false
    //   };
    // }
    case COMMUNITY_SCENE_REGION_CHANGE: {
      return {
        ...state,
        currentRegion: action.region,
        isRegionChanged: true,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
