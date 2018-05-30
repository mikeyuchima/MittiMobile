import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    Button,
    Image,
} from 'react-native';
import { SpinnerOverlay } from '../../../components';
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

export default class Profile extends Component {
    static propTypes = {
        isEditable: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        isUpdatingMyProfile: PropTypes.bool.isRequired,
        toggleEditMode: PropTypes.func.isRequired,
        uploadImage: PropTypes.func.isRequired,
    };

    render() {
        const { isEditable, isUpdatingMyProfile, user, toggleEditMode, uploadImage } = this.props;
        const userEmail = user && user.username;
        const userProfile = user && user.profile;
        const userPhone = userProfile && userProfile.phone;
        const isPhonePublic = userProfile && userProfile.isPhonePublic;
        const userStats = user && user.stats;
        const askCount = userStats && userStats.myQuestionsCount;
        const answerCount = userStats && userStats.myAnswersCount;

        return (
            <ScrollView
                style={[commonStyles.fullScreen, mittiStyles.topWithNavBar, mittiStyles.whiteBody]}
            >
                <SpinnerOverlay show={isUpdatingMyProfile} />

                <View style={mittiStyles.bottomScrollExtra}>
                    <View style={styles.profileButton}>
                        <TouchableOpacity
                            onPress={() => uploadImage(user.id)}
                            style={profilePictureStyles.container}
                        >
                            {renderProfilePicture(user)}
                        </TouchableOpacity>
                        <View style={styles.usernameContainer}>
                            <Text style={styles.menuHeaderText}>{getUserFullName(user)}</Text>
                            {isEditable ? (
                                <TouchableOpacity
                                    onPress={() => toggleEditMode(true)}
                                    style={styles.editButton}
                                >
                                    <MCIIcon
                                        size={font.SIZE_H1}
                                        color={colors.DARK_GREY}
                                        name={'pencil'}
                                    />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>
                    <View style={styles.questionSectionContainer}>
                        <View style={styles.questionSection}>
                            <View style={styles.questionButton}>
                                <MCIIcon
                                    size={font.SIZE_ICON_CONTAINER}
                                    color={colors.PURPLE}
                                    name={'comment-question-outline'}
                                />
                                <Text style={styles.questionButtonLabel}>
                                    {t(dictionary.questionsAsked, askCount)}
                                </Text>
                            </View>
                            <View style={styles.questionButton}>
                                <MCIIcon
                                    size={font.SIZE_ICON_CONTAINER}
                                    color={colors.PURPLE}
                                    name={'comment-check'}
                                />
                                <Text style={styles.questionButtonLabel}>
                                    {t(dictionary.questionsAnswered, answerCount)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldContainer}>
                        <View style={styles.iconContainer}>
                            <FAIcon
                                size={font.SIZE_ICON}
                                color={colors.DARK_GREY}
                                name={'envelope'}
                            />
                        </View>
                        <View style={styles.fieldValueContainer}>
                            <View style={styles.valueContainer}>
                                <Text style={styles.fieldValue}>{userEmail}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.fieldContainer}>
                        <View style={styles.iconContainer}>
                            <FAIcon size={font.SIZE_ICON} color={colors.DARK_GREY} name={'phone'} />
                        </View>
                        <View style={styles.fieldValueContainer}>
                            <View style={styles.valueContainer}>
                                <Text style={styles.fieldValue}>{userPhone}</Text>
                            </View>
                            {userPhone && !isPhonePublic ? (
                                <View style={styles.badgeContainer}>
                                    <View style={styles.badgeIconContainer}>
                                        <MCIIcon
                                            size={font.SIZE_SMALL}
                                            color={colors.DARK_GREY}
                                            name={'eye'}
                                        />
                                    </View>
                                    <View style={styles.badgeLabelContainer}>
                                        <Text style={styles.badgeLabel}>
                                            {t(dictionary.onlyMe).toUpperCase()}
                                        </Text>
                                    </View>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const renderProfilePicture = me => {
    const filePath = me && me.profile && me.profile.img;
    const isMentor = me && me.isMentor;
    const source = { uri: filePath };

    // check if we have file path
    if (filePath) {
        return (
            <View style={profilePictureStyles.content}>
                <Image style={profilePictureStyles.image} source={source} />
                {isMentor ? (
                    <MCIIcon
                        size={20}
                        name={'star'}
                        color={'white'}
                        style={profilePictureStyles.starButton}
                    />
                ) : null}
            </View>
        );
    } else {
        return (
            <View style={profilePictureStyles.content}>
                <MCIIcon size={100} color={colors.DARK_GREY} name={'account-circle'} />
                {isMentor ? (
                    <MCIIcon
                        size={20}
                        name={'star'}
                        color={'white'}
                        style={profilePictureStyles.starButton}
                    />
                ) : null}
            </View>
        );
    }
};

const getUserFullName = me => {
    const profile = me && me.profile;
    const fullName = profile && profile.fullName;

    return fullName;
};

const styles = StyleSheet.create({
    field: {
        width: 400,
        alignItems: 'stretch',
        marginBottom: 10,
    },
    info: {
        textAlign: 'center',
    },
    input: {},
    button: {},
    actions: {
        marginTop: 10,
        flexDirection: 'row',
    },
    profileButton: {
        padding: 20,
        alignItems: 'center',
    },
    usernameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton: {
        marginLeft: 10,
    },
    menuHeaderText: {
        fontSize: font.SIZE_ICON,
        color: colors.DARK_GREY,
    },
    questionSectionContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.LIGHT_GREY,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GREY,
    },
    questionSection: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    questionButton: {
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 10,
    },
    questionButtonLabel: {
        color: colors.DARK_GREY,
    },
    fieldContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT_GREY,
        paddingVertical: 15,
    },
    iconContainer: {
        marginHorizontal: 20,
    },
    fieldValueContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    valueContainer: {
        flex: 1,
    },
    fieldValue: {
        fontSize: font.SIZE_H1,
        color: colors.DARK_GREY,
    },
    badgeContainer: {
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.LIGHT_GREY,
        padding: 2,
        marginRight: 20,
    },
    badgeLabel: {
        fontSize: font.SIZE_SMALL,
        marginLeft: 3,
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
