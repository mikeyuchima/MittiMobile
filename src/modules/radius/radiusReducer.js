// action types
import {
  RADIUS_OPEN_DROPDOWN,
  RADIUS_CLOSE_DROPDOWN,
  RADIUS_CHANGE_VALUE,
  RADIUS_SET_DEFAULT_RADIUS,
} from './radiusActions';

// other
import {ActionConst} from 'react-native-router-flux';

const initialState = {
  isDropdownOpen: false,
  radius: 0,
  radiusUnit: '',
  markers: [],
};

export default function radius(state = initialState, action) {
  switch (action.type) {
    case ActionConst.JUMP:
    case ActionConst.PUSH:
    case ActionConst.REPLACE:
    case ActionConst.BACK:
    case ActionConst.BACK_ACTION:
    case ActionConst.POP_AND_REPLACE:
    case ActionConst.POP_TO:
    case ActionConst.REFRESH:
    case ActionConst.RESET:
    case ActionConst.FOCUS: {
      const {scene} = action;
      return {
        ...state,
        scene,
        isDropdownOpen: false,
      };
    }
    case RADIUS_OPEN_DROPDOWN: {
      return {
        ...state,
        isDropdownOpen: true,
      };
    }
    case RADIUS_CLOSE_DROPDOWN: {
      return {
        ...state,
        isDropdownOpen: false,
      };
    }
    case RADIUS_CHANGE_VALUE: {
      const {radius, radiusUnit} = action;

      return {
        ...state,
        isDropdownOpen: false,
        radius,
        radiusUnit,
      };
    }
    case RADIUS_SET_DEFAULT_RADIUS: {
      const {defaultRadius, radiusUnit} = action;

      const radius = state.radius || defaultRadius;

      return {
        ...state,
        isDropdownOpen: false,
        radius,
        radiusUnit: state.radiusUnit || radiusUnit,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
