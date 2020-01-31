import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from "react-native";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";

// components

// styles
import * as colors from "../styles/colors";

// i18n
import { t } from "../i18n";
import dictionary from "./dictionary";

// other
const { width, height } = Dimensions.get("window");

export default class CreateQuestion extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired,
        buttonColor: PropTypes.string
    };

    static defaultProps = {
        buttonColor: colors.BLUE
    };

    render() {
        return (
            <View
                style={[
                    styles.submitButtonContainer,
                    this.props.disabled ? styles.buttonDisabled : null
                ]}
            >
                <TouchableOpacity
                    disabled={this.props.disabled}
                    onPress={this.props.onPress}
                    style={[
                        styles.submitButton,
                        { backgroundColor: this.props.buttonColor }
                    ]}
                >
                    <Text style={styles.label}>{t(dictionary.postItem)}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    submitButtonContainer: {
        position: "absolute",
        bottom: 0
    },
    submitButton: {
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: width
    },
    buttonDisabled: {
        opacity: 0.4
    },
    label: {
        fontSize: 24,
        color: colors.WHITE
    }
});
