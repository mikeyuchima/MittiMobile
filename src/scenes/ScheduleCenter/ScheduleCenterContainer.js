import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';

// components
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';
import {
  SpinnerOverlay, 
  VerificationRequest, 
} from '../../components';
import MessageButtonContainer from './MessageButtonContainer';
import ScheduleCenter from './components/ScheduleCenter';

// actions
import {
  changeScene,
} from '../../modules/navigation/navigationActions.js';
import {requestVerification} from '../../modules/auth/authActions';
import {getMe} from '../../modules/me/meActions';
import {
  getChats,
} from './scheduleCenterActions';

// styles
import commonStyles from '../../styles/common';

// i18n
import {t} from '../../i18n';
import dictionary from './dictionary';
import {POST_TYPES} from '../../constants/constants';

class ScheduleCenterContainer extends Component {
  static propTypes = {
    me: PropTypes.object,
    chats: PropTypes.array.isRequired,
    getChats: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
    requestVerification: PropTypes.func.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  // static renderNavi
  static navigationOptions = ({ navigation }) => {
    const navKey = navigation.state.key;

    return {
      headerTitle: (
          <NavBar
            title={t(dictionary.schedules)}
            leftButton={<BackButtonContainer navKey={navKey} />} 
            rightButton={<MessageButtonContainer />} 
          />
      ),
      headerLeft: null
    };
  };

  componentDidMount() {
    this.props.getChats();
  }

  render() {
    const {
      me,
      chats,
      changeScene,
    } = this.props;

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
          <ScheduleCenter 
            me={me}
            chats={chats}
            changeScene={changeScene}
          />
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.scheduleCenterScene,
    me: state.me.me,
  };
}

export default connect(
  mapStateToProps,
  {
    getChats,
    changeScene,
    requestVerification,
    getMe,
  }
)(ScheduleCenterContainer);
