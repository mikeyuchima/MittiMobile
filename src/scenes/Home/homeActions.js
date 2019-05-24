// api
import * as authApi from '../../api/authMock.js'; // mock api for testing
import * as postApi from '../../api/postApi';

// other module actions
import * as appActions from '../../modules/app/appActions';

// action types
export const HOME_SCENE_GET_MARKERS = 'HOME_SCENE_GET_MARKERS';
export const HOME_SCENE_GET_MARKERS_SUCCESS = 'HOME_SCENE_GET_MARKERS_SUCCESS';
export const HOME_SCENE_GET_MARKERS_ERROR = 'HOME_SCENE_GET_MARKERS_ERROR';
export const HOME_SCENE_CREATE_POST_OPEN = 'HOME_SCENE_CREATE_POST_OPEN';
export const HOME_SCENE_CREATE_POST_CLOSE = 'HOME_SCENE_CREATE_POST_CLOSE';
export const HOME_SCENE_GET_POSTS = 'HOME_SCENE_GET_POSTS';
export const HOME_SCENE_GET_POSTS_SUCCESS = 'HOME_SCENE_GET_POSTS_SUCCESS';
export const HOME_SCENE_GET_POSTS_ERROR = 'HOME_SCENE_GET_POSTS_ERROR';
export const HOME_SCENE_GET_POST = 'HOME_SCENE_GET_POST';
export const HOME_SCENE_GET_POST_SUCCESS = 'HOME_SCENE_GET_POST_SUCCESS';
export const HOME_SCENE_GET_POST_ERROR= 'HOME_SCENE_GET_POST_ERROR';
export const HOME_SCENE_REGION_CHANGE = 'HOME_SCENE_REGION_CHANGE';

const _getMarkers = (radius, radiusUnit) => ({
  type: HOME_SCENE_GET_MARKERS,
  radius,
  radiusUnit,
});

const _getMarkersSuccess = (markers) => ({
  type: HOME_SCENE_GET_MARKERS_SUCCESS,
  markers,
});

const _getMarkersError = (error) => ({
  type: HOME_SCENE_GET_MARKERS_ERROR,
  error,
});

export const openCreatePostModal = () => ({
  type: HOME_SCENE_CREATE_POST_OPEN,
});

export const closeCreatePostModal = () => ({
  type: HOME_SCENE_CREATE_POST_CLOSE,
});

export const getMarkers = (radius, radiusUnit) => {
  return (dispatch, getState) => {
    dispatch(_getMarkers(radius, radiusUnit));

    return authApi.getMarkers(radius, radiusUnit)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (resp) => {
          dispatch(_getMarkersSuccess(resp.data));

          return resp;
        }
      )
      .catch((error) => {
        dispatch(_getMarkersError(error));
        return error;
      });
  };
};

export const getPost = (itemId) => {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: HOME_SCENE_GET_POST,
    });

    return postApi.getPost(token, itemId)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (item) => {
          dispatch({
            type: HOME_SCENE_GET_POST_SUCCESS,
            item: {
              ...item,
              id: item._id,
            },
          });

          return item;
        }
      )
      .catch((error) => {
          dispatch({
            type: HOME_SCENE_GET_POST_ERROR,
            error,
          });
          return error;
      });
  };
};

export const getItems = (lat, lng) => {
  return (dispatch, getState) => {
    const {radius, radiusUnit} = getState().radius;
    const {token} = getState().auth;

    // check if we have lat lng
    if(!lat || !lng) {
      return null;
    }
    dispatch({
      type: HOME_SCENE_GET_POSTS,
      lat,
      lng,
      radius,
      radiusUnit,
    });

    return postApi.find(token, lat, lng, radius, radiusUnit)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (items) => {
          dispatch({
            type: HOME_SCENE_GET_POSTS_SUCCESS,
            items,
          });

          return items;
        }
      )
      .catch((error) => {
          dispatch({
            type: HOME_SCENE_GET_POSTS_ERROR,
            error,
          });
          return error;
      });
  };
};

export const onRegionChange = (region) => {
  return (dispatch, getState) => {
    dispatch({
      type: HOME_SCENE_REGION_CHANGE,
      region
    });
  };
};
