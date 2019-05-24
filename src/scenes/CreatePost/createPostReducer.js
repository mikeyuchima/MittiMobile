import {
  CREATE_POST_SCENE_CHANGE_FORM_VALUE,
  CREATE_POST_SCENE_SET_POSITION,
  CREATE_POST_SCENE_SET_ADDRESS,
  CREATE_POST_SCENE_SET_TYPE,
  CREATE_POST_SCENE_CREATE,
  CREATE_POST_SCENE_CREATE_SUCCESS,
  CREATE_POST_SCENE_CREATE_ERROR,
  CREATE_POST_SCENE_GET_GEOCODE_DATA,
  CREATE_POST_SCENE_GET_GEOCODE_DATA_SUCCESS,
  CREATE_POST_SCENE_GET_GEOCODE_DATA_ERROR,
  CREATE_POST_SCENE_SET_CURRENT_LOCATION,
  CREATE_POST_SCENE_SET_CURRENT_LOCATION_SUCCESS,
  CREATE_POST_SCENE_SET_CURRENT_LOCATION_ERROR,
  CREATE_POST_SCENE_CANCEL_POST,
} from './createPostActions';

import {POST_CONDITIONS} from '../../constants/constants';

const initialState = {
  isCreatingPost: false,
  isGettingGeocodeData: false,
  postType: undefined,
  currentAddress: '',
  form: {
    title: "",
    description: "",
    condition: POST_CONDITIONS.new.id,
    address: "",
  },
  position: {
    // default to Toronto, ON
    lat: 43.653982,
    lng: -79.380319,
  },
};

export default function createPostScene(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST_SCENE_CHANGE_FORM_VALUE: {
      const {name, value} = action;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        },
      };
    }
    case CREATE_POST_SCENE_SET_TYPE: {
      return {
        ...state,
        postType: action.postType,
      };
    }
    case CREATE_POST_SCENE_SET_POSITION: {
      return {
        ...state,
        position: action.position,
      };
    }
    case CREATE_POST_SCENE_SET_ADDRESS: {
      return {
        ...state,
        form: {
          ...state.form,
          address: action.address,
        }
      };
    }
    case CREATE_POST_SCENE_CREATE: {
      return {
        ...state,
        isCreatingPost: true,
      };
    }
    case CREATE_POST_SCENE_CREATE_SUCCESS: {
      return {
        ...initialState,
      };
    }
    case CREATE_POST_SCENE_CREATE_ERROR: {
      return {
        ...initialState,
      };
    }
    case CREATE_POST_SCENE_GET_GEOCODE_DATA: {
      return {
        ...state,
        isGettingGeocodeData: true,
      };
    }
    case CREATE_POST_SCENE_GET_GEOCODE_DATA_SUCCESS: {
      return {
        ...state,
        isGettingGeocodeData: false,
        position: action.address.position,
        form: {
          ...state.form,
          address: action.address.formattedAddress,
        }
      };
    }
    case CREATE_POST_SCENE_GET_GEOCODE_DATA_ERROR: {
      return {
        ...state,
        isGettingGeocodeData: false,
        position: {},
        form: {
          ...state.form,
          address: '',
        }
      };
    }
    case CREATE_POST_SCENE_SET_CURRENT_LOCATION: {
      return {
        ...state,
        position: action.position,
        isGettingGeocodeData: true,
      };
    }
    case CREATE_POST_SCENE_SET_CURRENT_LOCATION_SUCCESS: {
      const addressSegments = [
        action.address.locality,
        action.address.adminArea,
        action.address.country,
      ];

      return {
        ...state,
        isGettingGeocodeData: false,
        form: {
          ...state.form,
          address: addressSegments.join(', '),
        }
      };
    }
    case CREATE_POST_SCENE_SET_CURRENT_LOCATION_ERROR: {
      return {
        ...state,
        isGettingGeocodeData: false,
        position: {},
        form: {
          ...state.form,
          address: '',
        }
      };
    }
    case CREATE_POST_SCENE_CANCEL_POST: {
      return {
        ...initialState,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
