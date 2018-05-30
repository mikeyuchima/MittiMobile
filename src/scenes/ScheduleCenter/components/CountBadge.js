import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {t} from '../../../i18n';
import dictionary from '../dictionary';
import * as colors from '../../../styles/colors';

export default CountBadge = ({width, fontSize, backgroundColor, count}) => (
    <View style={[
      styles.unreadBadgeContainer,
      {
        backgroundColor,
        minWidth: width,
        height: width,
        borderRadius: width / 2,
      }
    ]}>
      <Text style={[
        styles.unreadBadge,
        { fontSize }
      ]}>
        { count }
      </Text>
    </View>
);

const styles = StyleSheet.create({
  unreadBadgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadge: {
    color: colors.WHITE,
  },
});
