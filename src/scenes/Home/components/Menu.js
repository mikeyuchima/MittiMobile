import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

// styles
import * as font from '../../../styles/font';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// other


export default class Menu extends Component {
    static propTypes = {
        me: PropTypes.object.isRequired,
        unreadMessages: PropTypes.array.isRequired,
        changeScene: PropTypes.func.isRequired,
    };

    render() {
        const { me, unreadMessages, changeScene } = this.props;

        return (
            <View style={styles.menuContainer}>{_renderMenu(me, unreadMessages, changeScene)}</View>
        );
    }
}

const _renderMenu = (me, unreadMessages, changeScene) => {
    const newMessagesCount = (me && me.stats && me.stats.newMessagesCount) || 0;
    const confirmedSchedulesCount = (me && me.stats && me.stats.confirmedSchedulesCount) || 0;
    const myActiveFreesharesCount = (me && me.stats && me.stats.myActiveFreesharesCount) || 0;
    const menuItems = [
        {
            id: 'newMessage',
            label: t(dictionary.newMessage),
            count: newMessagesCount,
            color: '#3CAE0F',
            iconName: 'commenting',
            onPress: () => changeScene('messageCenter'),
        },
        {
            id: 'confirmedSchedules',
            label: t(dictionary.confirmedSchedules),
            count: confirmedSchedulesCount,
            color: '#30B4EA',
            iconName: 'calendar',
            onPress: () => changeScene('scheduleCenter'),
        },
        {
            id: 'myFreeshares',
            label: t(dictionary.myFreeshares),
            count: myActiveFreesharesCount,
            color: '#FFFFFF',
            iconName: 'gift',
            onPress: () =>
                changeScene('myPosts', {
                    navigationParams: {
                        marketType: 'free',
                    },
                }),
        },
    ];

    return menuItems.map(function(aMenuItem, anIndex) {
        return (
            <TouchableOpacity
                style={styles.rowContainer}
                key={aMenuItem.id}
                onPress={aMenuItem.onPress}
            >
                <View style={styles.rowContent}>
                    <View style={styles.iconContainer}>
                        <FAIcon
                            style={[styles.icon, { color: aMenuItem.color }]}
                            size={font.SIZE_MENU_ICON}
                            name={aMenuItem.iconName}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={{ color: aMenuItem.color }}>{aMenuItem.label}</Text>
                        </View>
                        <View style={styles.countContainer}>
                            <Text style={{ color: aMenuItem.color }}>{aMenuItem.count}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    });
};

const styles = StyleSheet.create({
    rowContent: {
        flex: 1,
        flexDirection: 'row',
    },
    menuContainer: {
        marginBottom: 20,
    },
    rowContainer: {
        height: 60,
        borderBottomWidth: 1,
        borderColor: '#24262E',
        paddingLeft: 20,
        paddingRight: 20,
    },
    iconContainer: {
        width: 50,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'white',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelContainer: {
        flex: 1,
    },
    countContainer: {
        width: 60,
        alignItems: 'flex-end',
    },
});
