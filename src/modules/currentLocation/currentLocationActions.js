// router actions
import * as appActions from '../../modules/app/appActions';

// i18n
import dictionary from './dictionary';
import {t} from '../../i18n';

// constants
import {GOOGLE_INFO} from '../../constants/constants';

// others
import Geocoder from 'react-native-geocoder';
// import { POINT_CONVERSION_COMPRESSED } from 'constants';

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
          const isPositionAvailable = data && data.length;
          let foundData = {},
              processedData = {},
              addressSegments = [];

          // TODO encapsulate this
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
                  return info.postalCode !== null;
              });
              processedData.postalCode = foundData.postalCode;
              foundData = data.find(info => {
                  return info.position && info.position.lat && info.position.lng;
              });
              processedData.position = foundData.position;
              // generate our own formatted address
              processedData.locality && addressSegments.push(processedData.locality);
              processedData.adminArea && addressSegments.push(processedData.adminArea);
              processedData.postalCode && addressSegments.push(processedData.postalCode);
              processedData.country && addressSegments.push(processedData.country);
              // insert into passing argument
              processedData.myAddress = addressSegments.join(', ');
              // proceed
              dispatch({
                type: CURRENT_LOCATION_SET_CURRENT_LOCATION_SUCCESS,
                address: processedData
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