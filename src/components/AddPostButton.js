import React, {Component, PropTypes} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import mittiStyles from '../styles/mitti';
import * as colors from '../styles/colors';

export default class AddPostButton extends Component {
  static propTypes = {
    onCreatePost: PropTypes.func.isRequired,
    buttonColor: PropTypes.string,
  };

  static defaultProps = {
    buttonColor: colors.BLUE,
  };

  render() {
    return (
      <TouchableOpacity 
        onPress={this.props.onCreatePost}
        style={[
          styles.buttonContainer,
          {backgroundColor: this.props.buttonColor}
        ]}>

        <MCIIcon
          size={35}
          color={colors.WHITE}
          name={'pencil'} 
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 35,
    right: 30,
    width: 60,
    height: 60,
  },
});