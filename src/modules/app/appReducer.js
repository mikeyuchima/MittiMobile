// action types
import {
  APP_GET_CURRENT_POSITION,
  APP_GET_CURRENT_POSITION_SUCCESS,
  APP_GET_CURRENT_POSITION_ERROR,
  APP_UPLOAD_IMAGE,
  APP_UPLOAD_IMAGE_SUCCESS,
  APP_UPLOAD_IMAGE_ERROR,
  APP_REMOVE_IMAGE,
  APP_CLEAR_UPLOAD_IMAGE,
} from './appActions';

const initialState = {
  isGettingCurrentPosition: false,
  currentPosition: undefined,
  imageUpload: {
    images: [],
    imageDataList: [],
  }
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case APP_GET_CURRENT_POSITION: {
      return {
        ...state,
        isGettingCurrentPosition: true,
      };
    }
    case APP_GET_CURRENT_POSITION_SUCCESS: {
      const {currentPosition} = action;
      return {
        ...state,
        currentPosition,
        isGettingCurrentPosition: false,
      };
    }
    case APP_GET_CURRENT_POSITION_SUCCESS: {
      return {
        ...state,
        isGettingCurrentPosition: false,
      };
    }
    case APP_UPLOAD_IMAGE: {
      return {
        ...state,
        imageUpload: {
          ...state.imageUpload,
          imageDataList: action.imageDataList,
        }
      };
    }
    case APP_UPLOAD_IMAGE_SUCCESS: {
      const images = action.imageDataList.map((anImageData) => {
          return anImageData.cloudUrl;
      });

      return {
        ...state,
        imageUpload: {
          ...state.imageUpload,
          imageDataList: action.imageDataList,
          images,
        }
      };
    }
    case APP_UPLOAD_IMAGE_ERROR: {
      return {
        ...state,
        imageUpload: {
          ...state.imageUpload,
          imageDataList: action.imageDataList,
        }
      };
    }
    case APP_REMOVE_IMAGE: {
      return {
        ...state,
        imageUpload: {
          ...state.imageUpload,
          imageDataList: action.imageDataList,
        }
      };
    }
    case APP_CLEAR_UPLOAD_IMAGE: {
      return {
        ...state,
        imageUpload: {
          ...initialState.imageUpload,
        },
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
