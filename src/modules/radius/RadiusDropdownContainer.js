import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// components
import Dropdown from './components/Dropdown';

// actions
import {openDropdown, closeDropdown, changePickerValue} from './radiusActions';

class RadiusDropdownContainer extends Component {
  static propTypes = {
    // states
    isDropdownOpen: PropTypes.bool.isRequired,
    radius: PropTypes.number.isRequired,
    radiusUnit: PropTypes.string.isRequired,

    // actions
    openDropdown: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired,
    changePickerValue: PropTypes.func.isRequired,
  };

  render() {
    // check if dropdown open
    if(this.props.isDropdownOpen) {
      return (
        <Dropdown {...this.props}/>
      );
    }
    else {
      return (null);
    }
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
    changePickerValue,
  }
)(RadiusDropdownContainer);
