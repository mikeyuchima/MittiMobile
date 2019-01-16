import React, {Component} from 'react'; import PropTypes from 'prop-types';
// components
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import {SpinnerOverlay} from '../../../components';
import {CustomButton} from '../../../components';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class Form extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    isUpdatingMyProfile: PropTypes.bool.isRequired,
    updateMyProfile: PropTypes.func.isRequired,
    removeAccount: PropTypes.func.isRequired,
    changeFormValue: PropTypes.func.isRequired,
  };

  render() {
    const {
      isUpdatingMyProfile,
      changeFormValue,
      form,
      user,
    } = this.props;
    const isVerified = user &&
                       user.isVerified;

    return (
      <ScrollView style={[
        commonStyles.fullScreen, 
        mittiStyles.whiteBody,
      ]}>
        <SpinnerOverlay show={isUpdatingMyProfile} />

        <View style={[
          mittiStyles.bottomScrollExtra,
          styles.formContainer
        ]}>
          <View style={[
            styles.fieldContainer,
            styles.textFieldContainer,
          ]}>
            <View style={styles.inputContainer}>
              <TextInput
                value={form.firstName}
                onChangeText={(value) => changeFormValue('firstName', value)}
                style={styles.textInput}
                placeholder={t(dictionary.firstName)}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
          </View>

          <View style={[
            styles.fieldContainer,
            styles.textFieldContainer,
          ]}>
            <View style={styles.inputContainer}>
              <TextInput
                value={form.lastName}
                onChangeText={(value) => changeFormValue('lastName', value)}
                style={styles.textInput}
                placeholder={t(dictionary.lastName)}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
          </View>

          <View style={[
            styles.fieldContainer,
            styles.textFieldContainer,
          ]}>
            <View style={styles.inputContainer}>
              <TextInput
                value={form.email}
                onChangeText={(value) => changeFormValue('email', value)}
                style={styles.textInput}
                placeholder={t(dictionary.email)}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
            {
              form.email == user.username && isVerified
              ? <View style={styles.badgeContainer}>
                  <Text style={styles.badge}>
                    {t(dictionary.confirmed).toUpperCase()}
                  </Text>
                </View>
              : null
            }
          </View>

          <View style={[
            styles.fieldContainer,
            styles.textFieldContainer,
          ]}>
            <View style={styles.inputContainer}>
              <TextInput
                value={form.phone}
                onChangeText={(value) => changeFormValue('phone', value)}
                style={styles.textInput}
                placeholder={t(dictionary.phone)}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
          </View>

          <View style={[
            styles.fieldContainer,
            styles.textFieldContainer,
          ]}>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>
                {t(dictionary.numberIsPrivate)}
              </Text>
            </View>
            <View style={styles.badgeContainer}>
              <Switch
                style={styles.input}
                onValueChange={(value) => changeFormValue('isPhonePrivate', value)}
                value={form.isPhonePrivate} />
            </View>
          </View>

          <View style={[
            styles.fieldContainer,
            styles.textFieldContainer,
          ]}>
            <View style={styles.inputContainer}>
              <TextInput
                value={form.changePassword}
                onChangeText={(value) => changeFormValue('changePassword', value)}
                style={styles.textInput}
                placeholder={t(dictionary.changePassword)}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
          </View>

          <View style={[
            styles.fieldContainer,
            styles.textFieldContainer,
          ]}>
            <View style={styles.inputContainer}>
              <TextInput
                value={form.confirmNewPassword}
                onChangeText={(value) => changeFormValue('confirmNewPassword', value)}
                style={styles.textInput}
                placeholder={t(dictionary.confirmNewPassword)}
                underlineColorAndroid={'rgba(0,0,0,0)'}
              />
            </View>
          </View>

          <View style={styles.removeContainer}>
            <CustomButton
              style={styles.button}
              backgroundColor={colors.ERROR}
              labelColor={colors.WHITE}
              onPress={() => this._promptRemoveAccount()}
              label={t(dictionary.removeAccount)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  _promptRemoveAccount = () => {
    Alert.alert(
      t(dictionary.removeAccount),
      t(dictionary.removeAccountConfirmation),
      [
        {
          text: t(dictionary.cancel),
          onPress: () => console.log('Cancel Pressed'), 
        },
        {
          text: t(dictionary.ok),
          onPress: () => this.props.removeAccount(this.props.user),
        },
      ],
      { cancelable: true }
    );
  };
}

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFieldContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY,
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    fontSize: font.SIZE_H1,
  },
  text: {
    fontSize: font.SIZE_H1,
    color: colors.DARK_GREY,
    paddingVertical: 12,
    paddingHorizontal: 2,
    marginTop: 5,
  },
  badgeContainer: {
    width: 80,
    alignItems: 'flex-end',
  },
  badge: {
    color: colors.GREEN,
    fontSize: font.SIZE_TINY,
  },
  removeContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
  anchorText: {
      color: '#3695ED',
  },
});