// api
import * as postApi from '../../api/postApi';
import * as imageApi from '../../api/imageApi';

// actions
import * as appActions from '../../modules/app/appActions';
import * as navigationActions from '../../modules/navigation/navigationActions';

// i18n
import dictionary from './dictionary';
import { t } from '../../i18n';

// others

import { ActionConst } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Geocoder from 'react-native-geocoder';

export const CREATE_POST_SCENE_CHANGE_FORM_VALUE = 'CREATE_POST_SCENE_CHANGE_FORM_VALUE';
export const CREATE_POST_SCENE_SET_POSITION = 'CREATE_POST_SCENE_SET_POSITION';
export const CREATE_POST_SCENE_SET_ADDRESS = 'CREATE_POST_SCENE_SET_ADDRESS';
export const CREATE_POST_SCENE_CREATE = 'CREATE_POST_SCENE_CREATE';
export const CREATE_POST_SCENE_CREATE_SUCCESS = 'CREATE_POST_SCENE_CREATE_SUCCESS';
export const CREATE_POST_SCENE_CREATE_ERROR = 'CREATE_POST_SCENE_CREATE_ERROR';
export const CREATE_POST_SCENE_SET_TYPE = 'CREATE_POST_SCENE_SET_TYPE';
export const CREATE_POST_SCENE_GET_GEOCODE_DATA = 'CREATE_POST_SCENE_GET_GEOCODE_DATA';
export const CREATE_POST_SCENE_GET_GEOCODE_DATA_SUCCESS =
    'CREATE_POST_SCENE_GET_GEOCODE_DATA_SUCCESS';
export const CREATE_POST_SCENE_GET_GEOCODE_DATA_ERROR = 'CREATE_POST_SCENE_GET_GEOCODE_DATA_ERROR';
export const CREATE_POST_SCENE_SET_CURRENT_LOCATION = 'CREATE_POST_SCENE_SET_CURRENT_LOCATION';
export const CREATE_POST_SCENE_SET_CURRENT_LOCATION_SUCCESS =
    'CREATE_POST_SCENE_SET_CURRENT_LOCATION_SUCCESS';
export const CREATE_POST_SCENE_SET_CURRENT_LOCATION_ERROR =
    'CREATE_POST_SCENE_SET_CURRENT_LOCATION_ERROR';
export const CREATE_POST_SCENE_CANCEL_POST = 'CREATE_POST_SCENE_CANCEL_POST';

export const changeFormValue = (name, value) => ({
    type: CREATE_POST_SCENE_CHANGE_FORM_VALUE,
    name,
    value,
});

export const setPosition = position => ({
    type: CREATE_POST_SCENE_SET_POSITION,
    position,
});

export const setAddress = address => ({
    type: CREATE_POST_SCENE_SET_ADDRESS,
    address,
});

export const setType = postType => ({
    type: CREATE_POST_SCENE_SET_TYPE,
    postType,
});

export const createPost = address => {
    return (dispatch, getState) => {
        const {
            postType: type,
            form: { title, description, condition, address },
            position,
        } = getState().createPostScene;
        const { imageUpload } = getState().app;
        const { token } = getState().auth;

        const data = {
            type,
            title,
            description,
            images: imageUpload.images,
            condition,
            lat: position.lat,
            lng: position.lng,
            address,
        };

        dispatch({
            type: CREATE_POST_SCENE_CREATE,
            data,
        });

        return postApi
            .create(token, data)
            .then(resp => dispatch(appActions.processApiResponse(resp)))
            .then(post => {
                dispatch({
                    type: CREATE_POST_SCENE_CREATE_SUCCESS,
                    post,
                });

                dispatch(navigationActions.changeScene('home', {}, ActionConst.RESET));
                dispatch(appActions.onMessage(t(dictionary.createSuccess)));
                dispatch(appActions.clearImageUpload());
                return post;
            })
            .catch(error => {
                dispatch({
                    type: CREATE_POST_SCENE_CREATE_ERROR,
                    error,
                });
                return error;
            });
    };
};

export const setCurrentLocation = coords => {
    return (dispatch, getState) => {
        const position = {
            lat: coords.latitude,
            lng: coords.longitude,
        };

        dispatch({
            type: CREATE_POST_SCENE_SET_CURRENT_LOCATION,
            position,
        });
        dispatch(appActions.onMessage(t(dictionary.gettingLocation)));
        // run geocoder
        Geocoder.geocodePosition(position)
            .then(data => {
                const isPositionAvailable =
                    data &&
                    data.length &&
                    data[0].formattedAddress &&
                    data[0].position &&
                    data[0].position.lat &&
                    data[0].position.lng;

                // check if we have position
                if (isPositionAvailable) {
                    // proceed
                    dispatch({
                        type: CREATE_POST_SCENE_SET_CURRENT_LOCATION_SUCCESS,
                        address: data[0],
                    });
                } else {
                    dispatch({
                        type: CREATE_POST_SCENE_SET_CURRENT_LOCATION_ERROR,
                    });
                    // prompt user that address is not available
                    dispatch(appActions.onMessage(t(dictionary.gettingLocationError)));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: CREATE_POST_SCENE_SET_CURRENT_LOCATION_ERROR,
                });
                // prompt user that address is not available
                dispatch(appActions.onMessage(t(dictionary.gettingLocationError)));
            });
    };
};

export const getGeocodeData = (address, isCreatingPost) => {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_POST_SCENE_GET_GEOCODE_DATA,
        });
        dispatch(appActions.onMessage(t(dictionary.gettingLocation)));
        // run geo coding
        Geocoder.geocodeAddress(address)
            .then(data => {
                const isPositionAvailable =
                    data &&
                    data.length &&
                    data[0].formattedAddress &&
                    data[0].position &&
                    data[0].position.lat &&
                    data[0].position.lng;

                // check if we have position
                if (isPositionAvailable) {
                    // proceed
                    dispatch({
                        type: CREATE_POST_SCENE_GET_GEOCODE_DATA_SUCCESS,
                        address: data[0],
                    });
                    // check if creating post
                    if (isCreatingPost) {
                        dispatch(createPost());
                    }
                } else {
                    dispatch({
                        type: CREATE_POST_SCENE_GET_GEOCODE_DATA_ERROR,
                    });
                    // prompt user that address is not available
                    dispatch(appActions.onMessage(t(dictionary.locationInvalid)));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: CREATE_POST_SCENE_GET_GEOCODE_DATA_ERROR,
                });
                // prompt user that address is not available
                dispatch(appActions.onMessage(t(dictionary.locationInvalid)));
            });
    };
};

export const cancelPost = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_POST_SCENE_CANCEL_POST,
        });
        dispatch(appActions.clearImageUpload());
        dispatch(navigationActions.changeScene('home', {}, ActionConst.RESET));
    };
};
