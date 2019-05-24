import React, {Component} from 'react'; import PropTypes from 'prop-types';

// components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as font from '../../../styles/font';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class OptionDropDown extends Component {
  static propTypes = {
    isOptionDropdownOpen: PropTypes.bool.isRequired,
    // onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMarkClose: PropTypes.func.isRequired,
  };

  render() {
    // check if to render
    if(!this.props.isOptionDropdownOpen) {
      return null;
    }
    else {
      return (
        <View style={styles.container}>
          <View style={[
            styles.listMenu,
            mittiStyles.darkBody,
          ]}>
            {/*<MenuItem label={t(dictionary.edit)} onPress={this.props.onEdit} />*/}
            {/*<MenuItem label={t(dictionary.markClose)} onPress={this.props.onMarkClose} />*/}
            <MenuItem label={t(dictionary.delete)} onPress={this.props.onDelete} />
          </View>
        </View>
      );
    }
  }
}

const MenuItem = ({label, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.menuItem,
    ]}>
    <Text style={[
      styles.itemLabel,
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  listMenu: {
    paddingVertical: 8,
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  itemLabel: {
    fontSize: font.SIZE_H1,
    color: '#FFFFFF',
  },
});
