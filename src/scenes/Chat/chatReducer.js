import moment from 'moment';
// action types
import {
    CHAT_SCENE_SET_ITEM,
    CHAT_SCENE_SET_ITEM_SUCCESS,
    CHAT_SCENE_SET_ITEM_ERROR,
    CHAT_SCENE_CHANGE_TEXT_VALUE,
    CHAT_SCENE_SEND_MESSAGE,
    CHAT_SCENE_SEND_MESSAGE_SUCCESS,
    CHAT_SCENE_SEND_MESSAGE_ERROR,
    CHAT_SCENE_ACCEPT_APPOINTMENT,
    CHAT_SCENE_ACCEPT_APPOINTMENT_SUCCESS,
    CHAT_SCENE_ACCEPT_APPOINTMENT_ERROR,
    CHAT_SCENE_SET_SCHEDULE,
    CHAT_SCENE_SEND_APPOINTMENT_REQUEST,
    CHAT_SCENE_SEND_APPOINTMENT_REQUEST_SUCCESS,
    CHAT_SCENE_SEND_APPOINTMENT_REQUEST_ERROR,
    CHAT_SCENE_CANCEL_APPOINTMENT_REQUEST,
    CHAT_SCENE_INITIALIZE_CHAT,
    CHAT_SCENE_INITIALIZE_CHAT_SUCCESS,
    CHAT_SCENE_INITIALIZE_CHAT_ERROR,
    CHAT_SCENE_GET_MESSAGES,
    CHAT_SCENE_GET_MESSAGES_SUCCESS,
    CHAT_SCENE_GET_MESSAGES_ERROR,
    CHAT_SCENE_SET_MAP_SNAPSHOT,
    CHAT_SCENE_SET_MAP_SNAPSHOT_SUCCESS,
    CHAT_SCENE_SAVE_STATE,
    CHAT_SCENE_REMOVE_STATE,
} from './chatActions';

// module action types
import { AUTH_DESTROY_SESSION } from '../../modules/auth/authActions';

import * as colors from '../../styles/colors';
import { POST_TYPES } from '../../constants/constants';

const initialState = {
    item: {},
    currentImage: {},
    isDatepickerOpen: false,
    messageText: '',
    messages: [],
    chat: {},
    refreshTimestamp: 0,
    isGettingChatData: false,
    isSendingMessage: false,
    isReloadingChat: false,
    isAcceptingAppointment: false,
    themeColor: colors.ERROR,
    scene: '',
};

