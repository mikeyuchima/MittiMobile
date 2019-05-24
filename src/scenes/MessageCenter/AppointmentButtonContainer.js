import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components 
import AppointmentButton from './components/AppointmentButton';
// actions
import {changeScene} from '../../modules/navigation/navigationActions.js';

import {t} from '../../i18n';
import dictionary from './dictionary';
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

class AppointmentButtonContainer extends Component {
  static propTypes = {
    chats: PropTypes.array.isRequired,
    changeScene: PropTypes.func.isRequired,
  };

  render(){
    const {chats, changeScene} = this.props;
    const appointmentChats = chats.filter((aChat) => {
      return aChat.scheduleConfirmation == 'accepted';
    });

    return (
      <AppointmentButton 
        color={colors.BLUE}
        badgeWidth={16}
        fontSize={font.SIZE_TINY}
        count={appointmentChats.length}
        changeScene={changeScene}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.messageCenterScene,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    changeScene,
  }
)(AppointmentButtonContainer);
