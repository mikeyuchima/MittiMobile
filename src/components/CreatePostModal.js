import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components

// styles
import commonStyles from '../styles/common';
import mittiStyles from '../styles/mitti';
import * as colors from '../styles/colors';

// i18n
import { t } from '../i18n';
import dictionary from './dictionary';
import { POST_TYPES } from '../constants/constants';

// other
import SCENES from '../scenes';

let isModalOpened = false;

export default class Base extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        changeScene: PropTypes.func.isRequired,
    };

    render() {
        // check the open flag
        // this is to avoid a bug about doubling the modals
        if (this.props.isOpen && isModalOpened) {
            return null;
        } else if (this.props.isOpen && !isModalOpened) {
            isModalOpened = true;
        } else {
            isModalOpened = false;
        }
        return (
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.props.isOpen}
                onRequestClose={this.props.onClose}
            >
                <View style={[commonStyles.fullScreen, mittiStyles.darkBody, styles.main]}>
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity onPress={this.props.onClose} style={styles.closeButton}>
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
                            <TouchableOpacity
                                onPress={() =>
                                    this._showCreateForm(SCENES.createPost.key, POST_TYPES.free.id)
                                }
                                style={styles.buttonContainer}
                            >
                                <MCIIcon
                                    style={styles.icon}
                                    size={40}
                                    color={colors.GREEN}
                                    name={'gift'}
                                />
                                <Text style={mittiStyles.whiteFontStrong}>
                                    {t(dictionary.giveFree)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    this._showCreateForm(SCENES.createQuestion.key, 'question')
                                }
                                style={styles.askQuestionButton}
                            >
                                <MCIIcon
                                    style={styles.iconSlim}
                                    size={40}
                                    color={colors.PURPLE}
                                    name={'comment-question-outline'}
                                />
                                <Text
                                    style={[mittiStyles.whiteFontStrong, styles.askQuestionLabel]}
                                >
                                    {t(dictionary.askQuestionToCommunity)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    _showCreateForm = (sceneKey, type) => {
        let params = {
            // We do this so that the navigation reducer does not look
            // to have a scene specific data - it has navigationParams
            // instead.
            navigationParams: {
                postType: type,
            },
        };

        this.props.onClose();
        this.props.changeScene(sceneKey, params);
    };
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
