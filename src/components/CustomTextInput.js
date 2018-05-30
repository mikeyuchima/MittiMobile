import React, {Component} from 'react'; import PropTypes from 'prop-types';

// components
import {
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// styles
import commonStyles from '../styles/common';
import mittiStyles from '../styles/mitti';
import * as font from '../styles/font';

export default CustomTextInput = ({
  type, 
  value, 
  style, 
  placeholder, 
  autoFocus, 
  isIconPositionRight,
  onChangeText
}) => (
  <View style={[styles.container, getUserStyles(style).container]}>
    <View style={styles.rowContainer}>
      { isIconPositionRight ? null : <InputIcon style={style} type={type} /> }
      <View style={styles.inputContainer}>
        <TextInput 
          style={[styles.input, getUserStyles(style).fontColor]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type == 'password'}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus={autoFocus}
          keyboardType={getKeyboardType(type)}
          placeholder={placeholder}
          placeholderTextColor={getUserStyles(style).placeholder}
        />
      </View>
      { isIconPositionRight ? <InputIcon style={style} type={type} /> : null }
    </View>
  </View>
);

CustomTextInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  isIconPositionRight: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
};

CustomTextInput.defaultProps = {
  type: 'default',
  value: '',
  style: 'dark',
  placeholder: '',
  autoFocus: false,
  isIconPositionRight: false,
  onChangeText: function() {},
};

const InputIcon = ({style, type}) => (
  <View style={styles.iconContainer}>
    <Icon 
      style={getUserStyles(style).icon}
      size={font.SIZE_ICON}
      name={getIconName(type)} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  darkBackground: {
    backgroundColor: '#1D2027',
  },
  darkIcon: {
    color: '#313642',
  },
  darkFont: {
    color: 'white',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 14,
    width: font.SIZE_ICON_CONTAINER
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    fontSize: 14
  }
});

function getIconName(type) {
  var iconName = '';

  // check type
  switch(type) {
  case 'name':
    iconName = 'user';
    break;
  case 'email':
    iconName = 'envelope';
    break;
  case 'password':
    iconName = 'key';
    break;
  case 'message':
    iconName = 'paper-plane';
    break;
  default:
    iconName = 'font';
  }

  return iconName;
}

function getUserStyles(type) {
  var userStyles= {};

  // check type
  switch(type) {
    default: {
      userStyles.container = styles.darkBackground;
      userStyles.icon = styles.darkIcon;
      userStyles.iconContainer = styles.leftIcon;
      userStyles.placeholder = '#525355';
      userStyles.fontColor = styles.darkFont
    }
  }

  return userStyles;
}

function getKeyboardType(type) {
  var keyboardType = '';

  // check type
  switch(type) {
  case 'email':
    keyboardType = 'email-address';
    break;
  default:
    keyboardType = 'default';
  }

  return keyboardType;
}
