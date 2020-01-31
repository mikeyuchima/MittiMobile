import {
  MAP_UPDATE_WAIT,
  REGION_CHANGE_DEFINITION,
  DISTANT_CONVERSION,
} from '../../constants/constants';

let timerId = 0;

// actiom types
export const MAP_TAKE_SNAPSHOT = 'MAP_TAKE_SNAPSHOT';
export const MAP_TAKE_SNAPSHOT_SUCCESS = 'MAP_TAKE_SNAPSHOT_SUCCESS';
export const MAP_TAKE_SNAPSHOT_ERROR = 'MAP_TAKE_SNAPSHOT_ERROR';
export const MAP_SET_CURRENT_REGION = 'MAP_SET_CURRENT_REGION';
export const MAP_SAVE_REGION = 'MAP_SAVE_REGION';
export const MAP_ON_FOCUS = 'MAP_ON_FOCUS';
export const MAP_SET_API = 'MAP_SET_API';

export const takeSnapshot = (params) => {
  return (dispatch, getState) => {
    const mapApi = getState().map.mapApi;

    return new Promise((resolve, reject) => {
      // check if we have the api 
      if(mapApi) {
        dispatch({
          type: MAP_TAKE_SNAPSHOT,
        });
        // 'takeSnapshot' takes a config object with the
        // following options
        const snapshot = mapApi.takeSnapshot({
          //width: 300,      // optional, when omitted the view-width is used
          height: params.height,     // optional, when omitted the view-height is used
          //region: {..},    // iOS only, optional region to render
          format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
          //quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
          result: 'file'   // result types: 'file', 'base64' (default: 'file')
        });
        snapshot.then((uri) => {
          dispatch({
            type: MAP_TAKE_SNAPSHOT_SUCCESS,
            snapshotUri: uri,
          });
          resolve(uri);
        })
        .catch((error) => {
          dispatch({
            type: MAP_TAKE_SNAPSHOT_ERROR,
            error,
          });
          reject(error);
        });
      }
      else {
        reject('Map is not available yet.');
      }
    });
  };
};

export const setCurrentRegion = (region, skipTimer) => {
  return (dispatch, getState) => {
    const hasRegion = region && 
                      region.latitude && 
                      region.longitude;

    // check if we have region
    if(hasRegion) {
      // clear previous process
      clearTimeout(timerId);
      // check if we want to skip timer
      if(skipTimer) {
        dispatch({
          type: MAP_SET_CURRENT_REGION,
          region,
        });
      }
      else {
        // start a new process
        timerId = setTimeout(() => {
          dispatch({
            type: MAP_SET_CURRENT_REGION,
            region,
          });
        }, MAP_UPDATE_WAIT);
      }
    }
  };
};

export const saveRegion = (region) => ({
  type: MAP_SAVE_REGION,
  region,
});

export const onMapFocus = (radius, region) => ({
  type: MAP_ON_FOCUS,
  radius,
  region,
});

export const setMapApi = (mapApi) => ({
  type: MAP_SET_API,
  mapApi,
});

export const getUpdatedPosition = () => {
  return (dispatch, getState) => {
    if(getState().app.currentPosition) {
      return  {
        latitude: getState().app.currentPosition.coords.latitude,
        longitude: getState().app.currentPosition.coords.longitude
      }
    }
    else {
      return {
        latitude: 0,
        longitude: 0
      }
    }
  };
};