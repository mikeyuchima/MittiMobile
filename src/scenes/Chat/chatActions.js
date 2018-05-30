// api
import * as postApi from '../../api/postApi';

import moment from 'moment';
// other module actions
import * as appActions from '../../modules/app/appActions';
import * as mapActions from '../../modules/map/mapActions';
import * as unreadMessagesActions from '../../modules/unreadMessages/unreadMessagesActions';

export const CHAT_SCENE_SET_ITEM = 'CHAT_SCENE_SET_ITEM';
export const CHAT_SCENE_SET_ITEM_SUCCESS = 'CHAT_SCENE_SET_ITEM_SUCCESS';
export const CHAT_SCENE_SET_ITEM_ERROR = 'CHAT_SCENE_SET_ITEM_ERROR';
export const CHAT_SCENE_CHANGE_TEXT_VALUE = 'CHAT_SCENE_CHANGE_TEXT_VALUE';
export const CHAT_SCENE_SEND_MESSAGE = 'CHAT_SCENE_SEND_MESSAGE';
export const CHAT_SCENE_SEND_MESSAGE_SUCCESS = 'CHAT_SCENE_SEND_MESSAGE_SUCCESS';
export const CHAT_SCENE_SEND_MESSAGE_ERROR = 'CHAT_SCENE_SEND_MESSAGE_ERROR';
export const CHAT_SCENE_ACCEPT_APPOINTMENT = 'CHAT_SCENE_ACCEPT_APPOINTMENT';
export const CHAT_SCENE_ACCEPT_APPOINTMENT_SUCCESS = 'CHAT_SCENE_ACCEPT_APPOINTMENT_SUCCESS';
export const CHAT_SCENE_ACCEPT_APPOINTMENT_ERROR = 'CHAT_SCENE_ACCEPT_APPOINTMENT_ERROR';
export const CHAT_SCENE_SET_SCHEDULE = 'CHAT_SCENE_SET_SCHEDULE';
export const CHAT_SCENE_SEND_APPOINTMENT_REQUEST = 'CHAT_SCENE_SEND_APPOINTMENT_REQUEST';
export const CHAT_SCENE_SEND_APPOINTMENT_REQUEST_SUCCESS = 'CHAT_SCENE_SEND_APPOINTMENT_REQUEST_SUCCESS';
export const CHAT_SCENE_SEND_APPOINTMENT_REQUEST_ERROR = 'CHAT_SCENE_SEND_APPOINTMENT_REQUEST_ERROR';
export const CHAT_SCENE_CANCEL_APPOINTMENT_REQUEST = 'CHAT_SCENE_CANCEL_APPOINTMENT_REQUEST';
export const CHAT_SCENE_INITIALIZE_CHAT = 'CHAT_SCENE_INITIALIZE_CHAT';
export const CHAT_SCENE_INITIALIZE_CHAT_SUCCESS = 'CHAT_SCENE_INITIALIZE_CHAT_SUCCESS';
export const CHAT_SCENE_INITIALIZE_CHAT_ERROR = 'CHAT_SCENE_INITIALIZE_CHAT_ERROR';
export const CHAT_SCENE_GET_MESSAGES = 'CHAT_SCENE_GET_MESSAGES';
export const CHAT_SCENE_GET_MESSAGES_SUCCESS = 'CHAT_SCENE_GET_MESSAGES_SUCCESS';
export const CHAT_SCENE_GET_MESSAGES_ERROR = 'CHAT_SCENE_GET_MESSAGES_ERROR';
export const CHAT_SCENE_SET_MAP_SNAPSHOT = 'CHAT_SCENE_SET_MAP_SNAPSHOT';
export const CHAT_SCENE_SET_MAP_SNAPSHOT_SUCCESS = 'CHAT_SCENE_SET_MAP_SNAPSHOT_SUCCESS';
export const CHAT_SCENE_SET_MAP_SNAPSHOT_ERROR = 'CHAT_SCENE_SET_MAP_SNAPSHOT_ERROR';
export const CHAT_SCENE_READ_MESSAGES = 'CHAT_SCENE_READ_MESSAGES';
export const CHAT_SCENE_READ_MESSAGES_SUCCESS = 'CHAT_SCENE_READ_MESSAGES_SUCCESS';
export const CHAT_SCENE_READ_MESSAGES_ERROR = 'CHAT_SCENE_READ_MESSAGES_ERROR';

export const setItem = (itemId) => {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: CHAT_SCENE_SET_ITEM,
    });

    return postApi.getPost(token, itemId)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (item) => {
          dispatch({
            type: CHAT_SCENE_SET_ITEM_SUCCESS,
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
            type: CHAT_SCENE_SET_ITEM_ERROR,
            error,
          });
          return error;
      });
  };
};

export const changeTextValue = (messageText) => ({
  type: CHAT_SCENE_CHANGE_TEXT_VALUE,
  messageText,
});

