import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import CurrentLocationContainer from '../../../modules/currentLocation/CurrentLocationContainer';

// components
import CustomButton from '../../../components/CustomButton';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles
import commonStyles from '../../../styles/common';
import mittiStyles from '../../../styles/mitti';
import * as font from '../../../styles/font';
import * as colors from '../../../styles/colors';

// i18n
import { t } from '../../../i18n';
import dictionary from '../dictionary';

// other

import { MAX_IMAGE_UPLOAD } from '../../../constants/constants';

export default class CreatePost extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        themeColor: PropTypes.string.isRequired,
        form: PropTypes.object.isRequired,
        imageUpload: PropTypes.object.isRequired,
        changeFormValue: PropTypes.func.isRequired,
        uploadImage: PropTypes.func.isRequired,
        removeImage: PropTypes.func.isRequired,
        cancelPost: PropTypes.func.isRequired,
        position: PropTypes.object,
        getGeocodeData: PropTypes.func.isRequired,
    };

    render() {
        const {
            me,
            type,
            themeColor,
            changeFormValue,
            uploadImage,
            cancelPost,
            form,
            imageUpload,
            getGeocodeData,
        } = this.props;

        return (
            <ScrollView
                ref={scrollView => {
                    this.scrollView = scrollView;
                }}
                style={mittiStyles.whiteBody}
            >
                <View style={[commonStyles.fullScreen, mittiStyles.bottomScrollExtra]}>
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <MCIIcon size={30} color={themeColor} name={'gift'} />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.headerText, { color: themeColor }]}>
                                {t(dictionary[type])}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.subjectContainer}>
                        <View style={styles.subjectInputContainer}>
                            <TextInput
                                ref={ref => {
                                    this.inputSubject = ref;
                                }}
                                value={form.title}
                                onChangeText={value => changeFormValue('title', value)}
                                onFocus={() => this._scrollView(this.inputSubject)}
                                style={styles.subjectInput}
                                placeholder={t(dictionary.subjectPlaceholder)}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                            />
                        </View>
                    </View>

                    <View style={styles.imageListContainer}>{this._renderImageList()}</View>
                    <View style={styles.uploadContainer}>
                        <UploadButton
                            me={me}
                            imageDataList={imageUpload.imageDataList}
                            openImagePicker={uploadImage}
                        />
                    </View>

                    <View style={styles.descriptionContainer}>
                        <TextInput
                            ref={ref => {
                                this.inputDescription = ref;
                            }}
                            value={form.description}
                            onChangeText={value => changeFormValue('description', value)}
                            onFocus={() => this._scrollView(this.inputDescription)}
                            style={styles.descriptionInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={t(dictionary.description)}
                            underlineColorAndroid={'rgba(0,0,0,0)'}
                        />
                    </View>

                    <View style={styles.conditionContainer}>
                        <View style={styles.conditionLabelContainer}>
                            <Text style={styles.conditionLabel}>{t(dictionary.condition)}:</Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <CustomButton
                                style={[styles.conditionButton, styles.conditionButtonWithGap]}
                                label={t(dictionary.new)}
                                borderColor={colors.GREY}
                                backgroundColor={this._getButtonBackgroundColor(
                                    form.condition == 'new'
                                )}
                                labelColor={this._getButtonLabelColor(form.condition == 'new')}
                                onPress={() => changeFormValue('condition', 'new')}
                            />
                            <CustomButton
                                style={styles.conditionButton}
                                label={t(dictionary.used)}
                                borderColor={colors.GREY}
                                backgroundColor={this._getButtonBackgroundColor(
                                    form.condition == 'used'
                                )}
                                labelColor={this._getButtonLabelColor(form.condition == 'used')}
                                onPress={() => changeFormValue('condition', 'used')}
                            />
                        </View>
                    </View>

                    <View style={styles.locationContainer}>
                        <View style={styles.locationInputContainer}>
                            <TextInput
                                ref={ref => {
                                    this.inputAddress = ref;
                                }}
                                value={form.address}
                                onChangeText={value => changeFormValue('address', value)}
                                onFocus={() => this._scrollView(this.inputAddress)}
                                onBlur={() => this._validateLocation()}
                                style={styles.locationInput}
                                placeholder={t(dictionary.location)}
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                            />
                        </View>
                        <CurrentLocationContainer />
                    </View>

                    <View style={styles.locationInfoContainer}>
                        <Text style={styles.locationInfo}>
                            {t(dictionary.willNotShowExactAddress)}
                        </Text>
                    </View>

                    <View style={styles.linkContainer}>
                        <TouchableOpacity onPress={() => cancelPost()} style={styles.anchor}>
                            <Text style={styles.anchorText}>{t(dictionary.backToHome)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    _renderImageList = () => {
        return this.props.imageUpload.imageDataList.map((anImageData, anIndex) => {
            return (
                <ImageListItem
                    key={anIndex}
                    listIndex={anIndex}
                    removeImage={this.props.removeImage}
                    imageData={anImageData}
                />
            );
        });
    };

    _changeCondition = value => {
        this.props.changeFormValue('condition', value);
    };

    _getButtonLabelColor = isSelected => {
        let color = colors.BLACK;

        // check if selected
        if (isSelected) {
            color = colors.WHITE;
        }
        return color;
    };

    _getButtonBackgroundColor = isSelected => {
        let color = colors.WHITE;

        // check if selected
        if (isSelected) {
            color = colors.GREEN;
        }
        return color;
    };

    // scroll to element
    _scrollView = el => {
        const { scrollTo } = this.scrollView;

        // wait keyboard to appear
        setTimeout(() => {
            // make sure we still have el - user not navigates away while timer is active
            if (el) {
                // get element offset
                el.measure((a, b, width, height, px, py) => {
                    let offset = py - 20 < 0 ? 0 : py - 20;

                    // scroll view
                    scrollTo({ y: offset });
                });
            }
        }, 500);
    };

    _validateLocation = () => {
        const { form, getGeocodeData } = this.props;

        let address = form.address;

        // check if we have address
        if (address) {
            getGeocodeData(address);
        }
    };
}

const UploadButton = ({ me, imageDataList, openImagePicker }) => {
    // check if max reached
    if (imageDataList.length < MAX_IMAGE_UPLOAD) {
        return (
            <TouchableOpacity
                onPress={() => openImagePicker(me.id, imageDataList)}
                style={styles.uploadButton}
            >
                {imageDataList.length === 0 ? <UploadButtonIcon /> : null}
                <Text style={styles.uploadLabel}>+ {t(dictionary.uploadPictures)}</Text>
            </TouchableOpacity>
        );
    } else {
        return null;
    }
};

const UploadButtonIcon = () => {
    return (
        <View style={styles.uploadIconContainer}>
            <FAIcon size={30} color={colors.GREY} name={'picture-o'} />
        </View>
    );
};

const ImageListItem = ({ listIndex, imageData, removeImage }) => {
    const source = { uri: imageData.uri };

    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    return (
        <View style={styles.imageContainer}>
            <Image source={source} style={styles.image} />
            <RemoveImageButton listIndex={listIndex} removeImage={removeImage} />
        </View>
    );
};

const RemoveImageButton = ({ listIndex, removeImage }) => {
    return (
        <TouchableOpacity onPress={() => removeImage(listIndex)} style={styles.imageRemoveButton}>
            <FAIcon size={40} color={colors.WHITE} name={'times-circle-o'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    iconContainer: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
    },
    imageListContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
    },
    imageContainer: {
        height: 100,
        width: 100,
        margin: 5,
    },
    image: {
        height: 100,
        width: 100,
    },
    imageRemoveButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    uploadContainer: {
        marginTop: 15,
        marginBottom: 40,
    },
    uploadButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.GREY,
        borderRadius: 40,
        width: 80,
        height: 80,
        marginBottom: 8,
    },
    descriptionContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.GREY,
        borderBottomWidth: 1,
        borderBottomColor: colors.GREY,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    descriptionInput: {
        height: 180,
        fontSize: 16,
        textAlignVertical: 'top',
    },
    subjectContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.GREY,
    },
    subjectInput: {
        fontSize: 16,
    },
    subjectInputContainer: {
        flex: 1,
    },
    conditionContainer: {
        marginHorizontal: 20,
        marginBottom: 30,
    },
    conditionLabel: {
        fontSize: 18,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    conditionButtonWithGap: {
        marginRight: 5,
    },
    conditionButton: {
        flex: 1,
    },
    locationContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.GREY,
    },
    locationInput: {
        fontSize: 16,
    },
    locationInfoContainer: {
        paddingHorizontal: 25,
    },
    locationInfo: {
        fontSize: 12,
    },
    locationInputContainer: {
        flex: 1,
    },
    locationIconContainer: {
        justifyContent: 'center',
    },
    linkContainer: {
        paddingHorizontal: 25,
        marginVertical: 40,
    },
    anchorText: {
        color: '#3695ED',
    },
});
