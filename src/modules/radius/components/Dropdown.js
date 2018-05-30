import React, {Component} from 'react'; import PropTypes from 'prop-types';

// components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as font from '../../../styles/font';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default Dropdown = ({radius, radiusUnit, changePickerValue}) => (
  <View style={styles.container}>
    <View style={[
      styles.listMenu,
      mittiStyles.darkBody,
    ]}>
      {renderMenuItems(radius, radiusUnit, changePickerValue)}
    </View>
  </View>
);

Dropdown.propTypes = {
  changePickerValue: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
  radiusUnit: PropTypes.string.isRequired,
};

const menuItems = [
  {
    radius: 10,
  },
  {
    radius: 20,
  },
  {
    radius: 30,
  },
  {
    radius: 40,
  },
  {
    radius: 50,
  },
];

const renderMenuItems = (radius, radiusUnit, changePickerValue) => {
  return menuItems.map(function(aMenuItem) {
    var isSelected = aMenuItem.radius == radius;

    return (
      <TouchableOpacity 
        key={aMenuItem.radius}
        onPress={() => changePickerValue(aMenuItem.radius, radiusUnit)}
        style={[
          styles.menuItem,
          isSelected ? styles.menuItemSelected: {},
        ]}>
        <Text style={[
          styles.itemLabel,
          isSelected ? {} : mittiStyles.darkFont,
        ]}>
          {aMenuItem.radius.toString() + radiusUnit.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    ...Platform.select({
      ios: {
        top: 64,
      },
      android: {
        top: 54,
      },
      windows: {
        top: 54,
      },
    }),
  },
  listMenu: {
    paddingVertical: 8,
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  menuItemSelected: {
    backgroundColor: '#21242C',
  },
  itemLabel: {
    fontSize: font.SIZE_H1,
    color: '#FFFFFF',
  },
});
