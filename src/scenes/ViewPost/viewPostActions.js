// api
import * as postApi from '../../api/postApi';

// actions
import * as appActions from '../../modules/app/appActions';
import * as navigationActions from '../../modules/navigation/navigationActions';

// others
import {SCENES} from '../../routes';
import {POST_TYPES} from '../../constants/constants';

export const VIEW_POST_SCENE_SET_ITEM = 'VIEW_POST_SCENE_SET_ITEM';
export const VIEW_POST_SCENE_SET_CURRENT_IMAGE = 'VIEW_POST_SCENE_SET_CURRENT_IMAGE';
export const VIEW_POST_SCENE_OPEN_OPTION_DROPDOWN = 'VIEW_POST_SCENE_OPEN_OPTION_DROPDOWN';
export const VIEW_POST_SCENE_CLOSE_OPTION_DROPDOWN = 'VIEW_POST_SCENE_CLOSE_OPTION_DROPDOWN';
export const VIEW_POST_SCENE_MARK_CLOSE_QUESTION = 'VIEW_POST_SCENE_MARK_CLOSE_QUESTION';
export const VIEW_POST_SCENE_MARK_CLOSE_QUESTION_SUCCESS = 'VIEW_POST_SCENE_MARK_CLOSE_QUESTION_SUCCESS';
export const VIEW_POST_SCENE_MARK_CLOSE_QUESTION_ERROR = 'VIEW_POST_SCENE_MARK_CLOSE_QUESTION_ERROR';
export const VIEW_POST_SCENE_OPEN_CHAT_WINDOW = 'VIEW_POST_SCENE_OPEN_CHAT_WINDOW';
export const VIEW_POST_SCENE_OPEN_CHAT_WINDOW_SUCCESS = 'VIEW_POST_SCENE_OPEN_CHAT_WINDOW_SUCCESS';
export const VIEW_POST_SCENE_OPEN_CHAT_WINDOW_ERROR = 'VIEW_POST_SCENE_OPEN_CHAT_WINDOW_ERROR';
export const VIEW_POST_SCENE_DELETE_QUESTION = 'VIEW_POST_SCENE_DELETE_QUESTION';
export const VIEW_POST_SCENE_DELETE_QUESTION_SUCCESS = 'VIEW_POST_SCENE_DELETE_QUESTION_SUCCESS';
export const VIEW_POST_SCENE_DELETE_QUESTION_ERROR = 'VIEW_POST_SCENE_DELETE_QUESTION_ERROR';

export const setItem = (item) => ({
  type: VIEW_POST_SCENE_SET_ITEM,
  item,
});

export const setCurrentImage = (imageIndex) => ({
  type: VIEW_POST_SCENE_SET_CURRENT_IMAGE,
  imageIndex,
});

export const openOptionDropdown = () => ({
  type: VIEW_POST_SCENE_OPEN_OPTION_DROPDOWN,
});

export const closeOptionDropdown = () => ({
  type: VIEW_POST_SCENE_CLOSE_OPTION_DROPDOWN,
});

export const markCloseItem = () => {
  return (dispatch, getState) => {
    const {item} = getState().viewPostScene;
    const {token} = getState().auth;

    const itemId = item.id
    const data = {
      isActive: false,
    };

    dispatch(closeOptionDropdown());

    dispatch({
      type: VIEW_POST_SCENE_MARK_CLOSE_QUESTION,
      itemId,
    });

    return postApi.update(token, itemId, data)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (item) => {
          dispatch({
            type: VIEW_POST_SCENE_MARK_CLOSE_QUESTION_SUCCESS,
            item,
          });
          dispatch(navigationActions.changeScene(SCENES.marketplace.key, {
            navigationParams: {
              marketType: POST_TYPES.free.id,
            }
          }));

          return item;
        }
      )
      .catch((error) => {
          dispatch({
            type: VIEW_POST_SCENE_MARK_CLOSE_QUESTION_ERROR,
            error,
          });
          return error;
      });
  };
};

export const deleteItem = () => {
  return (dispatch, getState) => {
    const {item} = getState().viewPostScene;
    const {token} = getState().auth;

    const itemId = item.id
    const data = {
      isActive: false,
    };

    dispatch(closeOptionDropdown());

    dispatch({
      type: VIEW_POST_SCENE_DELETE_QUESTION,
      itemId,
    });

    return postApi.deletePost(token, itemId)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        () => {
          dispatch({
            type: VIEW_POST_SCENE_DELETE_QUESTION_SUCCESS,
            item,
          });
          dispatch(navigationActions.changeScene(SCENES.marketplace.key, {
            navigationParams: {
              marketType: POST_TYPES.free.id,
            }
          }));

          return item;
        }
      )
      .catch((error) => {
          dispatch({
            type: VIEW_POST_SCENE_DELETE_QUESTION_ERROR,
            error,
          });
          return error;
      });
  };
};

export const openChatWindow = (item) => {
  return (dispatch, getState) => {
    // check if we have item 
    if(item && item.id) {
      const {token} = getState().auth;

      dispatch({
        type: VIEW_POST_SCENE_OPEN_CHAT_WINDOW,
      });

      return postApi.createChat(token, item.id, {})
        .then((resp) => dispatch(appActions.processApiResponse(resp)))
        .then(
          (chat) => {
            const params = { 
              navigationParams: {
                chatId: chat._id,
                itemId: item.id,
              } 
            };

            dispatch({
              type: VIEW_POST_SCENE_OPEN_CHAT_WINDOW_SUCCESS,
              chat,
            });
            dispatch(navigationActions.changeScene(SCENES.chat.key, params));

            return chat;
          }
        )
        .catch((error) => {
            dispatch({
              type: VIEW_POST_SCENE_OPEN_CHAT_WINDOW_ERROR,
              error,
            });
            return error;
        });
    }
  };
};