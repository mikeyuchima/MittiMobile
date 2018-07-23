// other module actions
import * as authActions from '../auth/authActions';

// i18n
import dictionary from './dictionary';
import { t } from '../../i18n';

// styles
import * as colors from '../../styles/colors';

// other

import Snackbar from 'react-native-snackbar';
import ImagePicker from 'react-native-image-picker';

// api
import * as imageApi from '../../api/imageApi';

// action types
export const APP_ON_ERROR = 'APP_ON_ERROR';
export const APP_ON_MESSAGE = 'APP_ON_MESSAGE';
export const APP_PROCESS_HTTP_RESPONSE = 'APP_PROCESS_HTTP_RESPONSE';
export const APP_GET_CURRENT_POSITION = 'APP_GET_CURRENT_POSITION';
export const APP_GET_CURRENT_POSITION_SUCCESS = 'APP_GET_CURRENT_POSITION_SUCCESS';
export const APP_GET_CURRENT_POSITION_ERROR = 'APP_GET_CURRENT_POSITION_ERROR';
export const APP_UPLOAD_IMAGE = 'APP_UPLOAD_IMAGE';
export const APP_UPLOAD_IMAGE_SUCCESS = 'APP_UPLOAD_IMAGE_SUCCESS';
export const APP_UPLOAD_IMAGE_ERROR = 'APP_UPLOAD_IMAGE_ERROR';
export const APP_REMOVE_IMAGE = 'APP_REMOVE_IMAGE';
export const APP_CLEAR_UPLOAD_IMAGE = 'APP_CLEAR_UPLOAD_IMAGE';

/**
 * @NOTE: To make this work on android emulator
 * Get your auth token at
 * $ cat ~/.emulator_console_auth_token
 * $ telnet localhost 5554
 * auth <token>
 * geo fix -79.380319 43.653982
 */
export const getCurrentPosition = () => {
    return (dispatch, getState) => {
        dispatch({
            type: APP_GET_CURRENT_POSITION,
        });

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                currentPosition => {
                    dispatch({
                        type: APP_GET_CURRENT_POSITION_SUCCESS,
                        currentPosition,
                    });

                    resolve(currentPosition);
                },
                error => {
                    dispatch({
                        type: APP_GET_CURRENT_POSITION_ERROR,
                        error,
                    });

                    dispatch(onError('Unable to get current position'));

                    reject(error);
                },
                {
                    // enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000,
                }
            );
        });
    };
};

export const onError = error => {
    return (dispatch, getState) => {
        dispatch({
            type: APP_ON_ERROR,
            error,
        });
        Snackbar.show({
            backgroundColor: colors.ERROR,
            title: error,
            duration: Snackbar.LENGTH_LONG, // LENGTH_SHORT, LENGTH_LONG, LENGTH_INDEFINITE
            action: {
                title: 'DISMISS',
                color: colors.WHITE,
                onPress: () => {},
            },
        });
    };
};

export const onMessage = (message, onPress) => {
    return (dispatch, getState) => {
        dispatch({
            type: APP_ON_MESSAGE,
            message,
        });
        Snackbar.show({
            backgroundColor: colors.PRIMARY,
            title: message,
            duration: Snackbar.LENGTH_LONG, // LENGTH_SHORT, LENGTH_LONG, LENGTH_INDEFINITE
            action: {
                title: onPress ? 'VIEW' : 'DISMISS',
                color: colors.WHITE,
                onPress: () => {
                    // check if function
                    if (typeof onPress == 'function') {
                        onPress();
                    }
                },
            },
        });
    };
};

export const processApiResponse = resp => {
    return (dispatch, getState) => {
        dispatch({
            type: APP_PROCESS_HTTP_RESPONSE,
            resp,
        });

        if (resp.ok) {
            return resp.json();
        } else {
            switch (resp.status) {
                case 401:
                    // unauthorized
                    dispatch(onError(t(dictionary.sessionExpired)));
                    return dispatch(authActions.logout());
                    break;
                case 403:
                case 404:
                default:
                    // any other non 2xx
                    return new Promise((resolve, reject) => {
                        resp.json()
                            .then(error => {
                                const { code, message } = error;
                                dispatch(onError(message));
                                reject(message);
                                return message;
                            })
                            .catch(error => {
                                reject(error);
                                return error;
                            });
                    });
            }
        }
    };
};

export const uploadImage = (userId, imageDataList = []) => {
    return (dispatch, getState) => {
        const options = {
            title: t(dictionary.selectImages),
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        return new Promise((resolve, reject) => {
            ImagePicker.showImagePicker(options, imageData => {
                let newImageDataList = [];

                if (imageData.didCancel) {
                    reject('User cancelled image picker');
                } else if (imageData.error) {
                    reject('ImagePicker Error: ', imageData.error);
                } else if (imageData.customButton) {
                    reject('User tapped custom button: ', imageData.customButton);
                } else {
                    // add image data
                    newImageDataList = [...imageDataList, imageData];
                    // add to form
                    dispatch({
                        type: APP_UPLOAD_IMAGE,
                        imageDataList: newImageDataList,
                    });
                    // upload to server
                    imageApi.upload(userId, imageData).then(response => {
                        let imageUrl =
                            response &&
                            response.body &&
                            response.body.postResponse &&
                            response.body.postResponse.location;

                        // check if response fails or no image url
                        if (response.status !== 201 || !imageUrl) {
                            dispatch({
                                type: APP_UPLOAD_IMAGE_ERROR,
                                imageDataList,
                            });
                            dispatch(onMessage(t(dictionary.uploadFailed)));
                            reject(t(dictionary.uploadFailed));
                        } else {
                            // add url to image data
                            imageData.cloudUrl = imageUrl;
                            // update new image data list
                            newImageDataList = [...imageDataList, imageData];
                            dispatch({
                                type: APP_UPLOAD_IMAGE_SUCCESS,
                                imageDataList: newImageDataList,
                            });
                            resolve(imageUrl);
                        }
                    });
                }
            });
        });
    };
};

export const removeImage = listIndex => {
    return (dispatch, getState) => {
        const {
            imageUpload: { images, imageDataList },
        } = getState().app;
        const newImageDataList = [
            ...imageDataList.slice(0, listIndex),
            ...imageDataList.slice(listIndex + 1),
        ];
        const newImageUrls = newImageDataList.map(anImageData => {
            return anImageData.cloudUrl;
        });

        dispatch({
            type: APP_REMOVE_IMAGE,
            imageDataList: newImageDataList,
        });
    };
};

export const clearImageUpload = () => {
    return (dispatch, getState) => {
        dispatch({
            type: APP_CLEAR_UPLOAD_IMAGE,
        });
    };
};
