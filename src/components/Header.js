import React, {Component, PropTypes} from 'react';

// components
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

// styles
import commonStyles from '../styles/common';
import mittiStyles from '../styles/mitti';
import * as colors from '../styles/colors';

// constants
import {HEADER_HEIGHT} from '../constants/constants';

export default Header = ({children, style}) => (
  <View style={[
    styles.header, 
    mittiStyles.darkBody, 
    style
  ]}>
    {children}
  </View>
);

Header.propTypes = {
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
    height: HEADER_HEIGHT,
	},
});
