import React, {Component} from 'react'; 
import PropTypes from 'prop-types';

// components
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import * as colors from '../styles/colors';

export default ProfilePicture = ({ me }) => {
  const filePath = me && me.profile && me.profile.img;
  const isMentor = me && me.isMentor;
  const source = { uri: filePath };
  
  // check if we have file path
  if (filePath) {
    return (
      <View style={styles.content}>
      <Image style={styles.image} source={source} />
      {isMentor ? (
        <MCIIcon
        size={20}
        name={'star'}
        color={'white'}
        style={styles.starButton}
        />
      ) : null}
      </View>
    );
  } else {
    return (
      <View style={styles.content}>
      <MCIIcon size={100} color={colors.DARK_GREY} name={'account-circle'} />
      {isMentor ? (
        <MCIIcon
        size={20}
        name={'star'}
        color={'white'}
        style={styles.starButton}
        />
      ) : null}
      </View>
    );
  }
};

ProfilePicture.propTypes = {
  me: PropTypes.object,
};

const styles = StyleSheet.create({
  content: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  starButton: {
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
