import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as colors from '../styles/colors';
import * as font from '../styles/font';

export default class NavBackButton extends Component {
    static propTypes = {
        back: PropTypes.func.isRequired,
        navKey: PropTypes.string.isRequired,
    };

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this.props.back()}>
                <Icon name="arrow-left" size={font.SIZE_H1} color={colors.WHITE} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
    },
});
