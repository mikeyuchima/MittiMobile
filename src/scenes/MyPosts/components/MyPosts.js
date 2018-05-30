import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import ItemList from './ItemList';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class MyPosts extends Component {
  static propTypes = {
    themeColor: PropTypes.string.isRequired,
    changeScene: PropTypes.func.isRequired,
    isFetchingItems: PropTypes.bool.isRequired,
    marketType: PropTypes.string.isRequired,
    items: PropTypes.object,
    chats: PropTypes.object,
  };

  render() {
    const {
      items, 
      chats, 
      changeScene,
      isFetchingItems, 
      marketType, 
      themeColor,
    } = this.props;

    return (
      <ScrollView style={[
        commonStyles.fullScreen, 
        mittiStyles.whiteBody,
        mittiStyles.topWithNavBar,
      ]}>
        <View>
          <ItemList
            themeColor={themeColor}
            changeScene={changeScene}
            isFetchingItems={isFetchingItems}
            marketType={marketType}
            items={items}
            chats={chats}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
});
