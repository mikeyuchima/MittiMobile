// action types
import {
  UNREAD_MESSAGES_GET,
  UNREAD_MESSAGES_GET_SUCCESS,
  UNREAD_MESSAGES_GET_ERROR,
  UNREAD_MESSAGES_READ,
  UNREAD_MESSAGES_READ_SUCCESS,
  UNREAD_MESSAGES_READ_ERROR,
} from './unreadMessagesActions';

const initialState = {
  isFetchingUnreadMessages: false,
  unreadMessages: [],
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case UNREAD_MESSAGES_GET: {
      return {
        ...state,
        isFetchingUnreadMessages: true,
      };
    }
    case UNREAD_MESSAGES_GET_SUCCESS: {
      const {unreadMessages} = action;
      return {
        ...state,
        isFetchingUnreadMessages: false,
        unreadMessages,
      };
    }
    case UNREAD_MESSAGES_GET_ERROR: {
      return {
        ...state,
        isFetchingUnreadMessages: false,
      };
    }
    case UNREAD_MESSAGES_READ: {
      const {messages} = action;

      const messageIds = messages.map((m) => m._id);

      const unreadMessages = state.unreadMessages.filter((m) => !messageIds.includes(m._id));

      return {
        ...state,
        unreadMessages,
      };
    }
    default: {
      // nothing to do
      return state;
    }
  }
}
