import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import CustomButton from './CustomButton';

// styles
import commonStyles from '../styles/common';
import mittiStyles from '../styles/mitti';
import * as colors from '../styles/colors';
import * as font from '../styles/font';

// i18n
import { t } from '../i18n';
import dictionary from './dictionary';
import { POST_TYPES } from '../constants/constants';

// other

export default class VerificationRequest extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        resend: PropTypes.func.isRequired,
        reload: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            isResent: false,
        };
    }

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.props.isOpen}
                onRequestClose={() => {}}
            >
                <View style={[commonStyles.fullScreen, mittiStyles.whiteBody, styles.main]}>
                    <View style={styles.titleContainer}>
                        <Text style={[mittiStyles.whiteFont, styles.title]}>
                            {t(dictionary.verifyEmail)}
                        </Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <CustomButton
                            style={styles.button}
                            onPress={() => this.props.reload()}
                            label={t(dictionary.verified)}
                        />
                        {!this.state.isResent ? (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this._resendVerification()}
                            >
                                <Text style={styles.label}>{t(dictionary.resendVerification)}</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </Modal>
        );
    }

    _resendVerification = () => {
        this.setState({ isResent: true });
        this.props.resend(this.props.username);
    };
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        padding: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
    },
    title: {
        fontSize: font.SIZE_H1,
    },
    label: {
        textAlign: 'center',
    },
});
