import {
  MYPOSTS_SCENE_SET_TYPE,
  MYPOSTS_SCENE_GET_POSTS,
  MYPOSTS_SCENE_GET_POSTS_SUCCESS,
  MYPOSTS_SCENE_GET_POSTS_ERROR,
  MYPOSTS_SCENE_GET_MESSAGES,
  MYPOSTS_SCENE_GET_MESSAGES_SUCCESS,
  MYPOSTS_SCENE_GET_MESSAGES_ERROR,
  MYPOSTS_SCENE_CREATE_POST_OPEN,
  MYPOSTS_SCENE_CREATE_POST_CLOSE,
} from './myPostsActions';

const initialState = {
  items: {},
  isFetchingItems: false,
  isCreatePostModalOpen: false,
  marketType: '',
  area: {},
  chats: {},
};

export default function myPostsScene(state = initialState, action) {
  switch (action.type) {
    case MYPOSTS_SCENE_SET_TYPE: {
      return {
        ...state,
        marketType: action.marketType,
      };
    }
    case MYPOSTS_SCENE_GET_POSTS: {
      return {
        ...state,
        isFetchingItems: true,
      };
    }
    case MYPOSTS_SCENE_GET_POSTS_SUCCESS: {
      const {items} = action;
      return {
        ...state,
        isFetchingItems: false,
        items,
      };
    }
    case MYPOSTS_SCENE_GET_POSTS_ERROR: {
      return {
        ...state,
        isFetchingItems: false
      };
    }
    case MYPOSTS_SCENE_GET_MESSAGES: {
      return {
        ...state,
        isFetchingItems: true
      };
    }
    case MYPOSTS_SCENE_GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        isFetchingItems: false,
        chats: action.chats,
      };
    }
    case MYPOSTS_SCENE_GET_MESSAGES_ERROR: {
      return {
        ...state,
        isFetchingItems: false
      };
    }
    case MYPOSTS_SCENE_CREATE_POST_OPEN: {
      return {
        ...state,
        isCreatePostModalOpen: true,
      };
    }
    case MYPOSTS_SCENE_CREATE_POST_CLOSE: {
      return {
        ...state,
        isCreatePostModalOpen: false,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
