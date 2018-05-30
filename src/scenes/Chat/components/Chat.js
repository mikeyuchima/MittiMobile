import React, {Component} from 'react'; import PropTypes from 'prop-types';
// components
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

// components
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class Chat extends Component {
  static propTypes = {
    me: PropTypes.object,
    item: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    acceptAppointment: PropTypes.func.isRequired,
    setSchedule: PropTypes.func.isRequired,
    sendAppointmentRequest: PropTypes.func.isRequired,
    cancelAppointmentRequest: PropTypes.func.isRequired,
    isDatepickerOpen: PropTypes.bool.isRequired,
    chat: PropTypes.object.isRequired,
  };

  render() {
    const {
      me,
      item,
      messages,
      acceptAppointment,
      setSchedule,
      sendAppointmentRequest,
      cancelAppointmentRequest,
      isDatepickerOpen,
      chat,
    } = this.props;

    return (
      <ScrollView 
        ref={(ref) => { this.scrollView = ref; }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd();
        }}
        style={[
          mittiStyles.whiteBody,
        ]}>
        <View style={[
          commonStyles.fullScreen,
        ]}>
          <ChatWindow
            me={me}
            chat={chat}
            messages={messages}
            item={item}
            acceptAppointment={acceptAppointment}
            setSchedule={setSchedule} 
          />

          <AppointmentCreator
            itemId={item.id}
            chatId={chat.id}
            isOpen={isDatepickerOpen}
            sendRequest={sendAppointmentRequest}
            cancelRequest={cancelAppointmentRequest}
          />
        </View>
      </ScrollView>
    );
  }

  // scroll to element
  _scrollView = (el) => {
    const {scrollTo} = this.scrollView;

    // wait keyboard to appear
    setTimeout(() => {
      // make sure we still have el - user not navigates away while timer is active
      if(el) {
        // get element offset
        el.measure((a, b, width, height, px,py ) => {
          // scroll view
          scrollTo({y: height});
        });
      }
    }, 500);
  };
}

const ChatWindow = ({
  me,
  chat, 
  messages, 
  item, 
  acceptAppointment, 
  setSchedule,
}) => {
  let user = null,
      partner = null;

  // check if we have messages
  if(chat && chat.buyer && chat.seller && chat.messages) {
    // check who is seller
    if(me._id == chat.buyer.id) {
      user = chat.buyer;
      partner = chat.seller;
    }
    else {
      partner = chat.buyer;
      user = chat.seller;
    }

    return (
      <View style={styles.chatContainer}>
        {
          messages.map((aMessage, anIndex) => {
            return (
              <ChatBubble
                key={aMessage._id}
                user={user}
                partner={partner}
                message={aMessage} />
            );
          })
        }
        {
          chat.scheduleConfirmation == 'pending'
          ? <AppointmentBubble
              item={item}
              chat={chat}
              user={user}
              partner={partner}
              accept={acceptAppointment}
              setSchedule={setSchedule} 
            />
          : null
        }
      </View>
    );
  }
  else {
    return null;
  }
};

const ChatBubble = ({user, partner, message}) => {
  // check who is the sender
  if(message.from == user.id) {
    return (
      <MessageSent 
        user={user} 
        message={message} />
    );
  }
  else {
    return (
      <MessageReceived 
        partner={partner}
        message={message} />
    );
  }
};

