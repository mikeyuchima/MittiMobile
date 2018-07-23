import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// components
import FAIcon from 'react-native-vector-icons/FontAwesome';
// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';
// other


export default (AppointmentButton = ({ color, fontSize, badgeWidth, count, changeScene }) => {
    return (
        count > 0 && (
            <TouchableOpacity
                onPress={() => {
                    changeScene('scheduleCenter');
                }}
                style={[mittiStyles.navbarButtonContainer, styles.buttonContainer]}
            >
                <View style={styles.iconContainer}>
                    <FAIcon size={font.SIZE_H1} color={colors.WHITE} name={'calendar'} />
                </View>
                <View style={[styles.badgeContainer]}>
                    <CountBadge
                        backgroundColor={color}
                        fontSize={fontSize}
                        width={badgeWidth}
                        count={count}
                    />
                </View>
            </TouchableOpacity>
        )
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'flex-start',
        width: 30,
    },
    badgeContainer: {
        position: 'absolute',
        right: 0,
    },
});
