import { NavigationActions, StackActions, DrawerActions } from 'react-navigation';

export const changeScene = (routeName, params = {}, type = 'PUSH') => {
    return (dispatch, getState) => {
        // check type
        switch (type) {
            default:
                dispatch(
                    NavigationActions.navigate({
                        routeName,
                        params,
                        key: routeName,
                    })
                );
        }
    };
};

export const resetScene = (routeName, params = {}) => {
    console.log('resetting scene')
    return (dispatch, getState) => {
        dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName, params })],
            })
        );
    };
};

export const refreshScene = (routeName, params = {}, redirectRoute) => {
    console.log('refreshing scene')
    return (dispatch, getState) => {
        dispatch(
            StackActions.replace({
                // index: 0,
                // key: string;
                routeName,
                params,
                actions: [NavigationActions.navigate({ redirectRoute })],
            })
        );
    };
};

export const setParams = (key, params = {}) => {
    return (dispatch, getState) => {
        dispatch(
            NavigationActions.setParams({
                key,
                params,
            })
        );
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

export const toggleDrawer = navigation => {
    return (dispatch, getState) => {
        dispatch(
            NavigationActions.setParams({
                key: 'authenticated',
                params: {
                    sceneKey: navigation.routeName,
                },
            })
        );
        dispatch(DrawerActions.toggleDrawer());
    };
};
