import React, {Component, PropTypes} from 'react';

// components
import {
  StyleSheet,
  View
} from 'react-native';

// styles
import commonStyles from '../../../styles/common';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class Boilerplate extends Component {
  static propTypes = {
  };

  render() {
    return (
      <View style={[commonStyles.fullScreen, commonStyles.centeredChilds]}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
