import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// components 
import {
  View,
} from 'react-native';
import Button from './components/Button';
// actions
import {openDropdown, closeDropdown} from './radiusActions';

// styles
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

import {t} from '../../i18n';
import dictionary from './dictionary';

class OpenDropdownButtonContainer extends Component {
  static propTypes = {
    // states
    isDropdownOpen: PropTypes.bool.isRequired,
    radius: PropTypes.number.isRequired,
    radiusUnit: PropTypes.string.isRequired,

    // actions
    openDropdown: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired,
  };

  render(){
    return (
      <Button {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {isDropdownOpen, radius, radiusUnit} = state.radius;

  return {
    // states
    radius,
    radiusUnit,
    isDropdownOpen,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    openDropdown,
    closeDropdown,
  }
)(OpenDropdownButtonContainer);
