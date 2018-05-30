import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {CustomButton} from '../../../components';
import commonStyles from '../../../styles/common';
import {t} from '../../../i18n';
import dictionary from '../dictionary';

const {width, height} = Dimensions.get('window');

export default Tour1 = ({onPress}) => (
  <Image
    style={styles.container}
    source={require('../../../assets/images/tour1.jpg')}>

    <View style={styles.buttonContainer}>
      <CustomButton 
        style={styles.button}
        label={t(dictionary.next)}
        width={'short'}
        borderColor={'white'}
        backgroundColor={'#389FFF'}
        onPress={onPress}
      />
    </View>
  </Image>
);

Tour1.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: height * 0.75,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
});
