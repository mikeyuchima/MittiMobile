// api
import * as meApi from '../../api/meApi';
import * as postApi from '../../api/postApi';

// other module actions
import * as appActions from '../../modules/app/appActions';
import { changeScene } from '../../modules/navigation/navigationActions';

// other


export const MESSAGE_CENTER_SCENE_GET_MESSAGES = 'MESSAGE_CENTER_SCENE_GET_MESSAGES';
export const MESSAGE_CENTER_SCENE_GET_MESSAGES_SUCCESS =
    'MESSAGE_CENTER_SCENE_GET_MESSAGES_SUCCESS';
export const MESSAGE_CENTER_SCENE_GET_MESSAGES_ERROR = 'MESSAGE_CENTER_SCENE_GET_MESSAGES_ERROR';
export const MESSAGE_CENTER_SCENE_GOTO_CHAT = 'MESSAGE_CENTER_SCENE_GOTO_CHAT';
export const MESSAGE_CENTER_SCENE_CREATE_POST_OPEN = 'MESSAGE_CENTER_SCENE_CREATE_POST_OPEN';
export const MESSAGE_CENTER_SCENE_CREATE_POST_CLOSE = 'MESSAGE_CENTER_SCENE_CREATE_POST_CLOSE';

export const getMessages = item => {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        dispatch({
            type: MESSAGE_CENTER_SCENE_GET_MESSAGES,
        });

        return meApi
            .findChats(token)
            .then(resp => dispatch(appActions.processApiResponse(resp)))
            .then(chats => {
                let theChats = chats.rows;

                // check if we have item id
                if (item && item._id && theChats) {
                    theChats = theChats.filter(aChat => {
                        return aChat.post._id == item._id;
                    });
                }
                dispatch({
                    type: MESSAGE_CENTER_SCENE_GET_MESSAGES_SUCCESS,
                    chats: theChats,
                });

                return theChats;
            })
            .catch(error => {
                dispatch({
                    type: MESSAGE_CENTER_SCENE_GET_MESSAGES_ERROR,
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
            navigationParams: {
                itemId,
                chatId: chat.id,
                refreshTimestamp: new Date().getTime(),
            },
        };

        dispatch({
            type: MESSAGE_CENTER_SCENE_GOTO_CHAT,
            itemId,
            chat,
            userId: me.id,
        });
        dispatch(changeScene('chat', params));
    };
};

export const openCreatePostModal = () => ({
    type: MESSAGE_CENTER_SCENE_CREATE_POST_OPEN,
});

export const closeCreatePostModal = () => ({
    type: MESSAGE_CENTER_SCENE_CREATE_POST_CLOSE,
});
