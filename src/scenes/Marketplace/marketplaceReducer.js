import {
  MARKETPLACE_SCENE_SET_TYPE,
  MARKETPLACE_SCENE_SET_AREA,
  MARKETPLACE_SCENE_GET_POSTS,
  MARKETPLACE_SCENE_GET_POSTS_SUCCESS,
  MARKETPLACE_SCENE_GET_POSTS_ERROR,
  MARKETPLACE_SCENE_CREATE_POST_OPEN,
  MARKETPLACE_SCENE_CREATE_POST_CLOSE,
  MARKETPLACE_SCENE_GET_POST,
  MARKETPLACE_SCENE_GET_POST_SUCCESS,
  MARKETPLACE_SCENE_GET_POST_ERROR,
  MARKETPLACE_SCENE_REGION_CHANGE,
} from './marketplaceActions';

const initialState = {
  item: {},
  items: [],
  isFetchingItems: false,
  isCreatePostModalOpen: false,
  marketType: '',
  area: {},
  currentRegion: {},
  isRegionChanged: false,
};

export default function marketplaceScene(state = initialState, action) {
  switch (action.type) {
    case MARKETPLACE_SCENE_SET_TYPE: {
      return {
        ...state,
        marketType: action.marketType,
      };
    }
    case MARKETPLACE_SCENE_SET_AREA: {
      const area = {
        locality: action.geocodeData.locality,
        radius: action.me.settings.defaultRadius,
        radiusUnit: action.me.settings.radiusUnit,
      };

      return {
        ...state,
        area,
      };
    }
    case MARKETPLACE_SCENE_GET_POSTS: {
      return {
        ...state,
        isFetchingItems: true,
        isRegionChanged: false,
      };
    }
    case MARKETPLACE_SCENE_GET_POSTS_SUCCESS: {
      const {items} = action;
      return {
        ...state,
        isFetchingItems: false,
        items,
      };
    }
    case MARKETPLACE_SCENE_GET_POSTS_ERROR: {
      return {
        ...state,
        isFetchingItems: false
      };
    }
    case MARKETPLACE_SCENE_CREATE_POST_OPEN: {
      return {
        ...state,
        isCreatePostModalOpen: true,
      };
    }
    case MARKETPLACE_SCENE_CREATE_POST_CLOSE: {
      return {
        ...state,
        isCreatePostModalOpen: false,
      };
    }
    case MARKETPLACE_SCENE_GET_POST: {
      return {
        ...state,
        isFetchingItems: true,
        item: {},
      };
    }
    case MARKETPLACE_SCENE_GET_POST_SUCCESS: {
      return {
        ...state,
        isFetchingItems: false,
        item: action.item,
      };
    }
    case MARKETPLACE_SCENE_GET_POST_ERROR: {
      return {
        ...state,
        isFetchingItems: false,
      };
    }
    case MARKETPLACE_SCENE_REGION_CHANGE: {
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
