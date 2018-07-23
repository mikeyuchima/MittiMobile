import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

// components
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import mittiStyles from '../../../styles/mitti';
import commonStyles from '../../../styles/common';
import * as colors from '../../../styles/colors';
import * as font from '../../../styles/font';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// other
import SCENES from '../../../scenes';

export default class ItemList extends Component {
    static propTypes = {
        themeColor: PropTypes.string.isRequired,
        changeScene: PropTypes.func.isRequired,
        isFetchingItems: PropTypes.bool.isRequired,
        marketType: PropTypes.string.isRequired,
        items: PropTypes.object,
        chats: PropTypes.object,
    };

    render() {
        const { changeScene, items, chats, isFetchingItems, marketType, themeColor } = this.props;

        let currentItemList =
            items.rows &&
            items.rows.map(anItem => {
                const inquiries =
                    chats.rows &&
                    chats.rows.filter(aChat => {
                        return aChat._id == anItem._id;
                    });

                // make sure it is the correct type
                if (anItem.type == marketType) {
                    return {
                        ...anItem,
                        id: anItem._id,
                        inquiries,
                    };
                }
            });

        return (
            <View
                style={[
                    mittiStyles.whiteBody,
                    styles.questionListContainer,
                    mittiStyles.bottomScrollExtra,
                ]}
            >
                {currentItemList &&
                    currentItemList.map(anItem => (
                        <ListItem
                            key={anItem._id}
                            changeScene={changeScene}
                            marketType={marketType}
                            item={anItem}
                            themeColor={themeColor}
                        />
                    ))}
                {isFetchingItems && (
                    <View style={commonStyles.centeredChilds}>
                        <Spinner color={'black'} />
                    </View>
                )}
            </View>
        );
    }
}

const ItemImage = ({ images }) => {
    let imageSource = images && images.length && images[0];

    // check if we have an image
    if (imageSource) {
        return <Image style={styles.image} source={{ uri: imageSource }} />;
    } else {
        return <FAIcon size={30} color={colors.GREY} name={'picture-o'} />;
    }
};

const ListItem = ({ changeScene, marketType, item, themeColor }) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    onPress={() =>
                        changeScene(SCENES.viewPost.key, {
                            navigationParams: {
                                marketType,
                                item,
                            },
                        })
                    }
                    style={styles.thumbnailContainer}
                >
                    <ItemImage images={item.images} />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            changeScene(SCENES.viewPost.key, {
                                navigationParams: {
                                    marketType,
                                    item,
                                },
                            })
                        }
                        style={styles.titleContainer}
                    >
                        <Text style={styles.titleText}>{item.title}</Text>
                        <Text style={[styles.titleText, { color: themeColor }]}>
                            {t(dictionary.free).toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            changeScene(SCENES.messageCenter.key, {
                                navigationParams: {
                                    item,
                                },
                            })
                        }
                        style={styles.inquiryContainer}
                    >
                        <View style={styles.inquiryLabelContainer}>
                            <MCIIcon
                                size={font.SIZE_H1}
                                color={colors.DARK_GREY}
                                name={'message-processing'}
                            />
                            <Text style={styles.inquiryText}>
                                {item.inquiries && item.inquiries.length
                                    ? item.inquiries.length === 1
                                        ? t(dictionary.inquiry, item.inquiries.length)
                                        : t(dictionary.inquiries, item.inquiries.length)
                                    : t(dictionary.inquiries, 0)}
                            </Text>
                        </View>
                        <View style={styles.inquiryButtonContainer}>
                            <FAIcon
                                size={font.SIZE_H1}
                                color={colors.DARK_GREY}
                                name={'chevron-right'}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.timestampContainer}>
                <Text style={styles.timestamp}>
                    {moment(item.updatedAt).format('MMMM D, YYYY')}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: colors.LIGHT_GREY,
        borderBottomColor: colors.LIGHT_GREY,
    },
    thumbnailContainer: {
        width: 120,
        height: 120,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 120,
        height: 120,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GREY,
    },
    headerItem: {
        fontSize: 12,
        color: colors.GREY,
        marginHorizontal: 5,
    },
    itemContainer: {
        marginBottom: 15,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    titleContainer: {
        paddingVertical: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GREY,
    },
    inquiryContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingRight: 10,
    },
    inquiryLabelContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inquiryText: {
        fontSize: font.SIZE_H1,
        color: colors.DARK_GREY,
        marginLeft: 5,
    },
    inquiryButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 40,
    },
    titleText: {
        fontSize: font.SIZE_H1,
        color: colors.LIGHT_BLACK,
    },
    timestampContainer: {
        marginTop: 5,
        marginHorizontal: 10,
    },
    timestamp: {
        fontSize: font.SIZE_SMALL,
        textAlign: 'right',
        color: colors.GREY,
    },
});
