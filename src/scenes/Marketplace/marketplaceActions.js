// api
import * as postApi from '../../api/postApi';

// other module actions
import * as appActions from '../../modules/app/appActions';
import * as navigationActions from '../../modules/navigation/navigationActions';

// other
import {SCENES} from '../../routes';

export const MARKETPLACE_SCENE_SET_TYPE = 'MARKETPLACE_SCENE_SET_TYPE';
export const MARKETPLACE_SCENE_SET_AREA= 'MARKETPLACE_SCENE_SET_AREA';
export const MARKETPLACE_SCENE_GET_POSTS = 'MARKETPLACE_SCENE_GET_POSTS';
export const MARKETPLACE_SCENE_GET_POSTS_SUCCESS = 'MARKETPLACE_SCENE_GET_POSTS_SUCCESS';
export const MARKETPLACE_SCENE_GET_POSTS_ERROR = 'MARKETPLACE_SCENE_GET_POSTS_ERROR';
export const MARKETPLACE_SCENE_CREATE_POST_OPEN = 'MARKETPLACE_SCENE_CREATE_POST_OPEN';
export const MARKETPLACE_SCENE_CREATE_POST_CLOSE = 'MARKETPLACE_SCENE_CREATE_POST_CLOSE';
export const MARKETPLACE_SCENE_GET_POST = 'MARKETPLACE_SCENE_GET_POST';
export const MARKETPLACE_SCENE_GET_POST_SUCCESS = 'MARKETPLACE_SCENE_GET_POST_SUCCESS';
export const MARKETPLACE_SCENE_GET_POST_ERROR = 'MARKETPLACE_SCENE_GET_POST_ERROR';
export const MARKETPLACE_SCENE_REGION_CHANGE = 'MARKETPLACE_SCENE_REGION_CHANGE';

export const setType = (marketType) => ({
  type: MARKETPLACE_SCENE_SET_TYPE,
  marketType,
});

export const setArea = (geocodeData, me) => ({
  type: MARKETPLACE_SCENE_SET_AREA,
  geocodeData,
  me,
});

export const getItems = (lat, lng) => {
  return (dispatch, getState) => {
    const {radius, radiusUnit} = getState().radius;
    const {token} = getState().auth;

    // check if we have lat lng
    if(!lat || !lng) {
      return null;
    }
    dispatch({
      type: MARKETPLACE_SCENE_GET_POSTS,
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
            type: MARKETPLACE_SCENE_GET_POSTS_SUCCESS,
            items,
          });

          return items;
        }
      )
      .catch((error) => {
          dispatch({
            type: MARKETPLACE_SCENE_GET_POSTS_ERROR,
            error,
          });
          return error;
      });
  };
};

export const getPost = (itemId) => {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: MARKETPLACE_SCENE_GET_POST,
    });

    return postApi.getPost(token, itemId)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (item) => {
          dispatch({
            type: MARKETPLACE_SCENE_GET_POST_SUCCESS,
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
            type: MARKETPLACE_SCENE_GET_POST_ERROR,
            error,
          });
          return error;
      });
  };
};

export const openCreatePostModal = () => ({
  type: MARKETPLACE_SCENE_CREATE_POST_OPEN,
});

export const closeCreatePostModal = () => ({
  type: MARKETPLACE_SCENE_CREATE_POST_CLOSE,
});

export const onRegionChange = (region) => {
  return (dispatch, getState) => {
    dispatch({
      type: MARKETPLACE_SCENE_REGION_CHANGE,
      region
    });
  };
};