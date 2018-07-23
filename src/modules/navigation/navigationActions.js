import { NavigationActions } from 'react-navigation';
// actiom types
export const NAVIGATION_OPEN_DRAWER = 'NAVIGATION_OPEN_DRAWER';
export const NAVIGATION_CLOSE_DRAWER = 'NAVIGATION_CLOSE_DRAWER';

export const changeScene = (routeName, params = {}, type = 'PUSH') => {
    return (dispatch, getState) => {
        dispatch(NavigationActions.navigate({ routeName, params }));
    };
};

export const refreshScene = (sceneKey, params = {}) => {
    return (dispatch, getState) => {
        Actions.refresh({
            key: sceneKey,
            ...params,
        });
    };
};

export const back = () => {
    return (dispatch, getState) => {
        dispatch(NavigationActions.back());
    };
};

export const openDrawer = () => {
    return (dispatch, getState) => {
        dispatch({
            type: NAVIGATION_OPEN_DRAWER,
        });
    };
};

export const closeDrawer = () => {
    return (dispatch, getState) => {
        dispatch({
            type: NAVIGATION_CLOSE_DRAWER,
        });
    };
};
