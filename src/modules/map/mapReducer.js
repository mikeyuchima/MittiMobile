// action types
import {
  MAP_TAKE_SNAPSHOT,
  MAP_TAKE_SNAPSHOT_SUCCESS,
  MAP_SET_CURRENT_REGION,
  MAP_SAVE_REGION,
  MAP_SET_API,
} from './mapActions';

import {
  MAP_UPDATE_WAIT,
  REGION_CHANGE_DEFINITION,
  DISTANT_CONVERSION,
} from '../../constants/constants';

const initialState = {
  savedRadius: 0,
  snapshotUri: '',
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 1,
    longitudeDelta: 1,
  },
  savedRegion:{
    latitude: 0,
    longitude: 0,
    latitudeDelta: 1,
    longitudeDelta: 1,
  },
  isRegionChanged: false,
};

export default function map(state = initialState, action) {
  switch (action.type) {
    case MAP_TAKE_SNAPSHOT: {
      return {
        ...state,
      };
    }
    case MAP_TAKE_SNAPSHOT_SUCCESS: {
      return {
        ...state,
        snapshotUri: action.snapshotUri,
      };
    }
    case MAP_SET_CURRENT_REGION: {
      const nextRegion = action.region;
      const isLatitudeChanged = Math.abs(nextRegion.latitude - state.region.latitude) > REGION_CHANGE_DEFINITION,
            isLongitudeChanged = Math.abs(nextRegion.longitude - state.region.longitude) > REGION_CHANGE_DEFINITION;

      // check if considered as region change
      if(isLatitudeChanged && isLongitudeChanged) {
        return {
          ...state,
          region: nextRegion,
        };
      }
      else {
        return {
          ...state,
        };
      }
    }
    case MAP_SAVE_REGION: {
      return {
        ...state,
        savedRegion: action.region,
        isRegionChanged: true,
      };
    }
    case MAP_SET_API: {
      return {
        ...state,
        mapApi: action.mapApi,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
