// api
import * as meApi from '../../api/meApi';
import * as postApi from '../../api/postApi';

// other module actions
import * as appActions from '../../modules/app/appActions';
import * as navigationActions from '../../modules/navigation/navigationActions';

// other
import {SCENES} from '../../routes';

export const MYPOSTS_SCENE_SET_TYPE = 'MYPOSTS_SCENE_SET_TYPE';
export const MYPOSTS_SCENE_SET_AREA= 'MYPOSTS_SCENE_SET_AREA';
export const MYPOSTS_SCENE_GET_POSTS = 'MYPOSTS_SCENE_GET_POSTS';
export const MYPOSTS_SCENE_GET_POSTS_SUCCESS = 'MYPOSTS_SCENE_GET_POSTS_SUCCESS';
export const MYPOSTS_SCENE_GET_POSTS_ERROR = 'MYPOSTS_SCENE_GET_POSTS_ERROR';
export const MYPOSTS_SCENE_GET_MESSAGES = 'MYPOSTS_SCENE_GET_MESSAGES';
export const MYPOSTS_SCENE_GET_MESSAGES_SUCCESS = 'MYPOSTS_SCENE_GET_MESSAGES_SUCCESS';
export const MYPOSTS_SCENE_GET_MESSAGES_ERROR = 'MYPOSTS_SCENE_GET_MESSAGES_ERROR';
export const MYPOSTS_SCENE_CREATE_POST_OPEN = 'MYPOSTS_SCENE_CREATE_POST_OPEN';
export const MYPOSTS_SCENE_CREATE_POST_CLOSE = 'MYPOSTS_SCENE_CREATE_POST_CLOSE';

export const setType = (marketType) => ({
  type: MYPOSTS_SCENE_SET_TYPE,
  marketType,
});

export const setArea = (geocodeData, me) => ({
  type: MYPOSTS_SCENE_SET_AREA,
  geocodeData,
  me,
});

export const getItems = () => {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    const skip = 0;
    const limit = 10;

    dispatch({
      type: MYPOSTS_SCENE_GET_POSTS,
    });

    return meApi.findPosts(token, skip, limit)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (items) => {
          dispatch({
            type: MYPOSTS_SCENE_GET_POSTS_SUCCESS,
            items,
          });

          return items;
        }
      )
      .catch((error) => {
          dispatch({
            type: MYPOSTS_SCENE_GET_POSTS_ERROR,
            error,
          });
          return error;
      });
  };
};

export const getChats = () => {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: MYPOSTS_SCENE_GET_MESSAGES,
    });

    return meApi.findChats(token)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (chats) => {
          dispatch({
            type: MYPOSTS_SCENE_GET_MESSAGES_SUCCESS,
            chats,
          });

          return chats;
        }
      )
      .catch((error) => {
          dispatch({
            type: MYPOSTS_SCENE_GET_MESSAGES_ERROR,
            error,
          });
          return error;
      });
  };
};

export const openCreatePostModal = () => ({
  type: MYPOSTS_SCENE_CREATE_POST_OPEN,
});

export const closeCreatePostModal = () => ({
  type: MYPOSTS_SCENE_CREATE_POST_CLOSE,
});