const MessageReceived = ({partner, message}) => {
  return (
    <View style={styles.messageContainer}>
      <View style={styles.userPhotoContainer}>
        <UserPhoto user={partner} />
      </View>
      <View style={styles.bubbleContainer}>
        <View style={styles.msgReceivedContainer}>
          <Text style={styles.messageReceived}>
            {message.message}
          </Text>
        </View>
        <View style={styles.msgTimeContainer}>
          <Text style={styles.msgTimestamp}>
            {message.createdAt && moment(message.createdAt).fromNow(true)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const MessageSent = ({user, message}) => {
  return (
    <View style={styles.messageContainer}>
      <View style={styles.bubbleContainer}>
        <View style={styles.msgSentContainer}>
          <Text style={styles.messageSent}>
            {message.message}
          </Text>
        </View>
        <View style={styles.msgTimeContainer}>
          <Text style={styles.msgTimestamp}>
            {message.createdAt && moment(message.createdAt).fromNow(true)}
          </Text>
        </View>
      </View>
      <View style={styles.userPhotoContainer}>
        <UserPhoto user={user} />
      </View>
    </View>
  );
};

const AppointmentBubble = ({item, chat, user, partner, accept, setSchedule}) => {
  return (
    <View style={styles.appointmentContainer}>
      <View style={[
        styles.requestContainer,
      ]}>
        <View style={styles.iconContainer}>
          <MCIIcon
            size={font.SIZE_ICON_CONTAINER} 
            color={colors.GREY}
            name={'timetable'} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>
            {
              chat.scheduledBy == user.id
              ? t(dictionary.youScheduledMeeting)
              : t(dictionary.otherScheduledMeeting, partner.profile.firstName)
            }
          </Text>
          <Text style={styles.details}>
            {moment(chat.scheduledAt).format('dddd MMM, D @ ha')}
          </Text>
        </View>
      </View>
      {
        chat.scheduledBy != user.id && chat.scheduleConfirmation == 'pending'
        ? <View style={styles.responseContainer}>
            <TouchableOpacity
              onPress={() => accept(item.id, chat.id)}
              style={styles.acceptButton}>
              <Text style={styles.button}>
                {t(dictionary.accept)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSchedule()}
              style={styles.rescheduleButton}>
              <Text style={styles.button}>
                {t(dictionary.reschedule)}
              </Text>
            </TouchableOpacity>
          </View>
        : null
      }
    </View>
  );
};

const AppointmentCreator = ({itemId, chatId, isOpen, sendRequest, cancelRequest}) => {
  return (
    <DateTimePicker
      mode={'datetime'}
      isVisible={isOpen}
      onConfirm={(timeRequested) => sendRequest(itemId, chatId, timeRequested)}
      onCancel={() => cancelRequest()}
    />
  );
};

const UserPhoto = ({user}) => {
  var filePath = user &&
                 user.profile &&
                 user.profile.photo;

  // check if we have file path
  if(filePath) {
    return (
      <Image
        style={[
          styles.image,
          styles.userPhoto,
        ]}
        source={require('../../../assets/images/logo.png')}
      />
    );
  }
  else {
    return (
      <View style={styles.userPhotoDefault}>
        <MCIIcon
          size={font.SIZE_ICON_CONTAINER}
          color={colors.GREY}
          name={'account-circle'}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.GREY,
  },
  chatContainer: {
    marginTop: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  userPhotoContainer: {
    marginHorizontal: 5,
  },
  bubbleContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  msgReceivedContainer: {
    backgroundColor: colors.BLUE,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  msgSentContainer: {
    backgroundColor: colors.LIGHT_GREY,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messageReceived: {
    color: colors.WHITE,
    fontSize: font.SIZE_NORMAL,
  },
  messageSent: {
    color: colors.DARK_GREY,
    fontSize: font.SIZE_NORMAL,
  },
  msgTimeContainer: {
    alignItems: 'flex-end',
  },
  msgTimestamp: {
    fontSize: font.SIZE_TINY,
    color: colors.GREY,
  },
  userPhoto: {
    borderRadius: 50,
  },
  details: {
    color: colors.WHITE,
  },
  requestContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: colors.DARK_GREY,
    opacity: 0.8,
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: colors.DARK_GREY,
    padding: 15,
  },
  responseContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 20,
  },
  button: {
    color: colors.WHITE,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  acceptButton: {
    backgroundColor: colors.GREEN,
    marginRight: 5,
  },
  rescheduleButton: {
    backgroundColor: colors.BLACK,
  },
});

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: 100,
    opacity: 0.2,
  },
});