import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// components 
import {
  View,
} from 'react-native';
import LocationButton from './components/LocationButton';

// actions
import {
  generateLocation,
} from './currentLocationActions';

// styles
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

import {t} from '../../i18n';
import dictionary from './dictionary';

class CurrentLocationContainer extends Component {
  static propTypes = {
    generateLocation: PropTypes.func.isRequired,
  };

  render(){
    return (
      <LocationButton
       generateLocation={this.props.generateLocation} />
    );
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.currentLocation,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    generateLocation,
  }
)(CurrentLocationContainer);
