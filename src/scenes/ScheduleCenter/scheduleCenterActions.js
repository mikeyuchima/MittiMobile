// api
import * as meApi from '../../api/meApi';
import * as postApi from '../../api/postApi';

// other module actions
import * as appActions from '../../modules/app/appActions';
import { changeScene } from '../../modules/navigation/navigationActions';

// other


export const SCHEDULE_CENTER_SCENE_GET_MESSAGES = 'SCHEDULE_CENTER_SCENE_GET_MESSAGES';
export const SCHEDULE_CENTER_SCENE_GET_MESSAGES_SUCCESS =
    'SCHEDULE_CENTER_SCENE_GET_MESSAGES_SUCCESS';
export const SCHEDULE_CENTER_SCENE_GET_MESSAGES_ERROR = 'SCHEDULE_CENTER_SCENE_GET_MESSAGES_ERROR';
export const SCHEDULE_CENTER_SCENE_GOTO_CHAT = 'SCHEDULE_CENTER_SCENE_GOTO_CHAT';

export const getChats = messages => {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        dispatch({
            type: SCHEDULE_CENTER_SCENE_GET_MESSAGES,
        });

        return meApi
            .findChats(token)
            .then(resp => dispatch(appActions.processApiResponse(resp)))
            .then(chats => {
                const appointmentChats =
                    chats.rows &&
                    chats.rows.filter(aChat => {
                        return aChat.scheduleConfirmation == 'accepted';
                    });

                dispatch({
                    type: SCHEDULE_CENTER_SCENE_GET_MESSAGES_SUCCESS,
                    appointmentChats,
                });

                return appointmentChats;
            })
            .catch(error => {
                dispatch({
                    type: SCHEDULE_CENTER_SCENE_GET_MESSAGES_ERROR,
                    error,
                });
                return error;
            });
    };
};

export const gotoChat = (itemId, chat) => {
    return (dispatch, getState) => {
        const { me } = getState().me;
        const params = {
            itemId,
            chatId: chat.id,
        };

        dispatch({
            type: SCHEDULE_CENTER_SCENE_GOTO_CHAT,
            itemId,
            chat,
            userId: me.id,
        });
        dispatch(changeScene('chat', params));
    };
};
