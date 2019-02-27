// components
// import Boilerplate from './scenes/Boilerplate';
import Login from './scenes/Login';
import ForgotPassword from './scenes/ForgotPassword';
import CreateAccount from './scenes/CreateAccount';
import Tour from './scenes/Tour';
import Home from './scenes/Home';
// import Community from './scenes/Community';
import Marketplace from './scenes/Marketplace';
import MyPosts from './scenes/MyPosts';
import CreatePost from './scenes/CreatePost';
import ViewPost from './scenes/ViewPost';
import CreateQuestion from './scenes/CreateQuestion';
import Chat from './scenes/Chat';
import MessageCenter from './scenes/MessageCenter';
import ScheduleCenter from './scenes/ScheduleCenter';
import Profile from './scenes/Profile';
import Settings from './scenes/Settings';
import PrivacyPolicy from './scenes/PrivacyPolicy';
import TermsConditions from './scenes/TermsConditions';
import Splash from './scenes/Splash';
// import NavigationDrawerContainer from './modules/navigation/NavigationDrawerContainer';

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
    settings: {
        key: 'settings',
        screen: Settings,
        path: 'settings',
    },
    privacyPolicy: {
        key: 'privacyPolicy',
        screen: PrivacyPolicy,
        path: 'privacyPolicy',
    },
    termsConditions: {
        key: 'termsConditions',
        screen: TermsConditions,
        path: 'termsConditions',
    },
    // community: {
    //     key: 'community',
    //     screen: Community,
    //     path: 'community',
    // },
    marketplace: {
        key: 'marketplace',
        screen: Marketplace,
        path: 'marketplace',
    },
    myPosts: {
        key: 'myPosts',
        screen: MyPosts,
        path: 'myPosts',
    },
    createPost: {
        key: 'createPost',
        screen: CreatePost,
        path: 'createPost',
    },
    viewPost: {
        key: 'viewPost',
        screen: ViewPost,
        path: 'viewPost',
    },
    createQuestion: {
        key: 'createQuestion',
        screen: CreateQuestion,
        path: 'createQuestion',
    },
    chat: {
        key: 'chat',
        screen: Chat,
        path: 'chat',
    },
    messageCenter: {
        key: 'messageCenter',
        screen: MessageCenter,
        path: 'messageCenter',
    },
    scheduleCenter: {
        key: 'scheduleCenter',
        screen: ScheduleCenter,
        path: 'scheduleCenter',
    },
};

export default SCENES;
