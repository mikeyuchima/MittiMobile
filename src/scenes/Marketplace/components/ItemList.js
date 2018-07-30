import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

// styles
import mittiStyles from '../../../styles/mitti';
import commonStyles from '../../../styles/common';
import * as colors from '../../../styles/colors';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// other


export default class ItemList extends Component {
    static propTypes = {
        themeColor: PropTypes.string.isRequired,
        changeScene: PropTypes.func.isRequired,
        isFetchingItems: PropTypes.bool.isRequired,
        marketType: PropTypes.string.isRequired,
        area: PropTypes.object.isRequired,
        items: PropTypes.array,
    };

    render() {
        const { changeScene, items, isFetchingItems, marketType, area, themeColor } = this.props;

        const locality = area && area.locality && area.locality.toUpperCase();
        const radius = area && area.radius;
        const radiusUnit = area && area.radiusUnit;
        const radiusDisplay = radius && radius.toString() + radiusUnit;

        let currentItemList = items.map(anItem => {
            // make sure it is the correct type
            if (anItem.obj.type == marketType) {
                return {
                    ...anItem.obj,
                    id: anItem.obj._id,
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
                <View style={[styles.listHeader]}>
                    <Text style={styles.headerItem}>{locality}</Text>
                    <Text style={styles.headerItem}>|</Text>
                    <Text style={styles.headerItem}>
                        {t(dictionary.radiusAroundMe, [radiusDisplay]).toUpperCase()}
                    </Text>
                </View>
                {currentItemList.map(anItem => (
                    <ListItem
                        key={anItem.id}
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
        <TouchableOpacity
            onPress={() =>
                changeScene('viewPost', {
                    marketType,
                    item,
                })
            }
            style={styles.itemContainer}
        >
            <View style={styles.contentContainer}>
                <View style={styles.thumbnailContainer}>
                    <ItemImage images={item.images} />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={mittiStyles.whiteFontStrong}>{item.title}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text
                            style={[
                                mittiStyles.darkFontStrong,
                                styles.price,
                                { backgroundColor: themeColor },
                            ]}
                        >
                            {t(dictionary.free).toUpperCase()}
                        </Text>
                        <Text style={styles.ownerName}>{item.creator.profile.fullName}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
    },
    thumbnailContainer: {
        width: 50,
        height: 50,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: colors.GREY,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F1',
    },
    headerItem: {
        fontSize: 12,
        color: colors.GREY,
        marginHorizontal: 5,
    },
    itemContainer: {
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F1',
    },
    titleContainer: {
        marginBottom: 5,
    },
    priceContainer: {
        flexDirection: 'row',
    },
    price: {
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    ownerName: {
        color: colors.GREY,
        marginHorizontal: 5,
    },
});
