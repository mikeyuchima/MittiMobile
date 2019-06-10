import React, { Component } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer,
} from "react-navigation";
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from "react-navigation-redux-helpers";

import SCENES from "./scenes";

//MODULES
import auth from "./modules/auth/authReducer";
import app from "./modules/app/appReducer";
import me from "./modules/me/meReducer";
import radius from "./modules/radius/radiusReducer";
import currentLocation from "./modules/currentLocation/currentLocationReducer";
import map from "./modules/map/mapReducer";
import unreadMessages from "./modules/unreadMessages/unreadMessagesReducer";
import SideMenuContainer from "./modules/navigation/SideMenuContainer";
import AppContainer from "./modules/app/AppContainer";

//COMPONENTS
import loginScene from "./scenes/Login/loginReducer";
import forgotPasswordScene from "./scenes/ForgotPassword/forgotPasswordReducer";
import createAccountScene from "./scenes/CreateAccount/createAccountReducer";
import tourScene from "./scenes/Tour/tourReducer";
import homeScene from "./scenes/Home/homeReducer";
import communityScene from "./scenes/Community/communityReducer";
import marketplaceScene from "./scenes/Marketplace/marketplaceReducer";
import myPostsScene from "./scenes/MyPosts/myPostsReducer";
import createPostScene from "./scenes/CreatePost/createPostReducer";
import viewPostScene from "./scenes/ViewPost/viewPostReducer";
import createQuestionScene from "./scenes/CreateQuestion/createQuestionReducer";
import chatScene from "./scenes/Chat/chatReducer";
import messageCenterScene from "./scenes/MessageCenter/messageCenterReducer";
import scheduleCenterScene from "./scenes/ScheduleCenter/scheduleCenterReducer";
import profileScene from "./scenes/Profile/profileReducer";

// import { createLogger } from 'redux-logger';
// import rootReducer from './reducers';
// import { DEBUG_MODE } from './../config';

const UnAuthenticatedStack = createStackNavigator(
  {
    login: SCENES.login,
    createAccount: SCENES.createAccount,
    forgotPassword: SCENES.forgotPassword,
  },
  {
    headerMode: "none",
  },
);

const MainStack = createStackNavigator({
  home: SCENES.home,
  profile: SCENES.profile,
  createQuestion: SCENES.createQuestion,
  community: SCENES.community,
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
const MainStackApp = createAppContainer(MainStack);
const DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: MainStackApp,
    },
  },
  {
    contentComponent: SideMenuContainer,
    // drawerWidth: 50,
  },
);

const AuthFlowStack = createSwitchNavigator(
  {
    splash: SCENES.splash,
    authenticated: DrawerNavigator,
    unauthenticated: UnAuthenticatedStack,
  },
  {
    initialRouteName: "splash",
  },
);

const RootNavigator = createStackNavigator(
  {
    AuthFlowStack,
    tour: SCENES.tour,
    createPost: SCENES.createPost,
  },
  {
    headerMode: "none",
  },
);

const AppNavigator = RootNavigator;

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  auth,
  app,
  me,
  // navigation,
  radius,
  currentLocation,
  map,
  unreadMessages,
  loginScene,
  forgotPasswordScene,
  createAccountScene,
  tourScene,
  homeScene,
  communityScene,
  marketplaceScene,
  myPostsScene,
  createPostScene,
  viewPostScene,
  createQuestionScene,
  chatScene,
  messageCenterScene,
  scheduleCenterScene,
  profileScene,
});

// Note: createReactNavigationReduxMiddleware must be run before createReduxContainer
const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const App = createReduxContainer(AppNavigator);
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, applyMiddleware(middleware, thunk));

export default class Main extends Component {
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
