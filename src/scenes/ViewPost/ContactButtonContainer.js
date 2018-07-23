import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// actions
import { openChatWindow } from './viewPostActions.js';
import { changeScene } from '../../modules/navigation/navigationActions.js';

// styles
import * as colors from '../../styles/colors';
import * as font from '../../styles/font';
import mittiStyles from '../../styles/mitti';

import { t } from '../../i18n';
import dictionary from './dictionary';


class ContactButtonContainer extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        themeColor: PropTypes.string.isRequired,
        marketType: PropTypes.string.isRequired,
        changeScene: PropTypes.func.isRequired,
        openChatWindow: PropTypes.func.isRequired,
    };

    render() {
        const { item, marketType, themeColor, changeScene, openChatWindow } = this.props;

        return (
            <TouchableOpacity onPress={() => openChatWindow(item)} style={[styles.button]}>
                <MCIIcon size={font.SIZE_H1} color={themeColor} name={'message-processing'} />
                <Text style={styles.label}>{t(dictionary.contact).toUpperCase()}</Text>
            </TouchableOpacity>
        );
    }
}

function mapStateToProps(state) {
    return {
        // states
        ...state.viewPostScene,
    };
}

export default connect(
    mapStateToProps,
    {
        // actions
        changeScene,
        openChatWindow,
    }
)(ContactButtonContainer);

const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        flex: 1,
        fontSize: font.SIZE_H2,
        color: colors.WHITE,
        marginLeft: 5,
    },
});
