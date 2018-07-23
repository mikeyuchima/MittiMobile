import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {
    reduxifyNavigator,
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import SCENES from 'scenes';

const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const LoginStack = createStackNavigator(
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
});

const AuthStack = createSwitchNavigator(
    {
        splash: SCENES.splash,
        main: MainStack,
        login: LoginStack,
    },
    {
        initialRouteName: SCENES.splash.key,
    }
);

const RootNavigator = createStackNavigator(
    {
        AuthStack,
    },
    {
        headerMode: 'none',
    }
);

const navReducer = createNavigationReducer(RootNavigator);

const RootWithNavigationState = reduxifyNavigator(RootNavigator, 'root');
const mapStateToProps = state => ({
    state: state.nav,
});
const AppNavigator = connect(mapStateToProps)(RootWithNavigationState);

export { navReducer, navigationMiddleware, AppNavigator };
