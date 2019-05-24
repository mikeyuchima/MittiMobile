import React, {Component} from 'react'; import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

// styles
import mittiStyles from '../../../styles/mitti';

// components
import {CustomTextInput} from '../../../components';

// i18n
import {t} from '../../../i18n';
import dictionary from '../dictionary';

export default class AnswerInput extends Component {
  static propTypes = {
    isAnswerListOpen: PropTypes.bool.isRequired,
    isOnFocus: PropTypes.bool.isRequired,
    changeTextValue: PropTypes.func.isRequired,
    setFocusFlag: PropTypes.func.isRequired,
    resetFocusFlag: PropTypes.func.isRequired,
    answerText: PropTypes.string,
    createAnswer: PropTypes.func.isRequired,
  };

  render() {
    const {
      isAnswerListOpen, 
      isOnFocus, 
      answerText, 
      changeTextValue, 
      setFocusFlag, 
      resetFocusFlag, 
    } = this.props;
    const ShareButton = () => (
      <TouchableOpacity style={styles.shareButton}>
        <FAIcon
          size={12}
          color={'#FFFFFF'}
          name={'user-plus'} />
      </TouchableOpacity>
    );

    // check if answer list open
    if(!isAnswerListOpen) {
      return null;
    }
    else {
      return (
        <View style={[
          styles.inputContainer,
          isOnFocus ? {} : styles.inputContainerBlur,
        ]}>
          <View style={[
            styles.textContainer,
          ]}>
            <TextInput 
              value={answerText}
              onFocus={setFocusFlag}
              onBlur={resetFocusFlag}
              onChangeText={changeTextValue}
              onSubmitEditing={this._submit}
              style={styles.textInput}
              placeholder={t(dictionary.answerQuestion)}
              placeholderTextColor={'#575D70'}
            />
          </View>
          <View style={styles.buttonContainer}>
            {isOnFocus ? <ShareButton /> : null}
            <TouchableOpacity
              onPress={this._submit}
              style={[
                styles.sendButton,
                isOnFocus ? {} : styles.sendButtonBlur,
              ]}>
              <FAIcon
                size={20}
                color={isOnFocus ? '#FFF' : '#272A34'}
                name={'paper-plane'} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  _submit = () => {
    // hide keyboard
    Keyboard.dismiss();
    // send to server
    this.props.createAnswer();
  };
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  inputContainerBlur: {
    backgroundColor: '#272A34',
  },
  textContainer: {
    flex: 1,
  },
  textInput: {
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 80,
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#71768A',
    width: 28,
    height: 28,
    borderRadius: 15,
    marginRight: 10,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#389FFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
  },
  sendButtonBlur: {
    backgroundColor: '#3C404E',
  },
});
