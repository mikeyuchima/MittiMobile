import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';

// components
import OpenDrawerButtonContainer from '../../modules/navigation/OpenDrawerButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';
import AddPostButton from '../../components/AddPostButton';
import {
  SpinnerOverlay, 
  VerificationRequest, 
  CreatePostModal
} from '../../components';
import AppointmentButtonContainer from './AppointmentButtonContainer';
import MessageCenter from './components/MessageCenter';

// actions
import {
  getMessages,
  gotoChat,
  openCreatePostModal, 
  closeCreatePostModal,
} from './messageCenterActions';
import {changeScene} from '../../modules/navigation/navigationActions.js';
import {requestVerification} from '../../modules/auth/authActions';
import {getMe} from '../../modules/me/meActions';

// styles
import commonStyles from '../../styles/common';
import * as colors from '../../styles/colors';

// i18n
import {t} from '../../i18n';
import dictionary from './dictionary';
import {POST_TYPES} from '../../constants/constants';

class MessageCenterContainer extends Component {
  static propTypes = {
    me: PropTypes.object,
    chats: PropTypes.array.isRequired,
    getMessages: PropTypes.func.isRequired,
    unreadMessages: PropTypes.array.isRequired,
    gotoChat: PropTypes.func.isRequired,
    openCreatePostModal: PropTypes.func.isRequired,
    closeCreatePostModal: PropTypes.func.isRequired,
    isCreatePostModalOpen: PropTypes.bool.isRequired,
    changeScene: PropTypes.func.isRequired,
    requestVerification: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  // static renderNavi
  static navigationOptions = ({ navigation }) => {
    const item = navigation && navigation.getParam('item');

    return {
      headerTitle: (
          <NavBar
              title={t(dictionary.messages)}
              leftButton={<OpenDrawerButtonContainer />} 
              rightButton={!item ? <AppointmentButtonContainer /> : null} 
          />
      ),
      headerLeft: null
    };
  };

  componentDidMount() {
    const {getMessages, navigation} = this.props;
    const item = navigation && navigation.getParam('item');

    // check if we have item id
    if(item) {
      getMessages(item);
    }
    else {
      getMessages();
    }
  }

  componentWillReceiveProps(props) {
    const {getMessages, navigation} = props;
    const item = navigation && navigation.getParam('item');

    // check if we have item id
    if(item && (this.itemId != item._id)) {
      getMessages(item);
      this.itemId = item._id;
    }
  }

  render() {
    const {
      me,
      chats,
      navigation,
      unreadMessages,
      gotoChat,
    } = this.props;
    const item = navigation && navigation.getParam('item');

    if (!me) {
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
          <MessageCenter 
            me={me}
            chats={chats}
            item={item}
            unreadMessages={unreadMessages}
            gotoChat={gotoChat}
          />
          <CreatePostModal
            changeScene={this.props.changeScene}
            isOpen={this.props.isCreatePostModalOpen}
            onClose={this.props.closeCreatePostModal} />
          <AddPostButton
            onCreatePost={this.props.openCreatePostModal}
            buttonColor={colors.ORANGE}
          />
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.messageCenterScene,
    me: state.me.me,
    unreadMessages: state.unreadMessages.unreadMessages,
  };
}

export default connect(
  mapStateToProps,
  {
    getMessages,
    gotoChat,
    openCreatePostModal,
    closeCreatePostModal,
    changeScene,
    requestVerification,
    getMe,
  }
)(MessageCenterContainer);
