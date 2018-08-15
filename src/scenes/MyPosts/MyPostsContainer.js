import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import MyPosts from './components/MyPosts';
import AddPostButton from '../../components/AddPostButton';
import { SpinnerOverlay, VerificationRequest, CreatePostModal } from '../../components';
import { changeScene } from '../../modules/navigation/navigationActions.js';
import { requestVerification } from '../../modules/auth/authActions';
import { getMe } from '../../modules/me/meActions';
import {
    setType,
    getItems,
    getChats,
    openCreatePostModal,
    closeCreatePostModal,
} from './myPostsActions.js';
import BackButtonContainer from '../../modules/navigation/BackButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';
import commonStyles from '../../styles/common';
import { t } from '../../i18n';
import dictionary from './dictionary';
import * as colors from '../../styles/colors';
import { POST_TYPES } from '../../constants/constants';
import Geocoder from 'react-native-geocoder';

class MyPostsContainer extends Component {
    static propTypes = {
        me: PropTypes.object,
        isFetchingItems: PropTypes.bool.isRequired,
        changeScene: PropTypes.func.isRequired,
        marketType: PropTypes.string.isRequired,
        openCreatePostModal: PropTypes.func.isRequired,
        closeCreatePostModal: PropTypes.func.isRequired,
        isCreatePostModalOpen: PropTypes.bool,
        items: PropTypes.object,
        chats: PropTypes.object,
        requestVerification: PropTypes.func.isRequired,
        getMe: PropTypes.func.isRequired,
    };

    // static renderNavi
    static navigationOptions = ({ navigation }) => {
        const navKey = navigation.state.key;

        return {
        headerTitle: (
            <NavBar
                title={t(dictionary.freeShare)} 
                leftButton={<BackButtonContainer navKey={navKey} />} 
            />
        ),
        headerLeft: null
        };
    };

    componentDidMount() {
        this.props.getItems();
        this.props.getChats();
        this.props.setType(this.props.navigation.getParam('marketType'));
    }

    render() {
        const { me, changeScene, isFetchingItems, items, chats, marketType } = this.props;

        let themeColor = '';

        if (!me) {
            return <SpinnerOverlay show={true} />;
        } else if (!me.isVerified) {
            return (
                <VerificationRequest
                    username={me.username}
                    resend={this.props.requestVerification}
                    reload={this.props.refreshScene}
                    isOpen={true}
                />
            );
        }
        // pick theme color
        switch (marketType) {
            case POST_TYPES.free.id: {
                themeColor = colors.GREEN;
                break;
            }
            case POST_TYPES.buy.id: {
                themeColor = colors.BLUE;
                break;
            }
            case POST_TYPES.sell.id: {
                themeColor = colors.ORANGE;
                break;
            }
            default: {
                themeColor = colors.ERROR;
            }
        }

        return (
            <View style={commonStyles.fullScreen}>
                <MyPosts
                    changeScene={changeScene}
                    isFetchingItems={isFetchingItems}
                    items={items}
                    chats={chats}
                    marketType={marketType}
                    themeColor={themeColor}
                />
                <AddPostButton
                    onCreatePost={this.props.openCreatePostModal}
                    buttonColor={themeColor}
                />
                <CreatePostModal
                    changeScene={changeScene}
                    isOpen={this.props.isCreatePostModalOpen}
                    onClose={this.props.closeCreatePostModal}
                />
            </View>
        );
    }

    _displayMessage = id => {
        this.props.onMessage(t(dictionary[id]));
    };
}

function mapStateToProps(state) {
    return {
        ...state.myPostsScene,
        me: state.me.me,
    };
}

export default connect(mapStateToProps, {
    changeScene,
    getItems,
    getChats,
    setType,
    openCreatePostModal,
    closeCreatePostModal,
    requestVerification,
    getMe,
})(MyPostsContainer);
