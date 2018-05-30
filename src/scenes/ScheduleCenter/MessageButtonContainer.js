import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// components 
import MessageButton from './components/MessageButton';
// other
import {changeScene} from '../../modules/navigation/navigationActions.js';

import {t} from '../../i18n';
import dictionary from './dictionary';
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

class MessageButtonContainer extends Component {
  static propTypes = {
    unreadMessages: PropTypes.array.isRequired,
    changeScene: PropTypes.func.isRequired,
  };

  render(){
    const {unreadMessages, changeScene} = this.props;

    return (
      <MessageButton 
        color={colors.BLUE}
        badgeWidth={16}
        fontSize={font.SIZE_TINY}
        count={unreadMessages && unreadMessages.length}
        changeScene={changeScene}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.scheduleCenterScene,
    unreadMessages: state.unreadMessages.unreadMessages,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    changeScene,
  }
)(MessageButtonContainer);
