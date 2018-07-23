import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// other
import SCENES from '../../../scenes';

export default class Base extends Component {
    static propTypes = {
        changeScene: PropTypes.func.isRequired,
        changePrevScene: PropTypes.func.isRequired,
        openChooseCategory: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={[commonStyles.fullScreen, mittiStyles.darkBody, styles.main]}>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        onPress={() => this.props.changePrevScene()}
                        style={styles.closeButton}
                    >
                        <MCIIcon size={30} color={colors.WHITE} name={'close'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={[mittiStyles.darkFontStrong, styles.title]}>
                        {t(dictionary.createNewPost).toUpperCase()}
                    </Text>
                    <Text style={[mittiStyles.darkFontStrong, styles.subtitle]}>
                        {t(dictionary.iWouldLikeTo).toUpperCase()}:
                    </Text>
                </View>
                <View style={[mittiStyles.whiteBody, styles.menuContainer]}>
                    <View style={styles.topContainer}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <MCIIcon
                                style={styles.icon}
                                size={40}
                                color={'#3C9551'}
                                name={'gift'}
                            />
                            <Text style={mittiStyles.whiteFontStrong}>
                                {t(dictionary.giveFree)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.openChooseCategory()}
                            style={styles.askQuestionButton}
                        >
                            <MCIIcon
                                style={styles.iconSlim}
                                size={40}
                                color={'#C92FEE'}
                                name={'comment-question-outline'}
                            />
                            <Text style={[mittiStyles.whiteFontStrong, styles.askQuestionLabel]}>
                                {t(dictionary.askQuestionToCommunity)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        padding: 20,
    },
    closeButtonContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    closeButton: {},
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {},
    subtitle: {
        fontSize: 22,
    },
    menuContainer: {
        paddingHorizontal: 10,
    },
    topContainer: {
        alignItems: 'center',
        padding: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#BCBCBC',
        padding: 20,
    },
    icon: {
        padding: 20,
    },
    iconSlim: {
        paddingVertical: 20,
    },
    askQuestionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    askQuestionLabel: {
        marginLeft: 10,
    },
});
