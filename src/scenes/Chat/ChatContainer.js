import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';

// components
import {
  SpinnerOverlay, 
  VerificationRequest, 
} from '../../components';
import NavBarContainer from './NavBarContainer';
import Chat from './components/Chat';
import Item from './components/Item';
import MessageInput from './components/MessageInput';

// actions
import {requestVerification} from '../../modules/auth/authActions';
import {getMe} from '../../modules/me/meActions';
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
} from './chatActions';

// styles
import commonStyles from '../../styles/common';

// i18n
import {t} from '../../i18n';
import dictionary from './dictionary';

class ChatContainer extends Component {
  static propTypes = {
    me: PropTypes.object,
    navigationParams: PropTypes.object.isRequired,
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
  };

  componentDidMount() {
    const {itemId, chatId} = this.props.navigationParams;

    this.props.setItem(itemId);
    this.props.initializeChat(itemId, chatId);
  }

  componentWillReceiveProps(nextProps) {
    // check if we have navigation params, item, and chat objects
    if(nextProps.navigationParams && this.props.item && this.props.chat) {
      // check if new chat window
      if(nextProps.navigationParams.chatId != this.props.chat.id) {
        this.props.setItem(nextProps.navigationParams.itemId);
        this.props.initializeChat(nextProps.navigationParams.itemId, nextProps.navigationParams.chatId);
      }
      else {
        // check if the same chat object if there are any updates
        if(this.props.refreshTimestamp < nextProps.navigationParams.refreshTimestamp) {
          // get chat data
          this.props.getMessages(nextProps.navigationParams.itemId, nextProps.navigationParams.chatId);
        }
      }
    }
  }

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
      return <SpinnerOverlay show={true} />
    }
    else if(!me.isVerified) {
      return <VerificationRequest 
               username={me.username}
               resend={this.props.requestVerification}
               reload={this.props.refreshScene}
               isOpen={true} />
    }
    else {
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

  _reloadChat = () => {
    var reload = this._reloadChat;
    var {item, chat, getMessages} = this.props;

    // clear pooling
    window.clearTimeout(this.poolingTimerId);
    // set pooling
    this.poolingTimerId = window.setTimeout(function() {
      // check if we have item and chat
      if(item && item.id && chat && chat.id) {
        // get chat data
        getMessages(item.id, chat.id);
      }
      // recursive
      reload();
    }, 5000);
  };

  static renderNavigationBar = (props) => {
    if(!props.me || !props.me.isVerified) {
      return null;
    }
    else {
      return (
        <NavBarContainer />
      );
    }
  };
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
  }
)(ChatContainer);
