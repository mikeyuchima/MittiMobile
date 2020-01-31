import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";
import { ENVIRONMENT, ONESIGNAL_APP_ID, DEBUG_MODE } from "../../../config";

// constants
import { DEFAULT_LOCALE } from "../../constants/constants";

// actions
import { setDefaultRadius } from "../radius/radiusActions";
import {
    changeScene,
    refreshScene,
    back
} from "../../modules/navigation/navigationActions.js";
import { findUnreadMessages } from "../../modules/unreadMessages/unreadMessagesActions.js";
import { onMessage } from "./appActions";
import { getMessages } from '../../scenes/Chat/chatActions';

// i18n
import { setLocale } from "../../i18n";

// other
import OneSignal from "react-native-onesignal";

import moment from "moment";
import { NOTIFICATION_TYPES } from "../../constants/constants";

class AppContainer extends Component {
    constructor(properties) {
        super(properties);
        OneSignal.init(ONESIGNAL_APP_ID);

        OneSignal.addEventListener("received", this._oneSignalOnReceived);
        OneSignal.addEventListener("opened", this._oneSignalOnOpened);
        OneSignal.addEventListener("ids", this._oneSignalOnIds);
    }

    static propTypes = {
        // other module states
        me: PropTypes.object,
        onMessage: PropTypes.func.isRequired,
        back: PropTypes.func.isRequired
    };

    componentWillUnmount() {
        OneSignal.removeEventListener("received", this._oneSignalOnReceived);
        OneSignal.removeEventListener("opened", this._oneSignalOnOpened);
        OneSignal.removeEventListener("ids", this._oneSignalOnIds);

        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    _oneSignalSetup = props => {
        if (props.me) {
            OneSignal.sendTag("userId", props.me.id.toString());
            OneSignal.sendTag("environment", ENVIRONMENT);
        }
    };

    _oneSignalOnReceived = notification => {
        this._openNotification(notification, true);
    };

    _oneSignalOnOpened = openResult => {
        // console.log("Message: ", openResult.notification.payload.body);
        // console.log("Data: ", openResult.notification.payload.additionalData);
        // console.log("isActive: ", openResult.notification.isAppInFocus);
        // console.log("openResult: ", openResult);

        this._openNotification(openResult.notification, false);
    };

    _oneSignalOnIds = device => {
        // console.log("Device info: ", device);
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    shouldComponentUpdate(nextProps) {
        if (DEBUG_MODE) {
            OneSignal.setLogLevel(6, 0);
        }

        // OneSignal.enableVibrate(true); // Android only
        // OneSignal.enableSound(true); // Android only
        OneSignal.inFocusDisplaying(0); // No (0), Show alert (1), Show notification (2)

        OneSignal.configure(); // triggers the ids event

        // OneSignal.getPermissionSubscriptionState((status) => {
        //     console.log(status);
        // });

        if (this.props !== nextProps) {
            if (
                this.props.me === null &&
                nextProps.me &&
                nextProps.me.settings
            ) {
                this._oneSignalSetup(nextProps);
                setLocale(nextProps.me.settings.locale || DEFAULT_LOCALE);
                this.props.setDefaultRadius(
                    nextProps.me.settings.defaultRadius,
                    nextProps.me.settings.radiusUnit
                );
            }
            return true;
        } else {
            return true;
        }
    }

    onBackPress = () => {
        const { nav } = this.props;
        const currentIndex = nav.routes["0"].routes[1].routes["0"].index;
        if (currentIndex === 0) return false;

        this.props.back();
        return true;
    };

    render() {
        return this.props.children;
    }

    _openNotification = (notification, insideApp) => {
        // console.log('props', this.props);
        // console.log('notification', notification)
        // console.log('insideApp', insideApp)
        const {
            findUnreadMessages,
            refreshScene,
            changeScene,
            onMessage,
            nav
        } = this.props;

        const {
            chatId,
            postId,
            type
        } = notification.payload.additionalData

        // console.log('Notification received: ', notification, '\n', 'insideApp:', insideApp);

        // @NOTE: notification example
        // {
        //     shown: true, // BOOLEAN: If the notification was displayed to the user or not
        //     payload: {notificationID : "", contentAvailable : false, badge : 1, sound : "default", title : "Hello!", body : "World", launchURL : "", }, // OBJECT; the push data
        //     displayType: 1, //The display method of a received notification
        //     silentNotification: false // BOOLEAN : Wether the received notification was a silent one
        // }

        if (
            notification.payload.additionalData &&
            notification.payload.additionalData.hasOwnProperty("type")
        ) {
            const currentIndex = nav.routes["0"].routes[1].routes["0"].index;
            const routes = nav.routes["0"].routes[1].routes["0"].routes;

            switch (type) {
                case NOTIFICATION_TYPES.chatMessage:
                    console.log('chatMessage')
                    getMessages(postId, chatId);
                case NOTIFICATION_TYPES.chatSchedule:
                case NOTIFICATION_TYPES.chatScheduleAccepted:
                case NOTIFICATION_TYPES.chatScheduleRejected:
                    findUnreadMessages();
                    if (
                        notification.payload.additionalData.hasOwnProperty(
                            "chatId"
                        )
                    ) {
                        const params = {
                            itemId: notification.payload.additionalData.postId,
                            chatId: notification.payload.additionalData.chatId,
                            refreshTimestamp: new Date().getTime()
                        };
                        if (routes[currentIndex].routeName === "chat") {
                            // refreshScene("chat", params);
                        } else {
                            // refreshScene(routes[currentIndex].routeName, params)
                            if (insideApp) {
                                onMessage(
                                    "You just received a new message",
                                    () => {
                                        changeScene("chat", params);
                                    },
                                    "VIEW"
                                );
                            } else {
                                changeScene("chat", params);
                            }
                        }
                    }

                    break;
                case NOTIFICATION_TYPES.answer:
                    if (
                        notification.payload.additionalData.hasOwnProperty(
                            "questionId"
                        )
                    ) {
                        const params = {
                            questionId:
                                notification.payload.additionalData.questionId,
                            refreshTimestamp: new Date().getTime()
                        };

                        if (insideApp) {
                            onMessage(
                                "NOTIFICATION_TYPES.answer: You just received a new answer",
                                () => {
                                    changeScene("community", params);
                                }
                            );
                        } else {
                            changeScene("community", params);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    };
}

function mapStateToProps(state) {
    return {
        // states
        ...state.app,

        // other module states
        me: state.me.me,
        nav: state.nav
    };
}

export default connect(
    mapStateToProps,
    {
        getMessages,
        findUnreadMessages,
        changeScene,
        refreshScene,
        setDefaultRadius,
        onMessage,
        back
    }
)(AppContainer);
