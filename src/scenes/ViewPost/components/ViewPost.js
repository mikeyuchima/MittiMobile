import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';

// components
import CustomButton from '../../../components/CustomButton';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Map from '../../../modules/map/MapContainer';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

// other
const {width, height} = Dimensions.get('window');

export default class ViewPost extends Component {
  static propTypes = {
    themeColor: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    currentImage: PropTypes.object,
    setCurrentImage: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
  };

  render() {
    const {
      me,
      themeColor, 
      changeScene,
      item, 
      currentImage, 
      setCurrentImage,
    } = this.props;
    const coordinates = item.location &&
                        item.location.coordinates;
    const latitude = coordinates &&
                     coordinates[0];
    const longitude = coordinates &&
                      coordinates[1];

    let marker = {
      description: item.description,
      id: item.id || item._id,
      title: item.title,
      latitude,
      longitude,
    }
    let markers = [];
    
    // check if we have coordinates
    if(latitude && longitude) {
      markers = [marker];
    }

    return (
      <ScrollView 
        style={[
          mittiStyles.whiteBody,
          mittiStyles.topWithNavBar,
        ]}>
        <View style={[
          commonStyles.fullScreen,
          mittiStyles.bottomScrollExtra
        ]}>
          {
            item.images && item.images.length
              ? <ImageList images={item.images}/>
              : null
          }

          <View style={styles.subjectContainer}>
            <Text style={[
              styles.text,
              mittiStyles.whiteFontStrong,
            ]}>
              {item.title.toUpperCase()}
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[
              styles.text,
              mittiStyles.whiteFontStrong,
            ]}>
              {t(dictionary.dateListed)}: 
            </Text>
            <Text style={[
              styles.text,
              mittiStyles.whiteFontStrong,
            ]}>
              {moment(item.createdAt).format('MMMM D, YYYY')}
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[
              styles.text,
              mittiStyles.whiteFontStrong,
            ]}>
              {t(dictionary.price)}: 
            </Text>
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

          <View style={styles.fieldContainer}>
            <Text style={[
              styles.text,
              mittiStyles.whiteFontStrong,
            ]}>
              {t(dictionary.condition)}: 
            </Text>
            <Text style={[
              styles.text,
              mittiStyles.whiteFontStrong,
            ]}>
              {item.condition}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={[
              styles.text,
              mittiStyles.whiteFontStrong,
            ]}>
              {t(dictionary.description)}: 
            </Text>
            <Text style={[
              mittiStyles.whiteFont,
              styles.description,
            ]}>
              {item.description}
            </Text>
          </View>

          <View style={mapStyles.mapContainer}>
            <Map 
              isGotoDetailsEnabled={false}
              markers={markers} />
          </View>
          <View style={styles.locationContainer}>
            <Text style={[
              mittiStyles.whiteFont,
            ]}>
              {item.address}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const ImageList = ({images}) => {
  const swiperWidth = width;
  const swiperHeight = swiperWidth + 30; // for pagination placement

  return (
    <View style={styles.swiperContainer}>
      <Swiper
        ref={(swiper) => {this.swiper = swiper;}}
        paginationStyle={styles.swiperPagination}
        showsButtons={false}
        width={swiperWidth}
        height={swiperHeight}
        loop={false}
        dot={<Dot />}
        activeDot={<ActiveDot />}>
        {
          images.map((anImage, anIndex) => 
            <ImageListItem 
              key={anIndex}
              imageUrl={anImage}
              imageIndex={anIndex} 
            />
          )
        }
      </Swiper>
    </View>
  );
};

const Dot = () => (
  <View style={styles.dot} />
);

const ActiveDot = () => (
  <View style={styles.activeDot} />
);

const ImageListItem = ({imageIndex, imageUrl}) => {
  const source = { uri: imageUrl };

  // check if we have url
  if(imageUrl) {
    return (
      <View 
        onPress={() => this.swiper.scrollBy(1, true)}
        style={styles.imageContainer}>
        <Image 
          source={source} 
          width={width}
          height={width}
          style={styles.image} />
      </View>
    );
  }
  else {
    return null;
  }
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperContainer: {
    marginHorizontal: 0,
    marginBottom: 30,
  },
  swiperPagination: {
    bottom: 0,
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.LIGHT_GREY,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  descriptionContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.LIGHT_GREY,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  description: {
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  subjectContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
    marginRight: 10,
  },
  locationContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  dot: {
    backgroundColor: colors.LIGHT_GREY,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    position: 'relative',
  },
  activeDot: {
    backgroundColor: colors.DARK_GREY,
    borderColor: colors.DARK_GREY,
    width: 10,
    height: 10,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1,
  },
});

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: 200,
  },
});