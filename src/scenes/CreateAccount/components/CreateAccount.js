import React, {Component} from 'react'; import PropTypes from 'prop-types';

// components
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SpinnerOverlay} from '../../../components';
import {CustomTextInput} from '../../../components';
import {CustomButton} from '../../../components';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

// other
import {SCENES} from '../../../routes';

export default class CreateAccount extends Component {
  static propTypes = {
    // states
    form: PropTypes.shape({
      fullName: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
    }),

    // actions
    changeFormValue: PropTypes.func.isRequired,

    // module states
    isLoggingIn: PropTypes.bool.isRequired,

    // module actions
    register: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView style={[commonStyles.fullScreen, mittiStyles.darkBody]}>
        <SpinnerOverlay show={this.props.isLoggingIn} />

        <View style={[commonStyles.centeredChilds, styles.topSegment]}>
          <Text style={[mittiStyles.darkFont, styles.title]}>
            {t(dictionary.createAccountTitle)}
          </Text>
        </View>
        <View style={[
          commonStyles.centeredChilds, 
          mittiStyles.bottomScrollExtra, 
          styles.bottomSegment
        ]}>

          <View style={[
            mittiStyles.input,
            styles.inputContainer,
          ]}>
            <CustomTextInput
              type={'name'}
              value={this.props.form.fullName}
              onChangeText={(fullName) => this.props.changeFormValue('fullName', fullName)}
              placeholder={t(dictionary.fullName)}
              autoFocus={true}
            />
          </View>
          <View style={[
            mittiStyles.input,
            styles.inputContainer,
          ]}>
            <CustomTextInput
              type={'email'}
              value={this.props.form.username}
              onChangeText={(username) => this.props.changeFormValue('username', username)}
              placeholder={t(dictionary.email)}
              autoFocus={false}
            />
          </View>
          <View style={[
            mittiStyles.input,
            styles.inputContainer,
          ]}>
            <CustomTextInput
              type={'password'}
              value={this.props.form.password}
              onChangeText={(password) => this.props.changeFormValue('password', password)}
              placeholder={t(dictionary.password)}
            />
          </View>
          <View style={mittiStyles.button}>
            <CustomButton
              style={styles.button}
              onPress={() => this.props.register(
                this.props.form.fullName, 
                this.props.form.username, 
                this.props.form.password
              )}
              disabled={
                this.props.isLoggingIn || 
                !this.props.form.fullName || 
                !this.props.form.username || 
                !this.props.form.password
              }
              label={t(dictionary.signup)}
            />
          </View>
          <View>
            <TouchableOpacity 
              style={styles.anchor}
              onPress={() => onLoginPress(this.props.changeScene)}>
              <Text
                style={mittiStyles.darkFont}>
                {t(dictionary.haveAccount)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const onLoginPress = (changeScene) => {
  changeScene(SCENES.login.key);
};

const styles = StyleSheet.create({
  topSegment: {
    height: 100
  },
  bottomSegment: {
    height: 300,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 5,
  },
  anchor: {
    padding: 10
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
});
