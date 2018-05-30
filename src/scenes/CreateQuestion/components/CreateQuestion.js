import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import CurrentLocationContainer from '../../../modules/currentLocation/CurrentLocationContainer';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as font from '../../../styles/font';
import * as colors from '../../../styles/colors';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

// other
import {SCENES} from '../../../routes';
import {QUESTION_CATEGORIES} from '../../../constants/constants';

export default class CreateQuestion extends Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    changeFormValue: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
    getGeocodeData: PropTypes.func.isRequired,
    setAddress: PropTypes.func.isRequired,
    cancelQuestion: PropTypes.func.isRequired,
  };

  render() {
    const {
      categoryId, 
      themeColor, 
      changeFormValue, 
      changeScene,
      form, 
      getGeocodeData, 
      setAddress,
      cancelQuestion,
    } = this.props;

    return (
      <ScrollView 
        ref={(scrollView) => { this.scrollView = scrollView; }}
        style={mittiStyles.whiteBody}>
        <View style={[
          commonStyles.fullScreen,
          mittiStyles.bottomScrollExtra
        ]}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MCIIcon 
                size={30}
                color={themeColor}
                name={QUESTION_CATEGORIES[categoryId].iconName}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={[
                styles.headerText,
                {color: themeColor},
              ]}>
                {t(dictionary[categoryId])}
              </Text>
            </View>
          </View>

          <View style={styles.questionContainer}>
            <TextInput
              ref={(ref) => { this.inputQuestion = ref; }}
              onChangeText={(value) => changeFormValue('question', value)}
              onFocus={() => this._scrollView(this.inputQuestion)}
              style={styles.questionInput}
              multiline={true}
              numberOfLines={4}
              placeholder={t(dictionary.askQuestion)}
              underlineColorAndroid={'rgba(0,0,0,0)'}
            />
          </View>

          <View style={styles.locationContainer}>
            <View style={styles.locationInputContainer}>
              <TextInput
                ref={(ref) => { this.inputAddress = ref; }}
                value={form.address}
                onChangeText={(value) => changeFormValue('address', value)}
                onFocus={() => this._scrollView(this.inputAddress)}
                onBlur={() => this._validateLocation()}
                style={styles.locationInput}
                placeholder={t(dictionary.location)}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
            <CurrentLocationContainer />
          </View>

          <View style={styles.locationInfoContainer}>
            <Text style={styles.locationInfo}>
              {t(dictionary.willNotShowExactAddress)}
            </Text>
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity 
              onPress={() => cancelQuestion()}
              style={styles.anchor}>
              <Text style={styles.anchorText}>
                {t(dictionary.backToHome)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  _scrollView = (el) => {
    const {scrollTo} = this.scrollView;

    // wait keyboard to appear
    setTimeout(() => {
      // get element offset
      el.measure((a, b, width, height, px,py ) => {
        let offset = py - 20 < 0 ? 0 : py - 20;

        // scroll view
        scrollTo({y: offset});
      });
    }, 500);
  };

  _validateLocation = () => {
    const {form, getGeocodeData, setAddress} = this.props;

    let address = form.address;

    // check if we have address
    if(address) {
      getGeocodeData(address, (data) => {
        // change existing address or address value
        setAddress(data.formattedAddress);
      });
    }
  };
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 40,
  },
  iconContainer: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
  },
  questionContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.GREY,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  questionInput: {
    height: 180,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 5,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY,
  },
  locationInput: {
    fontSize: 16,
  },
  locationInfoContainer: {
    paddingHorizontal: 25,
  },
  locationInfo: {
    fontSize: 12,
  },
  locationInputContainer: {
    flex: 1,
  },
  locationIconContainer: {
    justifyContent: 'center',
  },
  linkContainer: {
    paddingHorizontal: 25,
    marginVertical: 40,
  },
  anchorText: {
    color: '#3695ED',
  },
});
