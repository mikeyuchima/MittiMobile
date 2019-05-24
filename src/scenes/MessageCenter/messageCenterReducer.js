import moment from 'moment';
// action types
import {
  MESSAGE_CENTER_SCENE_GET_MESSAGES,
  MESSAGE_CENTER_SCENE_GET_MESSAGES_SUCCESS,
  MESSAGE_CENTER_SCENE_GET_MESSAGES_ERROR,
  MESSAGE_CENTER_SCENE_GOTO_CHAT,
  MESSAGE_CENTER_SCENE_CREATE_POST_OPEN,
  MESSAGE_CENTER_SCENE_CREATE_POST_CLOSE,
} from './messageCenterActions';

import * as colors from '../../styles/colors';
import {POST_TYPES} from '../../constants/constants';

const initialState = {
  chats: [],
  isCreatePostModalOpen: false,
};

export default function messageCenterScene(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_CENTER_SCENE_GET_MESSAGES_SUCCESS: {
      var chats = action.chats.map((aChat) => {
        return {
          ...aChat,
          id: aChat._id,
        };
      });

      return {
        ...state,
        chats,
      };
    }
    case MESSAGE_CENTER_SCENE_GOTO_CHAT: {
      var theChats = [
        ...state.chats,
      ];
      var theChat = theChats.find((aChat) => {
        return aChat._id == action.chat.id;
      });

      // set to chat
      theChat.unreadMessageCount = 0;

      return {
        ...state,
        chats: theChats,
      };
    }
    case MESSAGE_CENTER_SCENE_CREATE_POST_OPEN: {
      return {
        ...state,
        isCreatePostModalOpen: true,
      };
    }
    case MESSAGE_CENTER_SCENE_CREATE_POST_CLOSE: {
      return {
        ...state,
        isCreatePostModalOpen: false,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
