import React, {Component, PropTypes} from 'react';

// components
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
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

export default class ForgotPassword extends Component {
  static propTypes = {
    // states
    form: PropTypes.shape({
      username: PropTypes.string
    }),

    // module states
    isResetting: PropTypes.bool.isRequired,
    changeScene: PropTypes.func.isRequired,

    // actions
    changeFormValue: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired
  };

  render() {
    return (
      <ScrollView style={[commonStyles.fullScreen, mittiStyles.darkBody]}>
        <View style={[commonStyles.centeredChilds, styles.topSegment]}>
          <Text style={[mittiStyles.darkFont, styles.title]}>
            {t(dictionary.forgotPassword)}
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
              type={'email'}
              value={this.props.form.username} 
              onChangeText={(username) => this.props.changeFormValue('username', username)}
              placeholder={t(dictionary.email)}
              autoFocus={true}
            />
          </View>
          <View style={mittiStyles.button}>
            <CustomButton
              style={styles.button}
              onPress={() => this.props.resetPassword(this.props.form.username)}
              disabled={this.props.isResetting || !this.props.form.username}
              label={t(dictionary.resetPassword)}
            />
          </View>
          <View>
            <TouchableOpacity 
              style={styles.anchor}
              onPress={() => onLoginPress(this.props.changeScene)}>
              <Text
                style={mittiStyles.darkFont}>
                {t(dictionary.cancel)}
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
