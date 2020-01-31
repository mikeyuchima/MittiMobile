import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";

// styles
import mittiStyles from "../../../styles/mitti";
import * as colors from "../../../styles/colors";
import * as font from "../../../styles/font";

// components
import { CustomTextInput } from "../../../components";

// i18n
import { t } from "../../../i18n";
import dictionary from "../dictionary";

export default class MessageInput extends Component {
  static propTypes = {
    senderId: PropTypes.string,
    itemId: PropTypes.string,
    chatId: PropTypes.string,
    messageText: PropTypes.string,
    changeTextValue: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    setSchedule: PropTypes.func.isRequired,
    hasAppointment: PropTypes.bool,
  };

  render() {
    const {
      senderId,
      itemId,
      chatId,
      messageText,
      changeTextValue,
      setSchedule,
      hasAppointment,
    } = this.props;

    return (
      Platform.OS === 'ios' ?
      <KeyboardAvoidingView style={[styles.inputContainer]} behavior="padding" keyboardVerticalOffset={100} enabled>
        <View style={[styles.textContainer]}>
          <TextInput
            value={messageText}
            onChangeText={changeTextValue}
            onSubmitEditing={this._submit}
            style={styles.textInput}
            placeholder={t(dictionary.writeMessage)}
            placeholderTextColor={"#575D70"}
            multiline={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ScheduleButton
            hasAppointment={hasAppointment}
            setSchedule={setSchedule}
          />
          <TouchableOpacity onPress={this._submit} style={[styles.sendButton]}>
            <FAIcon
              size={font.SIZE_ICON}
              color={colors.WHITE}
              name={"paper-plane"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      :
      <View style={[styles.inputContainer]}>
        <View style={[styles.textContainer]}>
          <TextInput
            value={messageText}
            onChangeText={changeTextValue}
            onSubmitEditing={this._submit}
            style={styles.textInput}
            placeholder={t(dictionary.writeMessage)}
            placeholderTextColor={"#575D70"}
            multiline={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ScheduleButton
            hasAppointment={hasAppointment}
            setSchedule={setSchedule}
          />
          <TouchableOpacity onPress={this._submit} style={[styles.sendButton]}>
            <FAIcon
              size={font.SIZE_ICON}
              color={colors.WHITE}
              name={"paper-plane"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _submit = () => {
    const { senderId, itemId, chatId, messageText } = this.props;

    // hide keyboard
    Keyboard.dismiss();
    // send to server
    this.props.sendMessage(senderId, itemId, chatId, messageText);
  };
}

const ScheduleButton = ({ hasAppointment, setSchedule }) => (
  <TouchableOpacity
    onPress={() => !hasAppointment && setSchedule()}
    style={[
      styles.sendButton,
      { backgroundColor: hasAppointment ? colors.GREY : colors.DARK_GREY },
    ]}
  >
    <MCIIcon size={font.SIZE_ICON} color={colors.WHITE} name={"timetable"} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 5,
    marginBottom: (Platform.OS === 'ios') ? 25 : 0,
    borderTopColor: colors.LIGHT_GREY,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  textContainer: {
    flex: 1,
  },
  textInput: {
    color: colors.BLACK,
    fontSize: 20
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 80,
  },
  scheduleButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 15,
    marginRight: 10,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#389FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
    marginLeft: 5,
  },
});
