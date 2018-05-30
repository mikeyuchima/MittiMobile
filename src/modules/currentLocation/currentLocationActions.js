// router actions
import * as appActions from '../../modules/app/appActions';

// i18n
import dictionary from './dictionary';
import {t} from '../../i18n';

// constants
import {GOOGLE_INFO} from '../../constants/constants';

// others
import Geocoder from 'react-native-geocoder';

// actiom types
export const CURRENT_LOCATION_GENERATE_LOCATION = 'CURRENT_LOCATION_GENERATE_LOCATION';
export const CURRENT_LOCATION_SET_CURRENT_LOCATION = 'CURRENT_LOCATION_SET_CURRENT_LOCATION';
export const CURRENT_LOCATION_SET_CURRENT_LOCATION_SUCCESS = 'CURRENT_LOCATION_SET_CURRENT_LOCATION_SUCCESS';
export const CURRENT_LOCATION_SET_CURRENT_LOCATION_ERROR = 'CURRENT_LOCATION_SET_CURRENT_LOCATION_ERROR';
export const CURRENT_LOCATION_RESET_LOCATION = 'CURRENT_LOCATION_RESET_LOCATION';

export const generateLocation = () => {
  return (dispatch, getState) => {
    // need to install react-native-device-info
    // do not commit this line!
    // Geocoder.fallbackToGoogle(GOOGLE_INFO.geoApiKey);

    dispatch({
      type: CURRENT_LOCATION_GENERATE_LOCATION,
    });
    dispatch(appActions.getCurrentPosition())
      .then((data) => {
        const position = {
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        };

        dispatch({
          type: CURRENT_LOCATION_SET_CURRENT_LOCATION,
          position,
        });  
        dispatch(appActions.onMessage(t(dictionary.gettingLocation)));
        // run geocoder
        Geocoder.geocodePosition(position).then((data) => {
          const isPositionAvailable = data && 
                                      data.length && 
                                      data[0].formattedAddress && 
                                      data[0].position && 
                                      data[0].position.lat && 
                                      data[0].position.lng;

          // check if we have position
          if(isPositionAvailable) {
            // proceed
            dispatch({
              type: CURRENT_LOCATION_SET_CURRENT_LOCATION_SUCCESS,
              address: data[0],
            });  
          }
          else {
            dispatch({
              type: CURRENT_LOCATION_SET_CURRENT_LOCATION_ERROR,
            });  
            // prompt user that address is not available
            dispatch(appActions.onMessage(t(dictionary.gettingLocationError)));
          }
        }).catch((err) => {
          console.log(err)
          dispatch({
            type: CURRENT_LOCATION_SET_CURRENT_LOCATION_ERROR,
          });  
          // prompt user that address is not available
          dispatch(appActions.onMessage(t(dictionary.gettingLocationError)));
        });
      });
  };
};

export const clearLocation = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CURRENT_LOCATION_RESET_LOCATION,
    });
  };
};