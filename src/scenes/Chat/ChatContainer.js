import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

// components
import { SpinnerOverlay, VerificationRequest } from '../../components';
import NavBarContainer from './NavBarContainer';
import Chat from './components/Chat';
import Item from './components/Item';
import MessageInput from './components/MessageInput';

// actions
import { requestVerification } from '../../modules/auth/authActions';
import { getMe } from '../../modules/me/meActions';
import {
    setItem,
    changeTextValue,
    sendMessage,
    acceptAppointment,
    setSchedule,
    sendAppointmentRequest,
    cancelAppointmentRequest,
    isDatepickerOpen,
    initializeChat,
    getMessages,
    setMapSnapshot,
    saveState,
    removeState,
} from './chatActions';

// styles
import commonStyles from '../../styles/common';

// i18n
import { t } from '../../i18n';
import dictionary from './dictionary';

class ChatContainer extends Component {
    static propTypes = {
        me: PropTypes.object,
        setItem: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        currentImage: PropTypes.object.isRequired,
        themeColor: PropTypes.string.isRequired,
        changeTextValue: PropTypes.func.isRequired,
        messageText: PropTypes.string,
        sendMessage: PropTypes.func.isRequired,
        messages: PropTypes.array.isRequired,
        acceptAppointment: PropTypes.func.isRequired,
        setSchedule: PropTypes.func.isRequired,
        sendAppointmentRequest: PropTypes.func.isRequired,
        cancelAppointmentRequest: PropTypes.func.isRequired,
        initializeChat: PropTypes.func.isRequired,
        getMessages: PropTypes.func.isRequired,
        isDatepickerOpen: PropTypes.bool.isRequired,
        chat: PropTypes.object.isRequired,
        isGettingChatData: PropTypes.bool.isRequired,
        setMapSnapshot: PropTypes.func.isRequired,
        mapSnapshot: PropTypes.string,
        requestVerification: PropTypes.func.isRequired,
        getMe: PropTypes.func.isRequired,
        saveState: PropTypes.func.isRequired,
    };

    // static renderNavi
    static navigationOptions = ({ navigation }) => {
        const item = navigation.getParam('item');
        const navKey = navigation.state.key;

        // we know the item id but need to get the actual item first
        return {
            headerTitle: <NavBarContainer item={item} navKey={navKey} />,
            headerLeft: null,
        };
    };

    componentDidMount() {
        const itemId = this.props.navigation.getParam('itemId'),
            chatId = this.props.navigation.getParam('chatId');
        this.props.setItem(itemId);
        this.props.initializeChat(itemId, chatId);
        this.props.navigation.setParams({
            item: this.props.items,
        });
        console.log('componentMount', this.props)
    }

    shouldComponentUpdate(nextProps) {
        const chatId = nextProps.navigation.getParam('chatId');
        const itemId = nextProps.navigation.getParam('itemId');
        const refreshTimestamp = nextProps.navigation.getParam('refreshTimestamp');
        const { item, chat, navigation, messages, getMessages, isReloadingChat } = this.props;

        if (item && item.id && chat && chat.id && isReloadingChat) {
            getMessages(item.id, chat.id);
            if (messages.length !== nextProps.messages.length) return true
            else false
        }

        if (this.props !== nextProps) {
            return true;
        }

        if (navigation.isFocused()) {
            this.props.saveState();
            return true;
        }
        if (!navigation.isFocused()) {
            this.props.removeState();
            return true;
        }


        // check if we have navigation params, item, and chat objects
        if (chatId && item && chat) {
            // check if new chat window
            if (chatId != chat.id) {
                this.props.setItem(itemId);
                this.props.initializeChat(itemId, chatId);
                return true;

            } else if (this.props.refreshTimestamp < refreshTimestamp) { // check if the same chat object if there are any updates
                navigation.setParams({
                    item,
                });
                // get chat data
                this.props.getMessages(itemId, chatId);
                return true;
            }
        } else {
            return false;
        }
    }

    componentWillUnmount() {
        this.props.removeState();
    }

    reload = () => {
        var { item, chat, getMessages } = this.props;

            // check if we have item and chat
            if (item && item.id && chat && chat.id) {
                // get chat data
                getMessages(item.id, chat.id);
            }
    };

    render() {
        const {
            me,
            item,
            currentImage,
            themeColor,
            changeTextValue,
            messageText,
            messages,
            sendMessage,
            acceptAppointment,
            setSchedule,
            sendAppointmentRequest,
            cancelAppointmentRequest,
            isDatepickerOpen,
            chat,
            isGettingChatData,
            mapSnapshot,
        } = this.props;

        if (!me || (isGettingChatData && !chat)) {
            return <SpinnerOverlay show={true} />;
        } else if (!me.isVerified) {
            return (
                <VerificationRequest
                    username={me.username}
                    resend={this.props.requestVerification}
                    reload={this.props.refreshScene}
                    isOpen={true}
                />
            );
        } else {
            return (
                <View style={commonStyles.fullScreen}>
                    <Item
                        item={item}
                        chat={chat}
                        currentImage={currentImage}
                        mapSnapshot={mapSnapshot}
                        themeColor={themeColor}
                    />
                    <Chat
                        me={me}
                        item={item}
                        messages={messages}
                        acceptAppointment={acceptAppointment}
                        setSchedule={setSchedule}
                        sendAppointmentRequest={sendAppointmentRequest}
                        cancelAppointmentRequest={cancelAppointmentRequest}
                        isDatepickerOpen={isDatepickerOpen}
                        chat={chat}
                    />
                    <MessageInput
                        senderId={me.id}
                        itemId={item.id}
                        chatId={chat.id}
                        changeTextValue={changeTextValue}
                        messageText={messageText}
                        sendMessage={sendMessage}
                        setSchedule={setSchedule}
                        hasAppointment={chat.scheduleConfirmation != 'none'}
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        // states
        ...state.chatScene,
        me: state.me.me,
    };
}

export default connect(
    mapStateToProps,
    {
        setItem,
        changeTextValue,
        sendMessage,
        acceptAppointment,
        setSchedule,
        sendAppointmentRequest,
        cancelAppointmentRequest,
        initializeChat,
        getMessages,
        setMapSnapshot,
        isDatepickerOpen,
        requestVerification,
        getMe,
        saveState,
        removeState,
    }
)(ChatContainer);
