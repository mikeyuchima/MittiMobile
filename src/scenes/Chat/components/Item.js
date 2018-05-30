import React, {Component, PropTypes} from 'react';
// components
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Text,
  Dimensions
} from 'react-native';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

// components
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

// other
const {width} = Dimensions.get('window');

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    currentImage: PropTypes.object.isRequired,
    themeColor: PropTypes.string.isRequired,
  };

  render() {
    const {
      item,
      chat,
      currentImage,
      themeColor,
    } = this.props;
    const isScheduled = chat &&
                        chat.scheduleConfirmation &&
                        chat.scheduleConfirmation != 'none';
    const coordinates = item &&
                        item.location &&
                        item.location.coordinates;
    const latitude = coordinates &&
                     coordinates[0];
    const longitude = coordinates &&
                      coordinates[1];
    const mapWidth = Math.floor(width);
    const zoomLevel = 16;

    let mapSnapshot = '',
        markerLabel = '';

    // check if we have coordinates
    if(latitude && longitude) {
      markerLabel = latitude + ',' + longitude;
      mapSnapshot = 'https://maps.googleapis.com/maps/api/staticmap?center=' + markerLabel + '&zoom=' + zoomLevel + '&scale=1&size=' + mapWidth + 'x100&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C' + markerLabel;
    }

    return (
      <View style={mittiStyles.topWithNavBar}>
        <View style={mapStyles.mapContainer}>
          {
            mapSnapshot
            ? <Image 
                style={styles.mapSnapshot}
                source={{ uri: mapSnapshot }} />
            : null
          }
          
        </View>
        <ItemRow 
          item={item} 
          themeColor={themeColor} 
        />
        {
          isScheduled
          ? <ScheduleRow item={item} chat={chat} />
          : null
        }
      </View>
    );
  }
}

const ItemRow = ({item, themeColor}) => {
  // check if we have item
  if(item) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.contentContainer}>
          <View style={styles.thumbnailContainer}>
            <ItemImage images={item.images} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
              <Text style={mittiStyles.whiteFontStrong}>
                {item.title}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={[
                mittiStyles.darkFontStrong,
                styles.price,
                {backgroundColor: themeColor}
              ]}>
                {t(dictionary.free).toUpperCase()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  else {
    return null;
  }
};

const ItemImage = ({images}) => {
  let imageSource = images &&
                    images.length &&
                    images[0];

  // check if we have an image
  if(imageSource) {
    return (
      <Image
        style={styles.image}
        source={{ uri: imageSource }} />
    );
  }
  else {
    return (
      <FAIcon
        size={font.SIZE_MENU_ICON}
        color={colors.GREY}
        name={'picture-o'} />
    );
  }
};

const ScheduleRow = ({item, chat}) => {
  let displayTime = null;

  // check if we have item
  if(chat) {
    displayTime = chat.scheduledAt || null;
    displayTime = displayTime && moment(displayTime).format('dddd MMM, D @ ha');

    return (
      <View style={[
        mittiStyles.darkBody,
        styles.scheduleContainer,
      ]}>
        <View style={styles.buttonContainer}>
          <MCIIcon
            size={font.SIZE_MENU_ICON} 
            color={colors.DARK_GREY}
            name={'timetable'} />
        </View>
        <View style={styles.scheduleTimeContainer}>
          <Text style={mittiStyles.darkFontStrong}>
            {displayTime}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          {
            chat.scheduleConfirmation == 'accepted'
            ? <Text style={styles.status}>
                {t(dictionary.confirmed)}
              </Text>
            : null
          }
        </View>
      </View>
    );
  }
  else {
    return null;
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  thumbnailContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  mapSnapshot: {
    height: 100,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonContainer: {
    marginRight: 10,
  },
  scheduleTimeContainer: {
    marginRight: 10,
  },
  statusContainer: {
  },
  status: {
    fontSize: font.SIZE_TINY,
    color: colors.WHITE,
    backgroundColor: colors.GREEN,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: 100,
    opacity: 0.2,
  },
});