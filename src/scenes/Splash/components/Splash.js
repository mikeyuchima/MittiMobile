import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import commonStyles from '../../../styles/common';

export default Splash = () => (
  <View style={[commonStyles.fullScreen, commonStyles.centeredChilds]}>
    <View style={styles.stretched}>
      <Image 
        style={styles.logo}
        source={require('../../../assets/images/logo.png')} />
      <Text style={styles.text}>The Sharing Community</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20
  },
  text: {
    textAlign: 'center',
  },
});