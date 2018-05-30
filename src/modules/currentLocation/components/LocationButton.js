import React, {Component, PropTypes} from 'react';

// components
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// icons
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default LocationButton = ({
  generateLocation,
}) => (
  <TouchableOpacity 
    onPress={() => generateLocation()}
    style={styles.locationIconContainer}>
    <MCIIcon
      size={26}
      name={'target'}
    />
  </TouchableOpacity>
);

LocationButton.propTypes = {
  generateLocation: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  locationIconContainer: {
    justifyContent: 'center',
  },
});
