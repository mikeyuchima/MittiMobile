import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
    getMarkers,
    openCreatePostModal,
    closeCreatePostModal,
    activateMap,
    deactivateMap,
    getItems,
    getPost,
    onRegionChange,
} from './homeActions';
import { getMe, getMyStats, getMyQuestions } from '../../modules/me/meActions';
import { getCurrentPosition } from '../../modules/app/appActions';
import { requestVerification } from '../../modules/auth/authActions';
import { changeScene } from '../../modules/navigation/navigationActions.js';

// containers
import OpenDrawerButtonContainer from '../../modules/navigation/OpenDrawerButtonContainer';
import OpenDropdownButtonContainer from '../../modules/radius/OpenDropdownButtonContainer';
import RadiusDropdownContainer from '../../modules/radius/RadiusDropdownContainer';

// components
import Home from './components/Home';
import AddPostButton from '../../components/AddPostButton';
import { SpinnerOverlay, VerificationRequest, CreatePostModal } from '../../components';
import NavBar from '../../modules/navigation/components/NavBar';

import { DISTANT_CONVERSION } from '../../constants/constants';
import commonStyles from '../../styles/common';
import { t } from '../../i18n';
import dictionary from './dictionary';

class HomeContainer extends Component {
    static propTypes = {
        me: PropTypes.object,
        radius: PropTypes.object,
        changeScene: PropTypes.func.isRequired,
        onRegionChange: PropTypes.func.isRequired,
        getPost: PropTypes.func.isRequired,
        getMarkers: PropTypes.func.isRequired,
        isCreatePostModalOpen: PropTypes.bool.isRequired,
        openCreatePostModal: PropTypes.func.isRequired,
        closeCreatePostModal: PropTypes.func.isRequired,
        isFetchingMyQuestions: PropTypes.bool.isRequired,
        myQuestions: PropTypes.array.isRequired,
        getMyQuestions: PropTypes.func.isRequired,
        unreadMessages: PropTypes.array.isRequired,
        getCurrentPosition: PropTypes.func.isRequired,
        requestVerification: PropTypes.func.isRequired,
        getMe: PropTypes.func.isRequired,
        item: PropTypes.object,
        items: PropTypes.array,
    };

    // static renderNavigationBar = props => {
    //     const isVerified = props.me && props.me.isVerified;

    //     return (
    //         <NavBar
    //             title={t(dictionary.home)}
    //             leftButton={<OpenDrawerButtonContainer />}
    //             rightButton={<OpenDropdownButtonContainer />}
    //         />
    //     );
    // };

    static navigationOptions = {
        // headerTitle instead of title
        headerTitle: (
            <NavBar
                title={t(dictionary.home)}
                leftButton={<OpenDrawerButtonContainer />}
                rightButton={<OpenDropdownButtonContainer />}
            />
        ),
        headerLeft: null,
    };

    componentDidMount() {
        this.props.getMyStats();
        this.props.getMyQuestions();
        this.props.getCurrentPosition().then(currentPosition => {
            // check if we have position
            if (currentPosition) {
                const { latitude: lat, longitude: lng } = currentPosition.coords;

                // this sets currentRegion
                this.props.onRegionChange({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                });
                this.props.getItems(lat, lng);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        // check if we have position
        if (nextProps.currentRegion) {
            const { latitude: lat, longitude: lng } = nextProps.currentRegion;

            // check if region changed
            if (nextProps.isRegionChanged) {
                this.props.getItems(lat, lng);
            }
        }
    }

    render() {
        const { me, items, currentRegion } = this.props;
        const markers = this._toMarkers(items);
        const hasRegion = currentRegion && 
                          currentRegion.latitude && 
                          currentRegion.longitude;

        if (!me || !hasRegion) {
            return <SpinnerOverlay show={true} />;
        } 
        else if (!me.isVerified) {
            return (
                <VerificationRequest
                    username={me.username}
                    resend={this.props.requestVerification}
                    reload={this.props.getMe}
                    isOpen={true}
                />
            );
        } 
        else {
            return (
                <View style={commonStyles.fullScreen}>
                    <CreatePostModal
                        changeScene={this.props.changeScene}
                        isOpen={this.props.isCreatePostModalOpen}
                        onClose={this.props.closeCreatePostModal}
                    />
                    <Home markers={markers} {...this.props} />
                    <AddPostButton onCreatePost={this.props.openCreatePostModal} />
                    <RadiusDropdownContainer />
                </View>
            );
        }
    }

    _toMarkers = items => {
        return items.map(anItem => {
            const itemObj = anItem && anItem.obj;
            const coordinates = itemObj && itemObj.location && itemObj.location.coordinates;
            const latitude = coordinates && coordinates[0];
            const longitude = coordinates && coordinates[1];

            return {
                id: itemObj._id,
                title: itemObj.title,
                description: itemObj.description,
                latitude,
                longitude,
            };
        });
    };
}

function mapStateToProps(state) {
    return {
        ...state.homeScene,
        // navigation: state.navigation.scene,
        me: state.me.me,
        myQuestions: state.me.myQuestions,
        isFetchingMyQuestions: state.me.isFetchingMyQuestions,
        radius: state.radius,
        unreadMessages: state.unreadMessages.unreadMessages,
        currentPosition: state.app.currentPosition,
    };
}

export default connect(
    mapStateToProps,
    {
        openCreatePostModal,
        closeCreatePostModal,
        changeScene,
        onRegionChange,
        getPost,
        getMarkers,
        getMyStats,
        getMe,
        getMyQuestions,
        getCurrentPosition,
        requestVerification,
        getItems,
    }
)(HomeContainer);
