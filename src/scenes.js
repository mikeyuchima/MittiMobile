import React, { Component } from 'react';

// components
// import Boilerplate from './scenes/Boilerplate';
import Login from './scenes/Login';
import ForgotPassword from './scenes/ForgotPassword';
import CreateAccount from './scenes/CreateAccount';
// import Tour from './scenes/Tour';
import Home from './scenes/Home';
// import Community from './scenes/Community';
// import Marketplace from './scenes/Marketplace';
// import MyPosts from './scenes/MyPosts';
// import CreatePost from './scenes/CreatePost';
// import ViewPost from './scenes/ViewPost';
// import CreateQuestion from './scenes/CreateQuestion';
// import Chat from './scenes/Chat';
// import MessageCenter from './scenes/MessageCenter';
// import ScheduleCenter from './scenes/ScheduleCenter';
// import Profile from './scenes/Profile';
// import Settings from './scenes/Settings';
// import PrivacyPolicy from './scenes/PrivacyPolicy';
// import TermsConditions from './scenes/TermsConditions';
import Splash from './scenes/Splash';
// import NavigationDrawerContainer from './modules/navigation/NavigationDrawerContainer';

export default const SCENES = {
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
    // tour: {
    //     key: 'tour',
    //     component: Tour,
    //     initial: false,
    //     hideNavBar: true,
    // },
    home: {
        key: 'home',
        screen: Home,
        path: 'home',
    },
    // profile: {
    //     key: 'profile',
    //     component: Profile,
    //     initial: false,
    //     hideNavBar: false,
    // },
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
    // createQuestion: {
    //     key: 'createQuestion',
    //     component: CreateQuestion,
    //     initial: false,
    //     hideNavBar: true,
    // },
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
