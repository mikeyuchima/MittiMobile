import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import Map from '../../../modules/map/MapContainer';
import ItemList from './ItemList';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class Marketplace extends Component {
  static propTypes = {
    themeColor: PropTypes.string.isRequired,
    changeScene: PropTypes.func.isRequired,
    isFetchingItems: PropTypes.bool.isRequired,
    marketType: PropTypes.string.isRequired,
    area: PropTypes.object.isRequired,
    onRegionChange: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    item: PropTypes.object,
    items: PropTypes.array,
  };

  render() {
    const {
      items, 
      changeScene,
      isFetchingItems, 
      marketType, 
      area,
      themeColor
    } = this.props;
    const markers = items.map((q) => {
      return {
        id: q.obj._id,
        title: q.obj.title,
        description: q.obj.description,
        latitude: q.obj.location.coordinates[0],
        longitude: q.obj.location.coordinates[1],
      }
    });

    return (
      <ScrollView style={[
        commonStyles.fullScreen, 
        mittiStyles.darkBody,
        mittiStyles.topWithNavBar,
      ]}>
        <View>
          <View style={mapStyles.mapContainer}>
            <Map 
              item={this.props.item}
              getItem={this.props.getPost}
              onRegionChange={this.props.onRegionChange}
              currentRegion={this.props.currentRegion}
              radius={this.props.radius}
              markers={markers} />
          </View>
          <ItemList
            themeColor={themeColor}
            changeScene={changeScene}
            isFetchingItems={isFetchingItems}
            marketType={marketType}
            area={area}
            items={items}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
});

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: 400,
  },
  mapContainerShort: {
    height: 100,
  },
});
