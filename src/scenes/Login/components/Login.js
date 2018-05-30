import React, {Component} from 'react'; import PropTypes from 'prop-types';

// components
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
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

export default class Login extends Component {
  static propTypes = {
    // states
    form: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }),

    // actions
    changeFormValue: PropTypes.func.isRequired,

    // module states
    isLoggingIn: PropTypes.bool.isRequired,

    // module actions
    login: PropTypes.func.isRequired,
    changeScene: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView style={[commonStyles.fullScreen, mittiStyles.darkBody]}>
        <SpinnerOverlay show={this.props.isLoggingIn} />

        <View style={[
          commonStyles.centeredChilds, 
          mittiStyles.whiteBody,
          styles.topSegment,
        ]}>
          <Image 
            style={styles.logo}
            source={require('../../../assets/images/logo.png')} />
          <Text>The Sharing Community</Text>
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
              type={'email'}
              value={this.props.form.username}
              onChangeText={(username) => this.props.changeFormValue('username', username)}
              placeholder={t(dictionary.email)}
              autoFocus={true}
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
              onPress={() => this.props.login(this.props.form.username, this.props.form.password)}
              disabled={this.props.isLoggingIn || !this.props.form.username || !this.props.form.password}
              label={t(dictionary.login)}
            />
          </View>
          <View>
            <TouchableOpacity 
              style={styles.anchor}
              onPress={() => onForgotPasswordPress(this.props.changeScene)}>
              <Text
                style={mittiStyles.darkFont}>
                {t(dictionary.forgotPassword)}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity 
              style={styles.anchor}
              onPress={() => onCreateAccountPress(this.props.changeScene)}>
              <Text
                style={mittiStyles.darkFont}>
                {t(dictionary.createAccount)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const onForgotPasswordPress = (changeScene) => {
  changeScene(SCENES.forgotPassword.key);
};

const onCreateAccountPress = (changeScene) => {
  changeScene(SCENES.createAccount.key);
};

const styles = StyleSheet.create({
  topSegment: {
    height: 300
  },
  bottomSegment: {
    height: 350,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20
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