export const getMessages = (itemId, chatId) => {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: CHAT_SCENE_GET_MESSAGES,
      itemId,
      chatId,
    });

    return postApi.getChat(token, itemId, chatId)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (chat) => {
          dispatch({
            type: CHAT_SCENE_GET_MESSAGES_SUCCESS,
            chat,
          });

          dispatch(readMessages(itemId, chatId));

          return chat;
        }
      )
      .catch((error) => {
          dispatch({
            type: CHAT_SCENE_GET_MESSAGES_ERROR,
            error,
          });
          return error;
      });
  };
}

export const readMessages = (itemId, chatId) => {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: CHAT_SCENE_READ_MESSAGES,
      itemId,
      chatId,
    });

    return postApi.readMessages(token, itemId, chatId)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (messages) => {
          dispatch({
            type: CHAT_SCENE_READ_MESSAGES_SUCCESS,
            messages,
          });

          dispatch(unreadMessagesActions.readMessages(messages));

          return messages;
        }
      )
      .catch((error) => {
          dispatch({
            type: CHAT_SCENE_READ_MESSAGES_ERROR,
            error,
          });
          return error;
      });
  };
};

export const sendMessage = (senderId, itemId, chatId, messageText) => {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: CHAT_SCENE_SEND_MESSAGE,
      senderId,
      itemId,
      chatId,
      messageText,
    });

    return postApi.createMessage(token, itemId, chatId, messageText)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (message) => {
          dispatch({
            type: CHAT_SCENE_SEND_MESSAGE_SUCCESS,
            message,
          });

          return message;
        }
      )
      .catch((error) => {
          dispatch({
            type: CHAT_SCENE_SEND_MESSAGE_ERROR,
            error,
          });
          return error;
      });
  };
}

export const acceptAppointment = (itemId, chatId) => {
  return (dispatch, getState) => {
    const {token} = getState().auth;

    dispatch({
      type: CHAT_SCENE_ACCEPT_APPOINTMENT,
      itemId: itemId,
      chatId: chatId,
    });

    return postApi.confirmSchedule(token, itemId, chatId)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (chat) => {
          dispatch({
            type: CHAT_SCENE_ACCEPT_APPOINTMENT_SUCCESS,
            chat,
          });

          return chat;
        }
      )
      .catch((error) => {
          dispatch({
            type: CHAT_SCENE_ACCEPT_APPOINTMENT_ERROR,
            error,
          });
          return error;
      });
  };
};

export const setSchedule = () => ({
  type: CHAT_SCENE_SET_SCHEDULE,
});

export const sendAppointmentRequest = (itemId, chatId, timeRequested) => {
  return (dispatch, getState) => {
    const {me} = getState().me;
    const {token} = getState().auth;
    const timestamp = moment(timeRequested).format();

    dispatch({
      type: CHAT_SCENE_SEND_APPOINTMENT_REQUEST,
      meId: me.id,
      timestamp,
    });

    return postApi.schedule(token, itemId, chatId, timestamp)
      .then((resp) => dispatch(appActions.processApiResponse(resp)))
      .then(
        (chat) => {
          dispatch({
            type: CHAT_SCENE_SEND_APPOINTMENT_REQUEST_SUCCESS,
            chat: {
              ...chat,
              id: chat._id,
            },
          });

          return chat;
        }
      )
      .catch((error) => {
          dispatch({
            type:  CHAT_SCENE_SEND_APPOINTMENT_REQUEST_ERROR,
            error,
          });
          return error;
      });
  };
};

export const cancelAppointmentRequest = () => ({
  type: CHAT_SCENE_CANCEL_APPOINTMENT_REQUEST,
});

export const initializeChat = (itemId, chatId) => {
  return (dispatch, getState) => {
    const {token} = getState().auth;
    dispatch({
      type: CHAT_SCENE_INITIALIZE_CHAT,
    });

    return new Promise((resolve, reject) => {
      postApi.getChat(token, itemId, chatId)
        .then((resp) => dispatch(appActions.processApiResponse(resp)))
        .then(
          (chat) => {
            dispatch({
              type: CHAT_SCENE_INITIALIZE_CHAT_SUCCESS,
              chat,
            });
            dispatch(readMessages(itemId, chatId));
            resolve(chat);
          }
        )
        .catch((error) => {
            dispatch({
              type: CHAT_SCENE_INITIALIZE_CHAT_ERROR,
              error,
            });
            reject(error);
        });
    });
  };
};

export const setMapSnapshot = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CHAT_SCENE_SET_MAP_SNAPSHOT,
    });
    return new Promise((resolve, reject) => {
      dispatch(mapActions.takeSnapshot({ height: 100 }))
        .then((mapSnapshot) => {
          dispatch({
            type: CHAT_SCENE_SET_MAP_SNAPSHOT_SUCCESS,
            mapSnapshot,
          });
          resolve(mapSnapshot);
        })
        .catch((error) => {
          dispatch({
            type: CHAT_SCENE_SET_MAP_SNAPSHOT_ERROR,
            error,
          });
          reject(error);
        });
    });
  };
}
