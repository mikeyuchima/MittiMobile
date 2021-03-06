import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Header } from '../../../components';

// styles
import commonStyles from '../../../styles/common';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';

export default (NavBar = ({ leftButton, title, rightButton }) => (
    <View style={styles.navbar}>
        <Header>
            {leftButton && <View style={styles.leftButton}>{leftButton}</View>}
            <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            {rightButton && <View style={styles.rightButton}>{rightButton}</View>}
        </Header>
    </View>
));

NavBar.propTypes = {
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    navbar: {
        paddingTop: 0,
        top: 0,
        ...Platform.select({
            ios: {
                height: 64,
            },
            android: {
                height: 56,
            },
            windows: {
                height: 54,
            },
        }),
        height: 60,
        right: 0,
        left: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#828287',
        position: 'absolute',
    },
    title: {
        marginTop: 10,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20,
            },
            android: {
                top: 5,
            },
            windows: {
                top: 5,
            },
        }),
        left: 50,
    },
    titleText: {
        textAlign: 'center',
        color: colors.WHITE,
        fontSize: font.SIZE_H1,
        alignSelf: 'center',
    },
    rightButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20,
            },
            android: {
                top: 10,
            },
            windows: {
                top: 8,
            },
        }),
        right: 2,
    },
    leftButton: {
        height: 37,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20,
            },
            android: {
                top: 10,
            },
            windows: {
                top: 8,
            },
        }),
        left: 2,
    },
});
