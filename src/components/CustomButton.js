import React, {Component} from 'react'; import PropTypes from 'prop-types';

// components
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

// styles

export default CustomButton = ({
  style,
  label, 
  borderColor, 
  backgroundColor, 
  labelColor,
  labelDisabledColor,
  disabled, 
  onPress
}) => (
  <View style={style}>
    <View style={[
      styles.container,
      disabled ? styles.disabledContainer : styles.enabledContainer,
    ]}>
      <TouchableOpacity
        style={[
          styles.clickArea, 
          getUserStyles(borderColor, backgroundColor)
        ]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={[
          styles.label, 
          {color: disabled ? labelDisabledColor : labelColor},
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

CustomButton.propTypes = {
  label: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  labelColor: PropTypes.string,
  labelDisabledColor: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

CustomButton.defaultProps = {
  label: '',
  borderColor: '#135EA4',
  backgroundColor: '#135EA4',
  labelColor: '#FFFFFF',
  labelDisabledColor: '#CCCCCC',
  disabled: false,
  onPress: function() {},
};

const styles = StyleSheet.create({
  disabledContainer: {
    opacity: 0.6
  },
  clickArea: {
    padding: 10,
  },
  label: {
    textAlign: 'center',
    fontSize: 18,
  },
});

function getUserStyles(borderColor, backgroundColor) {
  var userStyles = {};

  // check if we have border color
  if(borderColor) {
    userStyles.borderWidth = 1;
    userStyles.borderColor = borderColor;
  }
  // check if we have background color
  if(backgroundColor) {
    userStyles.backgroundColor = backgroundColor;
  }

  return userStyles;
}
