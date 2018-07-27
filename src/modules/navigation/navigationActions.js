import { 
    NavigationActions, 
    StackActions,
    DrawerActions 
} from 'react-navigation';

export const changeScene = (routeName, params = {}, type = 'PUSH') => {
    return (dispatch, getState) => {
        dispatch(NavigationActions.navigate({ routeName, params }));
    };
};

export const refreshScene = (routeName, params = {}) => {
    return (dispatch, getState) => {
        dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName, params })],
        }));
    };
};

// export const refreshScene = (sceneKey, params = {}) => {
//     return (dispatch, getState) => {
//         Actions.refresh({
//             key: sceneKey,
//             ...params,
//         });
//     };
// };

export const back = () => {
    return (dispatch, getState) => {
        dispatch(NavigationActions.back());
    };
};

export const openDrawer = () => {
    return (dispatch, getState) => {
        dispatch(DrawerActions.openDrawer());
    };
};

export const closeDrawer = () => {
    return (dispatch, getState) => {
        dispatch(DrawerActions.closeDrawer());
    };
};

export const toggleDrawer = () => {
    return (dispatch, getState) => {
        dispatch(DrawerActions.toggleDrawer());
    };
};
