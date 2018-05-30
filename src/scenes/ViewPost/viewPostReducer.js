import {
  VIEW_POST_SCENE_SET_ITEM,
  VIEW_POST_SCENE_SET_CURRENT_IMAGE,
  VIEW_POST_SCENE_OPEN_OPTION_DROPDOWN,
  VIEW_POST_SCENE_CLOSE_OPTION_DROPDOWN,
  VIEW_POST_SCENE_MARK_CLOSE_QUESTION,
  VIEW_POST_SCENE_DELETE_QUESTION,
  VIEW_POST_SCENE_DELETE_QUESTION_SUCCESS,
  VIEW_POST_SCENE_DELETE_QUESTION_ERROR,
} from './viewPostActions';

import * as colors from '../../styles/colors';
import {POST_TYPES} from '../../constants/constants';

const initialState = {
  item: {
    id: '',
    type: '',
    title: '',
    description: '',
    condition: '',
    address: '',
    location: '',
    creator: '',
    images: [],
    isActive: false,
    createdAt: '',
    updatedAt: '',
  },
  currentImage: {
    index: 0,
    url: '',
  },
  isOptionDropdownOpen: false,
  themeColor: colors.ERROR,
};

export default function viewPostScene(state = initialState, action) {
  switch (action.type) {
    case VIEW_POST_SCENE_SET_ITEM: {
      const currentImage = {
        index: 0,
        url: (
          action.item.images &&
          action.item.images[0]
        ) || '',
      };

      let themeColor = '';

      // pick theme color
      switch(action.item.type) {
        case POST_TYPES.free.id: {
          themeColor = colors.GREEN;
          break;
        }
        case POST_TYPES.buy.id: {
          themeColor = colors.BLUE;
          break;
        }
        case POST_TYPES.sell.id: {
          themeColor = colors.ORANGE;
          break;
        }
        default: {
          themeColor = colors.ERROR;
        }
      }

      return {
        ...state,
        item: action.item,
        isOptionDropdownOpen: false,
        currentImage,
        themeColor,
      };
    }
    case VIEW_POST_SCENE_SET_CURRENT_IMAGE: {
      const images = state.item.images;
      const currentImage = {
        index: action.imageIndex,
        url: (
          images &&
          images[action.imageIndex]
        ) || '',
      };

      return {
        ...state,
        currentImage,
        isOptionDropdownOpen: false,
      };
    }
    case VIEW_POST_SCENE_OPEN_OPTION_DROPDOWN: {
      return {
        ...state,
        isOptionDropdownOpen: true,
      };
    }
    case VIEW_POST_SCENE_CLOSE_OPTION_DROPDOWN:
    case VIEW_POST_SCENE_MARK_CLOSE_QUESTION:
    case VIEW_POST_SCENE_DELETE_QUESTION: {
      return {
        ...state,
        isOptionDropdownOpen: false,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
