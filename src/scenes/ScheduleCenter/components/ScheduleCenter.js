import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import { StyleSheet, ScrollView, TouchableOpacity, Image, View, Text } from 'react-native';
import moment from 'moment';

// components
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// other
import SCENES from '../../../scenes';

export default class ScheduleCenter extends Component {
    static propTypes = {
        me: PropTypes.object,
        chats: PropTypes.array.isRequired,
        changeScene: PropTypes.func.isRequired,
    };

    render() {
        const { me, chats } = this.props;

        return (
            <ScrollView
                ref={ref => {
                    this.scrollView = ref;
                }}
                style={[mittiStyles.whiteBody]}
            >
                <View style={[commonStyles.fullScreen, mittiStyles.bottomScrollExtra]}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.chatTitle}>
                            {chats && chats.length
                                ? t(dictionary.yourConfirmedSchedules)
                                : t(dictionary.noConfirmedSchedules)}
                        </Text>
                    </View>
                    <View style={styles.messageListContainer}>{this._renderMessageList()}</View>
                </View>
            </ScrollView>
        );
    }

    _renderMessageList = () => {
        const { me, chats, changeScene } = this.props;

        // check if we have message groups
        if (chats && chats.length) {
            // go through each group
            return chats.map(aChat => {
                return <ChatItem key={aChat.id} me={me} chat={aChat} changeScene={changeScene} />;
            });
        }
    };
}

const ChatItem = ({ me, chat, changeScene }) => {
    const post = chat.post,
        messages = chat.messages;

    let params = {},
        chatPartner = {},
        displayTime = '';

    if (me._id == chat.buyer._id) {
        chatPartner = chat.seller && chat.seller.profile;
    } else {
        chatPartner = chat.buyer && chat.buyer.profile;
    }
    // generate display time
    displayTime = chat.scheduledAt || null;
    displayTime = displayTime && moment(displayTime).format('dddd MMM, D @ ha');
    // check if we have post obj
    if (post) {
        // generate params
        params = {
            navigationParams: {
                chatId: chat._id,
                itemId: post._id,
            },
        };
        return (
            <View style={styles.chatItemContainer}>
                <View style={styles.scheduleContainer}>
                    <View style={styles.userPhotoContainer}>
                        <UserPhoto user={chatPartner} />
                    </View>
                    <View style={styles.chatInfoContainer}>
                        <View style={styles.chatPostContainer}>
                            <Text style={styles.partner}>
                                {t(dictionary.meetWithPartner, chatPartner.firstName)}
                            </Text>
                            <Text style={styles.displayTime}>{displayTime}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <View style={styles.separatorTitleContainer}>
                        <Text style={styles.separatorTitle}>
                            {t(dictionary.product).toUpperCase()}
                        </Text>
                    </View>
                </View>

                <View style={styles.scheduleContainer}>
                    <View style={styles.postImageContainer}>
                        <ItemImage images={post.images} />
                    </View>
                    <View style={styles.chatInfoContainer}>
                        <View style={styles.chatPostContainer}>
                            <Text style={styles.postTitle}>{post && post.title}</Text>
                            <View style={styles.priceContainer}>
                                <Text
                                    style={[
                                        mittiStyles.darkFontStrong,
                                        styles.price,
                                        { backgroundColor: colors.GREEN },
                                    ]}
                                >
                                    {t(dictionary.free).toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                </View>

                <View style={[styles.scheduleContainer, { justifyContent: 'center' }]}>
                    <TouchableOpacity
                        onPress={() => changeScene(SCENES.chat.key, params)}
                        style={styles.gotoMessageContainer}
                    >
                        <MCIIcon
                            size={font.SIZE_ICON}
                            color={colors.GREEN}
                            name={'message-processing'}
                        />
                        <Text style={styles.gotoMessage}>{t(dictionary.gotoMessage)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return null;
    }
};

const UserPhoto = ({ user }) => {
    var filePath = user && user.profile && user.profile.photo;

    // check if we have file path
    if (filePath) {
        return (
            <Image
                style={[styles.image, styles.userPhoto]}
                source={require('../../../assets/images/logo.png')}
            />
        );
    } else {
        return (
            <View style={styles.userPhotoDefault}>
                <MCIIcon
                    size={font.SIZE_ICON_CONTAINER}
                    color={colors.GREY}
                    name={'account-circle'}
                />
            </View>
        );
    }
};

const ItemImage = ({ images }) => {
    let imageSource = images && images.length && images[0];

    // check if we have an image
    if (imageSource) {
        return <Image style={styles.postImage} source={{ uri: imageSource }} />;
    } else {
        return <FAIcon size={font.SIZE_ICON_CONTAINER} color={colors.GREY} name={'picture-o'} />;
    }
};

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 15,
    },
    chatTitle: {
        fontSize: font.SIZE_ICON,
        color: colors.LIGHT_BLACK,
    },
    chatItemContainer: {
        backgroundColor: colors.LIGHT_BLACK,
        paddingVertical: 15,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 8,
    },
    scheduleContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    userPhotoContainer: {
        marginHorizontal: 5,
    },
    chatInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    chatPostContainer: {
        flex: 1,
        marginRight: 5,
    },
    partner: {
        color: colors.WHITE,
        fontSize: font.SIZE_ICON,
    },
    postTitle: {
        color: colors.WHITE,
        fontSize: font.SIZE_H2,
        fontWeight: 'bold',
    },
    displayTime: {
        color: colors.WHITE,
        fontSize: font.SIZE_NORMAL,
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: colors.GREY,
    },
    userPhoto: {
        borderRadius: 50,
    },
    priceContainer: {
        flexDirection: 'row',
    },
    price: {
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    postImageContainer: {
        marginHorizontal: 5,
    },
    postImage: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: colors.GREY,
    },
    separatorContainer: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    separatorLine: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: colors.DARK_GREY,
    },
    separatorTitleContainer: {
        alignItems: 'center',
        marginTop: -8,
    },
    separatorTitle: {
        color: colors.DARK_GREY,
        fontSize: font.SIZE_SMALL,
        backgroundColor: colors.LIGHT_BLACK,
        paddingHorizontal: 5,
    },
    gotoMessageContainer: {
        flexDirection: 'row',
    },
    gotoMessage: {
        color: colors.WHITE,
        marginLeft: 8,
    },
});
