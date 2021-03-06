import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import {
    Platform,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { ProfilePicture } from '../../../components';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import * as font from '../../../styles/font';
import * as colors from '../../../styles/colors';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// other
import { APP_NAME, POST_TYPES } from '../../../constants/constants';

export default (SideMenu = ({ me, sceneKey, changeScene, logout }) => (
    <ScrollView style={styles.container}>
        <TouchableOpacity
            onPress={() => changeScene('profile', {})}
            style={styles.profileButton}
        >
            <View style={profilePictureStyles.container}>
                <ProfilePicture me={me} />
            </View>
            <Text style={styles.menuHeaderText}>{getUserFullName(me)}</Text>
        </TouchableOpacity>
        <View style={styles.menuContainer}>{renderMenu(sceneKey, changeScene, logout)}</View>
    </ScrollView>
));

SideMenu.propTypes = {
    changeScene: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

const renderMenu = (sceneKey, changeScene, logout) => {
    const menuItems = [
        {
            id: 'home',
            onPress: () => changeScene('home', {}, 'REPLACE'),
            icon: 'MCI',
            iconName: 'home',
            label: t(dictionary.home),
        },
        {
            id: 'messageCenter',
            onPress: () => changeScene('messageCenter', {}, 'REPLACE'),
            icon: 'MCI',
            iconName: 'message-processing',
            label: t(dictionary.messages),
        },
        // {
        //     id: 'community',
        //     onPress: () => changeScene('community', {}, 'REPLACE'),
        //     icon: 'MCI',
        //     iconName: 'vector-circle',
        //     label: t(dictionary.community),
        // },
        {
            id: 'marketplace',
            onPress: () =>
                changeScene(
                    'marketplace',
                    {
                        marketType: POST_TYPES.free.id,
                    },
                    'REPLACE'
                ),
            icon: 'FA',
            iconName: 'gift',
            label: t(dictionary.freeShare),
        },
        {
            id: 'shareApp',
            onPress: () => shareApp(),
            icon: 'FA',
            iconName: 'share-alt',
            label: t(dictionary.shareApp),
            hasTopGap: true,
        },
        {
            id: 'settings',
            onPress: () => changeScene('settings', {}),
            icon: 'FA',
            iconName: 'gear',
            label: t(dictionary.settings),
            hasTopGap: false,
        },
        {
            id: 'logout',
            onPress: logout,
            icon: 'FA',
            iconName: 'sign-out',
            label: t(dictionary.logout),
            hasTopGap: false,
        },
    ];

    return menuItems.map(function(aMenuItem) {
        const isCurrentScene = aMenuItem.id == sceneKey;

        let menuItemStyles = [styles.menuItem];
        let itemTextStyles = [styles.text];

        // check if we have top gap
        if (aMenuItem.hasTopGap) {
            menuItemStyles.push({ marginTop: 100 });
        }
        // check if current key
        if (isCurrentScene) {
            itemTextStyles.push({ color: colors.BLUE });
        }

        return (
            <View key={aMenuItem.id} style={menuItemStyles}>
                <TouchableOpacity
                    style={styles.menuItemRow}
                    onPress={!isCurrentScene ? aMenuItem.onPress : null}
                >
                    <View style={styles.iconContainer}>
                        {renderIcon(aMenuItem.icon, aMenuItem.iconName, isCurrentScene)}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={itemTextStyles}>{aMenuItem.label.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    });
};

const renderIcon = (iconType, iconName, isCurrentScene) => {
    switch (iconType) {
        case 'FA':
            return (
                <FAIcon
                    size={font.SIZE_MENU_ICON}
                    color={isCurrentScene ? colors.BLUE : null}
                    name={iconName}
                />
            );
            break;
        default:
            return (
                <MCIIcon
                    size={font.SIZE_MENU_ICON}
                    color={isCurrentScene ? colors.BLUE : null}
                    name={iconName}
                />
            );
    }
};

const getUserFullName = me => {
    const profile = me && me.profile;
    const fullName = profile && profile.fullName;

    return fullName;
};

const shareApp = () => {
    const url = Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/mittimobile' : 'http://play.google.com/store/apps/details?id=' + APP_NAME;
    const message = 'Hey, check out this app!\n\n' + url;

    openMailApp('', 
                t(dictionary.shareApp), 
                message)
};

const openMailApp = (recipient, subject, body) => {
    const recipientParam = 'mailto:' + recipient + '?',
          subjectParam = 'subject=' + subject,
          bodyParam = '&body=' + body;

    Linking.openURL(recipientParam + subjectParam + bodyParam)
    .catch((err) => console.error('An error occurred', err));
    
    // Linking.canOpenURL(recipientParam + subjectParam + bodyParam)
    //     .then((supported) => {
    //         if (!supported) {
    //         console.log("Can't handle url: " + recipientParam + subjectParam + bodyParam);
    //         } else {
    //         return Linking.openURL(recipientParam + subjectParam + bodyParam);
    //         }
    //     })
    //     .catch((err) => console.error('An error occurred', err));
};

const styles = StyleSheet.create({
    container: {},
    profileButton: {
        padding: 20,
        alignItems: 'center',
    },
    menuHeaderText: {
        fontSize: font.SIZE_H1,
    },
    menuItem: {
        height: 65,
    },
    menuItemRow: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    iconContainer: {
        width: 45,
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: font.SIZE_H1,
    },
});

const profilePictureStyles = StyleSheet.create({
    content: {
        position: 'relative',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    starButton: {
        backgroundColor: '#000000',
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
});
