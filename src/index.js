import {
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
} from 'react-navigation';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import React from 'react';

// store
// import configureStore from "./store/configureStore";

import SCENES from './scenes';
import SideMenuContainer from './modules/navigation/SideMenuContainer';
import AppContainer from './modules/app/AppContainer';

const UnAuthenticatedStack = createStackNavigator(
    {
        login: SCENES.login,
        createAccount: SCENES.createAccount,
        forgotPassword: SCENES.forgotPassword,
    },
    {
        headerMode: 'none',
    }
);

const MainStack = createStackNavigator({
    home: SCENES.home,
    profile: SCENES.profile,
    createQuestion: SCENES.createQuestion,
    // community: SCENES.community,
    messageCenter: SCENES.messageCenter,
    marketplace: SCENES.marketplace,
    viewPost: SCENES.viewPost,
    scheduleCenter: SCENES.scheduleCenter,
    myPosts: SCENES.myPosts,
    settings: SCENES.settings,
    chat: SCENES.chat,
    privacyPolicy: SCENES.privacyPolicy,
    termsConditions: SCENES.termsConditions,
});

const DrawerNavigator = createDrawerNavigator(
    {
        Main: {
            screen: MainStack,
        },
    },
    {
        contentComponent: SideMenuContainer,
    }
);

const AuthFlowStack = createSwitchNavigator(
    {
        splash: SCENES.splash,
        authenticated: DrawerNavigator,
        unauthenticated: UnAuthenticatedStack,
    },
    {
        initialRouteName: 'splash',
    }
);

const RootNavigator = createStackNavigator(
    {
        AuthFlowStack,
        tour: SCENES.tour,
        createPost: SCENES.createPost,
    },
    {
        headerMode: 'none',
    }
);

const AppNavigator = RootNavigator;

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
    nav: navReducer,
});

// Note: createReactNavigationReduxMiddleware must be run before createReduxContainer
const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const App = createReduxContainer(AppNavigator);
const mapStateToProps = state => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

// const store = configureStore();
const store = createStore(appReducer, applyMiddleware(middleware, thunk));

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer>
                    <AppWithNavigationState />
                </AppContainer>
            </Provider>
        );
    }
}
