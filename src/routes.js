import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
} from 'react-navigation';
import {
    reduxifyNavigator,
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

// components
// import Boilerplate from './scenes/Boilerplate';
import Login from './scenes/Login';
import ForgotPassword from './scenes/ForgotPassword';
import CreateAccount from './scenes/CreateAccount';
import Tour from './scenes/Tour';
import Home from './scenes/Home';
// import Community from './scenes/Community';
// import Marketplace from './scenes/Marketplace';
// import MyPosts from './scenes/MyPosts';
// import CreatePost from './scenes/CreatePost';
// import ViewPost from './scenes/ViewPost';
import CreateQuestion from './scenes/CreateQuestion';
// import Chat from './scenes/Chat';
// import MessageCenter from './scenes/MessageCenter';
// import ScheduleCenter from './scenes/ScheduleCenter';
import Profile from './scenes/Profile';
// import Settings from './scenes/Settings';
// import PrivacyPolicy from './scenes/PrivacyPolicy';
// import TermsConditions from './scenes/TermsConditions';
import Splash from './scenes/Splash';
// import NavigationDrawerContainer from './modules/navigation/NavigationDrawerContainer';
import SideMenuContainer from './modules/navigation/SideMenuContainer';

const SCENES = {
    /*
  boilerplate: {
    key: 'boilerplate',
    component: Boilerplate,
    initial: false,
    hideNavBar: false,
  },
  */
    splash: {
        key: 'splash',
        screen: Splash,
        path: 'splash',
    },
    login: {
        key: 'login',
        screen: Login,
        path: 'login',
    },
    forgotPassword: {
        key: 'forgotPassword',
        screen: ForgotPassword,
        path: 'forgotPassword',
    },
    createAccount: {
        key: 'createAccount',
        screen: CreateAccount,
        path: 'createAccount',
    },
    tour: {
        key: 'tour',
        screen: Tour,
        path: 'tour',
    },
    home: {
        key: 'home',
        screen: Home,
        path: 'home',
    },
    profile: {
        key: 'profile',
        screen: Profile,
        path: 'profile',
    },
    // settings: {
    //     key: 'settings',
    //     component: Settings,
    //     initial: false,
    //     hideNavBar: false,
    // },
    // privacyPolicy: {
    //     key: 'privacyPolicy',
    //     component: PrivacyPolicy,
    //     initial: false,
    //     hideNavBar: false,
    // },
    // termsConditions: {
    //     key: 'termsConditions',
    //     component: TermsConditions,
    //     initial: false,
    //     hideNavBar: false,
    // },
    // community: {
    //     key: 'community',
    //     component: Community,
    //     initial: false,
    //     hideNavBar: false,
    // },
    // marketplace: {
    //     key: 'marketplace',
    //     component: Marketplace,
    //     initial: false,
    //     hideNavBar: false,
    // },
    // myPosts: {
    //     key: 'myPosts',
    //     component: MyPosts,
    //     initial: false,
    //     hideNavBar: false,
    // },
    // createPost: {
    //     key: 'createPost',
    //     component: CreatePost,
    //     initial: false,
    //     hideNavBar: true,
    // },
    // viewPost: {
    //     key: 'viewPost',
    //     component: ViewPost,
    //     initial: false,
    //     hideNavBar: false,
    // },
    createQuestion: {
        key: 'createQuestion',
        screen: CreateQuestion,
        path: 'createQuestion',
    },
    // chat: {
    //     key: 'chat',
    //     component: Chat,
    //     initial: false,
    //     hideNavBar: false,
    // },
    // messageCenter: {
    //     key: 'messageCenter',
    //     component: MessageCenter,
    //     initial: false,
    //     hideNavBar: false,
    // },
    // scheduleCenter: {
    //     key: 'scheduleCenter',
    //     component: ScheduleCenter,
    //     initial: false,
    //     hideNavBar: false,
    // },
};

const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

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

const AuthenticatedStack = createStackNavigator({
    home: SCENES.home,
    profile: SCENES.profile,
    createQuestion: SCENES.createQuestion,
});

const DrawerNavigator = createDrawerNavigator(
    {
        Authenticated: {
            screen: AuthenticatedStack,
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
