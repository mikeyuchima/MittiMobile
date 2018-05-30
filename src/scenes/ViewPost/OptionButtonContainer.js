import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// components 
import {
  View,
  TouchableOpacity,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
// actions
import {
  openOptionDropdown,
  closeOptionDropdown,
} from './viewPostActions.js';

// styles
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';
import mittiStyles from '../../styles/mitti';

import {t} from '../../i18n';
import dictionary from './dictionary';

class OptionButtonContainer extends Component {
  static propTypes = {
    isOptionDropdownOpen: PropTypes.bool.isRequired,
    openOptionDropdown: PropTypes.func.isRequired,
    closeOptionDropdown: PropTypes.func.isRequired,
  };

  render(){
    const {
      openOptionDropdown, 
      closeOptionDropdown, 
      isOptionDropdownOpen
    } = this.props;

    return (
      <TouchableOpacity 
        onPress={isOptionDropdownOpen ? closeOptionDropdown : openOptionDropdown}
        style={mittiStyles.navbarButtonContainer}>
        <FAIcon 
          size={font.SIZE_H1} 
          color={colors.WHITE} 
          name={'ellipsis-v'} />
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.viewPostScene,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    openOptionDropdown,
    closeOptionDropdown,
  }
)(OptionButtonContainer);
