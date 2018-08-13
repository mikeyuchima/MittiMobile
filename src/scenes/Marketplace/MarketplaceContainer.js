import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Marketplace from './components/Marketplace';
import AddPostButton from '../../components/AddPostButton';
import { SpinnerOverlay, VerificationRequest, CreatePostModal } from '../../components';
import { changeScene } from '../../modules/navigation/navigationActions.js';
import { requestVerification } from '../../modules/auth/authActions';
import { getMe } from '../../modules/me/meActions';
import { onMessage } from '../../modules/app/appActions.js';
import {
    setType,
    setArea,
    getItems,
    getPost,
    openCreatePostModal,
    closeCreatePostModal,
    onRegionChange,
} from './marketplaceActions.js';
import OpenDrawerButtonContainer from '../../modules/navigation/OpenDrawerButtonContainer';
import SearchButtonContainer from './SearchButtonContainer';
import NavBar from '../../modules/navigation/components/NavBar';
import { getCurrentPosition } from '../../modules/app/appActions';
import commonStyles from '../../styles/common';
import { t } from '../../i18n';
import dictionary from './dictionary';
import * as colors from '../../styles/colors';
import { POST_TYPES } from '../../constants/constants';
import Geocoder from 'react-native-geocoder';

class MarketplaceContainer extends Component {
    static propTypes = {
        me: PropTypes.object,
        isFetchingItems: PropTypes.bool.isRequired,
        changeScene: PropTypes.func.isRequired,
        getCurrentPosition: PropTypes.func.isRequired,
        onRegionChange: PropTypes.func.isRequired,
        marketType: PropTypes.string.isRequired,
        area: PropTypes.object.isRequired,
        openCreatePostModal: PropTypes.func.isRequired,
        closeCreatePostModal: PropTypes.func.isRequired,
        currentPosition: PropTypes.object,
        isCreatePostModalOpen: PropTypes.bool,
        getPost: PropTypes.func.isRequired,
        items: PropTypes.array,
        requestVerification: PropTypes.func.isRequired,
        getMe: PropTypes.func.isRequired,
    };

    // static renderNavi
    static navigationOptions = ({ navigation }) => {
        return {
        headerTitle: (
            <NavBar
                title={t(dictionary.freeShare)}
                leftButton={<OpenDrawerButtonContainer />}
            />
        ),
        headerLeft: null
        };
    };

    componentDidMount() {
        this.props.getCurrentPosition().then(currentPosition => {
            // check if we have position
            if (currentPosition) {
                const { latitude: lat, longitude: lng } = currentPosition.coords;

                this.props.getItems(lat, lng);
                this._getGeocodeData(currentPosition, geocodeData =>
                    this.props.setArea(geocodeData, this.props.me)
                );
            }
        });
        this.props.setType(this.props.navigation.getParam('marketType'));
    }

    componentWillReceiveProps(nextProps) {
        // check if we have position
        if (nextProps.currentRegion) {
            const { latitude: lat, longitude: lng } = nextProps.currentRegion;
            const currentPosition = { coords: nextProps.currentRegion };

            // check if region changed
            if (nextProps.isRegionChanged) {
                this.props.getItems(lat, lng);
                this._getGeocodeData(currentPosition, geocodeData =>
                    this.props.setArea(geocodeData, this.props.me)
                );
            }
        }
    }

    render() {
        const {
            me,
            changeScene,
            isFetchingItems,
            item,
            items,
            getPost,
            marketType,
            area,
            currentRegion,
            onRegionChange,
        } = this.props;

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
                <Marketplace
                    changeScene={changeScene}
                    isFetchingItems={isFetchingItems}
                    item={item}
                    items={items}
                    getPost={getPost}
                    marketType={marketType}
                    area={area}
                    currentRegion={currentRegion}
                    onRegionChange={onRegionChange}
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

    _getGeocodeData = (currentPosition, callback) => {
        const position = {
            lat: currentPosition.coords.latitude,
            lng: currentPosition.coords.longitude,
        };

        // run geo coding
        Geocoder.geocodePosition(position)
            .then(data => {
                let isPositionAvailable = data && data.length;
                let foundData = {},
                    processedData = {};

                // check if we have position
                if (isPositionAvailable) {
                    // process data
                    foundData = data.find(info => {
                        return info.adminArea !== null;
                    });
                    processedData.adminArea = foundData.adminArea;
                    foundData = data.find(info => {
                        return info.country !== null;
                    });
                    processedData.country = foundData.country;
                    foundData = data.find(info => {
                        return info.countryCode !== null;
                    });
                    processedData.countryCode = foundData.countryCode;
                    foundData = data.find(info => {
                        return info.formattedAddress !== null;
                    });
                    processedData.formattedAddress = foundData.formattedAddress;
                    foundData = data.find(info => {
                        return info.locality !== null;
                    });
                    processedData.locality = foundData.locality;
                    foundData = data.find(info => {
                        return info.position && info.position.lat && info.position.lng;
                    });
                    processedData.position = foundData.position;
                    // proceed
                    callback(processedData);
                } else {
                    // prompt user that address is not available
                    this._displayMessage('locationInvalid');
                }
            })
            .catch(err => {
                console.log(err);
                // prompt user that address is not available
                this._displayMessage('locationInvalid');
            });
    };

    _displayMessage = id => {
        this.props.onMessage(t(dictionary[id]));
    };
}

function mapStateToProps(state) {
    return {
        ...state.marketplaceScene,
        me: state.me.me,
        currentPosition: state.app.currentPosition,
        isGettingCurrentPosition: state.app.isGettingCurrentPosition,
    };
}

export default connect(mapStateToProps, {
    getCurrentPosition,
    changeScene,
    getItems,
    getPost,
    setType,
    setArea,
    openCreatePostModal,
    closeCreatePostModal,
    onRegionChange,
    requestVerification,
    getMe,
    onMessage,
})(MarketplaceContainer);
