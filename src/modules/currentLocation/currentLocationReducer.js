// action types
import {
  CURRENT_LOCATION_GENERATE_LOCATION,
  CURRENT_LOCATION_SET_CURRENT_LOCATION,
  CURRENT_LOCATION_SET_CURRENT_LOCATION_SUCCESS,
  CURRENT_LOCATION_SET_CURRENT_LOCATION_ERROR,
  CURRENT_LOCATION_RESET_LOCATION,
} from './currentLocationActions';

const initialState = {
  address: '',
};

export default function currentLocation(state = initialState, action) {
  switch (action.type) {
    case CURRENT_LOCATION_SET_CURRENT_LOCATION_SUCCESS: {
      return {
        ...state,
        address: action.address.formattedAddress,
      };
    }
    case CURRENT_LOCATION_RESET_LOCATION: {
      return {
        ...state,
        address: '',
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
