// api
import * as meApi from '../../api/meApi.js'; // uncomment this for real api

// other module actions
import * as appActions from '../app/appActions';

// action types
export const UNREAD_MESSAGES_GET = 'UNREAD_MESSAGES_GET';
export const UNREAD_MESSAGES_GET_SUCCESS = 'UNREAD_MESSAGES_GET_SUCCESS';
export const UNREAD_MESSAGES_GET_ERROR = 'UNREAD_MESSAGES_GET_ERROR';
export const UNREAD_MESSAGES_READ = 'UNREAD_MESSAGES_READ';
export const UNREAD_MESSAGES_READ_SUCCESS = 'UNREAD_MESSAGES_READ_SUCCESS';
export const UNREAD_MESSAGES_READ_ERROR = 'UNREAD_MESSAGES_READ_ERROR';

export const findUnreadMessages = () => {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    dispatch({
      type: UNREAD_MESSAGES_GET,
    });

    return meApi.findUnreadMessages(token)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (unreadMessages) => {
          dispatch({
            type: UNREAD_MESSAGES_GET_SUCCESS,
            unreadMessages,
          });
          return unreadMessages;
        }
      )
      .catch((error) => {
        dispatch({
          type: UNREAD_MESSAGES_GET_ERROR,
          error,
        });
        return error;
      });

  };
};

export const readMessages = (messages) => ({
  type: UNREAD_MESSAGES_READ,
  messages,
});