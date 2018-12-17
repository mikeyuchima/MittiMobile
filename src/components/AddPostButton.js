import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as colors from '../styles/colors';
import { POST_TYPES } from '../constants/constants';

export default class AddPostButton extends Component {
  static propTypes = {
    onCreatePost: PropTypes.func,
    changeScene: PropTypes.func,
    buttonColor: PropTypes.string,
  };

  static defaultProps = {
    buttonColor: colors.BLUE,
  };

  render() {
    return (
      <TouchableOpacity 
        onPress={ this._createPost }
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

  _createPost = () => {
    this.props.changeScene('createPost', params = {
      postType: POST_TYPES.free.id,
    });
    // @TODO look at CommunityContainer when we are enabling Community scene!
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