export default function chatScene(state = initialState, action) {
    switch (action.type) {
        case CHAT_SCENE_SAVE_STATE: {
            return {
                ...state,
                scene: true,
            };
        }
        case CHAT_SCENE_REMOVE_STATE: {
            return {
                ...state,
                scene: false,
            };
        }
        case AUTH_DESTROY_SESSION: {
            return {
                ...initialState,
            };
        }
        case CHAT_SCENE_SET_ITEM: {
            return {
                ...state,
                isGettingChatData: true,
            };
        }
        case CHAT_SCENE_SET_ITEM_SUCCESS: {
            const currentImage = {
                index: 0,
                url: (action.item.images && action.item.images[0]) || '',
            };

            let themeColor = '';

            // pick theme color
            switch (action.item.type) {
                case POST_TYPES.free.id: {
                    themeColor = colors.GREEN;
                    break;
                }
                case POST_TYPES.buy.id: {
                    themeColor = colors.BLUE;
                    break;
                }
                case POST_TYPES.sell.id: {
                    themeColor = colors.ORANGE;
                    break;
                }
                default: {
                    themeColor = colors.ERROR;
                }
            }

            return {
                ...state,
                item: action.item,
                currentImage,
                themeColor,
                isGettingChatData: false,
            };
        }
        case CHAT_SCENE_SET_ITEM_ERROR: {
            return {
                ...state,
                isGettingChatData: false,
            };
        }
        case CHAT_SCENE_CHANGE_TEXT_VALUE: {
            return {
                ...state,
                messageText: action.messageText,
            };
        }
        case CHAT_SCENE_GET_MESSAGES: {
            return {
                ...state,
                isReloadingChat: true,
                refreshTimestamp: new Date().getTime(),
            };
        }
        case CHAT_SCENE_GET_MESSAGES_SUCCESS: {
            return {
                ...state,
                messages: [...action.chat.messages],
                isReloadingChat: false,
            };
        }
        case CHAT_SCENE_GET_MESSAGES_ERROR: {
            return {
                ...state,
                isReloadingChat: false,
            };
        }
        case CHAT_SCENE_SEND_MESSAGE: {
            // var sentTime = moment().format();
            // var sentMessage = {
            //   from: action.senderId,
            //   message: action.messageText,
            //   status: 'DELIVERING',
            // };

            return {
                ...state,
                messageText: '',
                // messages: [
                //   ...state.messages,
                //   sentMessage,
                // ],
                isSendingMessage: true,
            };
        }
        case CHAT_SCENE_SEND_MESSAGE_SUCCESS: {
            return {
                ...state,
                messages: [...state.messages, action.message],
                isSendingMessage: false,
            };
        }
        case CHAT_SCENE_SEND_MESSAGE_ERROR: {
            // var sentMessage = {
            //   from: action.me.id,
            //   message: action.messageText,
            //   status: 'NOT_DELIVERED'
            // };

            return {
                ...state,
                // messages: [
                //   ...state.chat.messages,
                //   sentMessage,
                // ],
                isSendingMessage: false,
            };
        }
        case CHAT_SCENE_ACCEPT_APPOINTMENT: {
            return {
                ...state,
                isAcceptingAppointment: true,
            };
        }
        case CHAT_SCENE_ACCEPT_APPOINTMENT_SUCCESS: {
            return {
                ...state,
                chat: action.chat,
                isAcceptingAppointment: false,
            };
        }
        case CHAT_SCENE_ACCEPT_APPOINTMENT_ERROR: {
            return {
                ...state,
                isAcceptingAppointment: false,
            };
        }
        case CHAT_SCENE_SET_SCHEDULE: {
            return {
                ...state,
                item: {
                    ...state.item,
                    requestedAppointment: null,
                    hasAppointment: false,
                    appointment: null,
                },
                isDatepickerOpen: true,
            };
        }
        case CHAT_SCENE_SEND_APPOINTMENT_REQUEST: {
            return {
                ...state,
                chat: {
                    ...state.chat,
                    scheduledAt: action.timestamp,
                    scheduledBy: action.meId,
                },
                isDatepickerOpen: false,
            };
        }
        case CHAT_SCENE_SEND_APPOINTMENT_REQUEST_SUCCESS: {
            return {
                ...state,
                chat: action.chat,
                isDatepickerOpen: false,
            };
        }
        case CHAT_SCENE_SEND_APPOINTMENT_REQUEST_ERROR: {
            return {
                ...state,
                error: action.error,
                isDatepickerOpen: false,
            };
        }
        case CHAT_SCENE_CANCEL_APPOINTMENT_REQUEST: {
            return {
                ...state,
                item: {
                    ...state.item,
                    requestedAppointment: null,
                    hasAppointment: false,
                    appointment: null,
                },
                isDatepickerOpen: false,
            };
        }
        case CHAT_SCENE_INITIALIZE_CHAT: {
            return {
                ...state,
                isGettingChatData: true,
            };
        }
        case CHAT_SCENE_INITIALIZE_CHAT_SUCCESS: {
            return {
                ...state,
                isGettingChatData: false,
                chat: {
                    ...action.chat,
                    id: action.chat._id,
                },
                messages: [...action.chat.messages],
                refreshTimestamp: new Date().getTime(),
            };
        }
        case CHAT_SCENE_INITIALIZE_CHAT_ERROR: {
            return {
                ...state,
                isGettingChatData: false,
                chat: {},
            };
        }
        case CHAT_SCENE_SET_MAP_SNAPSHOT_SUCCESS: {
            return {
                ...state,
                mapSnapshot: action.mapSnapshot,
            };
        }
        default: {
            // nothing to do
            return state;
        }
    }
}
