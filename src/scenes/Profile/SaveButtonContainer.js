import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// components
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';

// actions
import {
  toggleEditMode, 
} from './profileActions';

// module actions
import {updateMyProfile} from '../../modules/me/meActions';

// styles
import commonStyles from '../../styles/common';
import mittiStyles from '../../styles/mitti';
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';

// i18n
import {t} from '../../i18n';
import dictionary from './dictionary';

class SaveButtonContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    form: PropTypes.object.isRequired,
    isFetchingProfile: PropTypes.bool.isRequired,
    isEditable: PropTypes.bool.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
    isUpdatingMyProfile: PropTypes.bool.isRequired,
    updateMyProfile: PropTypes.func.isRequired,
  };

  render() {
    const {
      form,
      user,
      isFetchingProfile,
      isEditable,
      isEditMode,
      toggleEditMode,
      isUpdatingMyProfile,
      updateMyProfile,
    } = this.props;
    let data = {
      profile: {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        isPhonePublic: !form.isPhonePrivate,
      },
      username: form.email,
    };

    // check if we have img
    if(user && user.profile && user.profile.img) {
      data.profile.img = user.profile.img;
    }
    // check if edit mode
    if(isEditMode && 
       isEditable && 
       !isUpdatingMyProfile && 
       !isFetchingProfile) {
      return (
        <TouchableOpacity
          onPress={() => this._onSaveButtonPress(form, data)}
          style={styles.button}>
          <Text style={styles.buttonLabel}>
            {t(dictionary.saveChanges)}
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      return null;
    }
  }

  _onSaveButtonPress = (form, data) => {
    let isDataValid = true;

    // check if changing password
    if(form.changePassword || form.confirmNewPassword) {
      // check if new password is valid
      if(form.changePassword === form.confirmNewPassword) {
        data.password = form.changePassword;
      }
      else {
        isDataValid = false;
      }
    }
    // check if valid
    if(isDataValid) {
      this.props.updateMyProfile(data);
    }
    else {
      this._alertInvalidPassword();
    }
  };

  _alertInvalidPassword = () => {
    Alert.alert(
      t(dictionary.changePassword),
      t(dictionary.passwordNotMatched),
      [
        {
          text: t(dictionary.ok),
        },
      ],
      { cancelable: true }
    );
  };
}

function mapStateToProps(state) {
  return {
    // states
    ...state.profileScene,

    // module states
    isUpdatingMyProfile: state.me.isUpdatingMyProfile,
  };
}

export default connect(
  mapStateToProps,
  {
    // actions
    toggleEditMode,

    // module actions
    updateMyProfile,
  }
)(SaveButtonContainer);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: font.SIZE_H2,
    color: colors.WHITE,
  },
});