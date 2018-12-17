import { combineReducers } from 'redux';
import loginScene from '../scenes/Login/loginReducer';
import forgotPasswordScene from '../scenes/ForgotPassword/forgotPasswordReducer';
import createAccountScene from '../scenes/CreateAccount/createAccountReducer';
import tourScene from '../scenes/Tour/tourReducer';
import homeScene from '../scenes/Home/homeReducer';
// import communityScene from '../scenes/Community/communityReducer';
import marketplaceScene from '../scenes/Marketplace/marketplaceReducer';
import myPostsScene from '../scenes/MyPosts/myPostsReducer';
import createPostScene from '../scenes/CreatePost/createPostReducer';
import viewPostScene from '../scenes/ViewPost/viewPostReducer';
import createQuestionScene from '../scenes/CreateQuestion/createQuestionReducer';
import chatScene from '../scenes/Chat/chatReducer';
import messageCenterScene from '../scenes/MessageCenter/messageCenterReducer';
import scheduleCenterScene from '../scenes/ScheduleCenter/scheduleCenterReducer';
import profileScene from '../scenes/Profile/profileReducer';
import auth from '../modules/auth/authReducer';
import app from '../modules/app/appReducer';
import me from '../modules/me/meReducer';
import radius from '../modules/radius/radiusReducer';
import currentLocation from '../modules/currentLocation/currentLocationReducer';
import map from '../modules/map/mapReducer';
import unreadMessages from '../modules/unreadMessages/unreadMessagesReducer';

import { navReducer } from '../routes';

export default combineReducers({
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
    // communityScene,
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
