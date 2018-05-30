import React, {Component} from 'react'; import PropTypes from 'prop-types';

// components
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

// icons
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import commonStyles from '../../../styles/common';
import * as font from '../../../styles/font';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

const iconName = 'chevron-down';

export default Button = ({
  radius, 
  radiusUnit, 
  isDropdownOpen, 
  closeDropdown, 
  openDropdown
}) => (
  <TouchableOpacity 
    onPress={isDropdownOpen ? closeDropdown : openDropdown}
    style={styles.buttonContainer}>

    <View style={
      isDropdownOpen ? styles.labelDropdownOpen : styles.label
    }>
      <Text style={styles.text}>
        {t(dictionary.aroundMe)}:
      </Text>
    </View>
    <View style={styles.selectedValue}>
      <Text style={[
        styles.text,
        styles.valueText,
      ]}>
        {radius && radius.toString() + radiusUnit.toUpperCase()}
      </Text>
      <MCIIcon
        style={[
          styles.text,
          styles.buttonIcon,
        ]}
        name={iconName}
      />
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  radius: PropTypes.number,
  radiusUnit: PropTypes.string,
  isDropdownOpen: PropTypes.bool.isRequired,
  closeDropdown: PropTypes.func.isRequired,
  openDropdown: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
  },
  labelDropdownOpen: {
    marginRight: 35,
  },
  selectedValue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  text: {
    flex: 1,
    color: '#FFFFFF',
  },
  valueText: {
    fontSize: font.SIZE_H1,
  },
  buttonIcon: {
    fontSize: font.SIZE_H1 + 8,
  },
});
