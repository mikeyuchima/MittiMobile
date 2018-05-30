import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// components
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';
import NavBackButton from '../../components/NavBackButton';

// actions
import {
  toggleEditMode, 
} from './profileActions';

// styles
import commonStyles from '../../styles/common';
import mittiStyles from '../../styles/mitti';
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

// i18n
import {t} from '../../i18n';
import dictionary from './dictionary';

class CancelButtonContainer extends Component {
  static propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
  };

  render() {
    const {
      isEditMode,
      toggleEditMode,
    } = this.props;

    // check if edit mode
    if(isEditMode) {
      return (
        <NavBackButton
          back={() => toggleEditMode(false)} />
      );
    }
    else {
      return <BackButtonContainer />
    }
  }
}

function mapStateToProps(state) {
  return {
    // states
    ...state.profileScene,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    toggleEditMode,
  }
)(CancelButtonContainer);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    padding: 8,
  },
  buttonLabel: {
    fontSize: font.SIZE_H2,
    color: colors.WHITE,
  },
});