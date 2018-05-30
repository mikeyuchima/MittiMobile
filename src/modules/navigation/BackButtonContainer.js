import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// actions
import {back} from './navigationActions';

// components
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBackButton from '../../components/NavBackButton';

// styles
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

class BackButtonContainer extends Component {
  static propTypes = {
    // actions
    back: PropTypes.func.isRequired,
  };

  render(){
    const {back} = this.props;

    return (
      <NavBackButton back={back} />
    );
  }
}

function mapStateToProps(state) {
  const {isDrawerOpen} = state.navigation;
  return {
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    back,
  }
)(BackButtonContainer);