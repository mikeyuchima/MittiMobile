import moment from 'moment';
// action types
import {
  SCHEDULE_CENTER_SCENE_GET_MESSAGES,
  SCHEDULE_CENTER_SCENE_GET_MESSAGES_SUCCESS,
  SCHEDULE_CENTER_SCENE_GET_MESSAGES_ERROR,
  SCHEDULE_CENTER_SCENE_GOTO_CHAT,
} from './scheduleCenterActions';

import * as colors from '../../styles/colors';
import {POST_TYPES} from '../../constants/constants';

const initialState = {
  chats: [],
};

export default function scheduleCenterScene(state = initialState, action) {
  switch (action.type) {
    case SCHEDULE_CENTER_SCENE_GET_MESSAGES_SUCCESS: {
      var chats = action.appointmentChats.map((aChat) => {
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
    case SCHEDULE_CENTER_SCENE_GOTO_CHAT: {
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
    default: {
      // nothing to do
      return state;
    }
  }
}
