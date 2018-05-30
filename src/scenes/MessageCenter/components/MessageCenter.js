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
import CountBadge from './CountBadge';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class MessageCenter extends Component {
  static propTypes = {
    me: PropTypes.object,
    item: PropTypes.object,
    chats: PropTypes.array.isRequired,
    unreadMessages: PropTypes.array.isRequired,
    gotoChat: PropTypes.func.isRequired,
  };

  render() {
    const {
      me,
      item,
      chats,
      unreadMessages,
    } = this.props;

    return (
      <ScrollView 
        ref={(ref) => { this.scrollView = ref; }}
        style={[
          mittiStyles.whiteBody,
          mittiStyles.topWithNavBar,
        ]}>
        <View style={[
          commonStyles.fullScreen,
          mittiStyles.bottomScrollExtra
        ]}>

          <View style={styles.titleContainer}>
            <Text style={styles.chatTitle}>
              {
                !item
                ? t(dictionary.buyingSelling)
                : chats.length === 1
                  ? t(dictionary.inquiry, chats.length)
                  : t(dictionary.inquiries, chats.length)
              }
            </Text>
          </View>
          <View style={styles.messageListContainer}>
            {this._renderMessageList()}
          </View>
        </View>
      </ScrollView>
    );
  }

  _renderMessageList = () => {
    const {
      me,
      chats,
      unreadMessages,
    } = this.props;

    // check if we have message groups
    if(chats && chats.length) {
      // go through each group
      return chats.map((aChat) => {
        return (
          <ChatItem 
            key={aChat.id}
            me={me}
            unreadMessages={unreadMessages.filter((m) => aChat.messages.includes(m._id))}
            gotoChat={this.props.gotoChat}
            chat={aChat} />
        );
      });
    }
  };
}

const ChatItem = ({me, chat, gotoChat, unreadMessages}) => {
  const post = chat.post,
        messages = chat.messages;

  let chatPartner = {};

  if(me._id == chat.buyer._id) {
    chatPartner = chat.seller &&
                  chat.seller.profile;
  }
  else {
    chatPartner = chat.buyer &&
                  chat.buyer.profile;
  }
  // check if we have a post
  if(post) {
    return (
      <TouchableOpacity 
        onPress={() => gotoChat(post._id, chat)}
        style={styles.chatItemContainer}>
        <View style={styles.userPhotoContainer}>
          <UserPhoto user={chatPartner} />
          <View style={styles.postImageContainer}>
            <ItemImage images={post.images} />
          </View>
        </View>
        <View style={styles.chatInfoContainer}>
          <View style={styles.chatPostContainer}>
            <Text style={styles.name}>
              {chatPartner.fullName}
            </Text>
            <Text style={styles.title}>
              {post && post.title}
            </Text>
          </View>
          <View style={styles.linkInfoContainer}>
            <View style={styles.badgeContainer}>
              {
                unreadMessages.length
                ? <CountBadge 
                    backgroundColor={colors.GREEN}
                    fontSize={font.SIZE_NORMAL}
                    width={26}
                    count={unreadMessages.length} />
                : null
              }
            </View>
            <View style={styles.linkIconContainer}>
              <FAIcon
                size={font.SIZE_ICON}
                color={colors.DARK_GREY}
                name={'chevron-right'}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  else {
    return null;
  }
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

const ItemImage = ({images}) => {
  let imageSource = images &&
                    images.length &&
                    images[0];

  // check if we have an image
  if(imageSource) {
    return (
      <Image
        style={styles.postImage}
        source={{ uri: imageSource }} />
    );
  }
  else {
    return (
      <FAIcon
        size={font.SIZE_NORMAL}
        color={colors.GREY}
        name={'picture-o'} />
    );
  }
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  chatTitle: {
    fontSize: font.SIZE_MENU_ICON,
  },
  chatItemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  userPhotoContainer: {
    marginHorizontal: 5,
  },
  chatInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  chatPostContainer: {
    flex: 1,
    marginRight: 5,
  },
  linkInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 60,
    marginRight: 10,
  },
  badgeContainer: {
    marginRight: 10,
  },
  name: {
    color: colors.DARK_GREY,
    fontSize: font.SIZE_H1,
  },
  title: {
    color: colors.DARK_GREY,
    fontSize: font.SIZE_NORMAL,
  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.GREY,
  },
  userPhoto: {
    borderRadius: 50,
  },
  postImageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  postImage: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.GREY,
  },
});