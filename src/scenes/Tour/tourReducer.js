import {
  TOUR_SCENE_CHANGE_PAGE,
} from './tourActions';

const initialState = {
  page: 1,
};

export default function tourScene(state = initialState, action) {
  switch (action.type) {
    case TOUR_SCENE_CHANGE_PAGE: {
      const { page } = action;

      return {
        ...state,
        page,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
