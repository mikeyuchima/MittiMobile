import {
  HOME_SCENE_GET_MARKERS,
  HOME_SCENE_GET_MARKERS_SUCCESS,
  HOME_SCENE_GET_MARKERS_ERROR,
  HOME_SCENE_CREATE_POST_OPEN,
  HOME_SCENE_CREATE_POST_CLOSE,
  HOME_SCENE_GET_POSTS,
  HOME_SCENE_GET_POSTS_SUCCESS,
  HOME_SCENE_GET_POSTS_ERROR,
  HOME_SCENE_GET_POST,
  HOME_SCENE_GET_POST_SUCCESS,
  HOME_SCENE_GET_POST_ERROR,
  HOME_SCENE_REGION_CHANGE,
} from './homeActions';
import {
  RADIUS_CHANGE_VALUE,
} from '../../modules/radius/radiusActions';

const initialState = {
  isCreatePostModalOpen: false,
  isFetchingItem: false,
  isFetchingItems: false,
  isRegionChanged: false,
  currentRegion: null,
  item: {},
  items: [],
};

export default function homeScene(state = initialState, action) {
  switch (action.type) {
    // case ActionConst.PUSH: {
    //   return {
    //     ...state,
    //   };
    // }
    case RADIUS_CHANGE_VALUE: {
      return {
        ...state,
        isRegionChanged: true,
      };
    }
    case HOME_SCENE_CREATE_POST_OPEN: {
      return {
        ...state,
        isCreatePostModalOpen: true,
      };
    }
    case HOME_SCENE_CREATE_POST_CLOSE: {
      return {
        ...state,
        isCreatePostModalOpen: false,
      };
    }
    case HOME_SCENE_GET_MARKERS: {
      return {
        ...state,
        radius: action.radius,
        radiusUnit: action.radiusUnit,
      };
    }
    case HOME_SCENE_GET_MARKERS_SUCCESS: {
      return {
        ...state,
        markers: action.markers,
      };
    }
    case HOME_SCENE_GET_MARKERS_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case HOME_SCENE_GET_POSTS: {
      return {
        ...state,
        isFetchingItems: true,
        isRegionChanged: false,
      };
    }
    case HOME_SCENE_GET_POSTS_SUCCESS: {
      const {items} = action;
      return {
        ...state,
        isFetchingItems: false,
        items,
      };
    }
    case HOME_SCENE_GET_POSTS_ERROR: {
      return {
        ...state,
        isFetchingItems: false
      };
    }
    case HOME_SCENE_GET_POST: {
      return {
        ...state,
        isFetchingItem: true,
        item: {},
      };
    }
    case HOME_SCENE_GET_POST_SUCCESS: {
      return {
        ...state,
        isFetchingItem: false,
        item: action.item,
      };
    }
    case HOME_SCENE_GET_POST_ERROR: {
      return {
        ...state,
        isFetchingItem: false,
      };
    }
    case HOME_SCENE_REGION_CHANGE: {
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
