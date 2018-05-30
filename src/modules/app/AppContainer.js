import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ENVIRONMENT, ONESIGNAL_APP_ID } from '../../../config';

// constants
import { DEFAULT_LOCALE } from '../../constants/constants';

// components
import Routes from '../../routes.js';

// actions
import { setDefaultRadius } from '../radius/radiusActions';
import { changeScene, refreshScene } from '../../modules/navigation/navigationActions.js';
import { findUnreadMessages } from '../../modules/unreadMessages/unreadMessagesActions.js';
import { onMessage } from './appActions';

// i18n
import { setLocale } from '../../i18n';

// other
import OneSignal from 'react-native-onesignal';
import { SCENES } from '../../routes';
import moment from 'moment';
import { NOTIFICATION_TYPES } from '../../constants/constants';

// OneSignal config
OneSignal.enableVibrate(true); // Android only
OneSignal.enableSound(true); // Android only
OneSignal.inFocusDisplaying(0); // No (0), Show alert (1), Show notification (2)

class AppContainer extends Component {
    static propTypes = {
        // other module states
        me: PropTypes.object,
        onMessage: PropTypes.func.isRequired,
    };

    componentWillMount() {
        OneSignal.init(ONESIGNAL_APP_ID);

        OneSignal.addEventListener('received', this._oneSignalOnReceived);
        OneSignal.addEventListener('opened', this._oneSignalOnOpened);
        // OneSignal.addEventListener('registered', this._oneSignalOnRegistered);
        OneSignal.addEventListener('ids', this._oneSignalOnIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this._oneSignalOnReceived);
        OneSignal.removeEventListener('opened', this._oneSignalOnOpened);
        // OneSignal.removeEventListener('registered', this._oneSignalOnRegistered);
        OneSignal.removeEventListener('ids', this._oneSignalOnIds);
    }

    componentDidMount() {
        // this._oneSignalSetup(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.me === null && nextProps.me) {
            this.props.findUnreadMessages();
            this._oneSignalSetup(nextProps);
            setLocale(nextProps.me.settings.locale || DEFAULT_LOCALE);
            this.props.setDefaultRadius(
                nextProps.me.settings.defaultRadius,
                nextProps.me.settings.radiusUnit
            );
        }
    }

    render() {
        return <Routes me={this.props.me} />;
    }

    _oneSignalSetup = props => {
        if (props.me) {
            OneSignal.sendTag('userId', props.me.id.toString());
            OneSignal.sendTag('environment', ENVIRONMENT);
        }
    };

    _oneSignalOnReceived = notification => {
        this._openNotification(notification, true);
    };

    _oneSignalOnOpened = openResult => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        this._openNotification(notification, false);
    };

    // _oneSignalOnRegistered = notifData => {
    //     console.log('Device had been registered for push notifications!', notifData);
    // };

    _oneSignalOnIds = device => {
        console.log('Device info: ', device);
    };

    _openNotification = (notification, insideApp) => {
        const {
            findUnreadMessages,
            currentSceneKey,
            refreshScene,
            changeScene,
            onMessage,
        } = this.props;

        console.log('Notification received: ', notification);

        // @NOTE: notification example
        // {
        //     shown: true, // BOOLEAN: If the notification was displayed to the user or not
        //     payload: {notificationID : "", contentAvailable : false, badge : 1, sound : "default", title : "Hello!", body : "World", launchURL : "", }, // OBJECT; the push data
        //     displayType: 1, //The display method of a received notification
        //     silentNotification: false // BOOLEAN : Wether the received notification was a silent one
        // }

        if (notification.payload.additionalData.hasOwnProperty('type')) {
            switch (notification.payload.additionalData.type) {
                case NOTIFICATION_TYPES.chatMessage:
                case NOTIFICATION_TYPES.chatSchedule:
                case NOTIFICATION_TYPES.chatScheduleAccepted:
                case NOTIFICATION_TYPES.chatScheduleRejected:
                    findUnreadMessages();
                    if (notification.payload.additionalData.hasOwnProperty('chatId')) {
                        const params = {
                            navigationParams: {
                                itemId: notification.payload.additionalData.postId,
                                chatId: notification.payload.additionalData.chatId,
                                refreshTimestamp: new Date().getTime(),
                            },
                        };
                        if (currentSceneKey === SCENES.chat.key) {
                            refreshScene(SCENES.chat.key, params);
                        } else {
                            if (insideApp) {
                                onMessage('You just received a new message', () => {
                                    changeScene(SCENES.chat.key, params);
                                });
                            } else {
                                changeScene(SCENES.chat.key, params);
                            }
                        }
                    }

                    break;
                case NOTIFICATION_TYPES.answer:
                    if (notification.payload.additionalData.hasOwnProperty('questionId')) {
                        const params = {
                            navigationParams: {
                                questionId: notification.payload.additionalData.questionId,
                                refreshTimestamp: new Date().getTime(),
                            },
                        };

                        if (insideApp) {
                            onMessage('You just received a new answer', () => {
                                changeScene(SCENES.community.key, params);
                            });
                        } else {
                            changeScene(SCENES.community.key, params);
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
        currentSceneKey: state.navigation.scene.sceneKey,

        // other module states
        me: state.me.me,
    };
}

export default connect(mapStateToProps, {
    findUnreadMessages,
    changeScene,
    refreshScene,
    setDefaultRadius,
    onMessage,
})(AppContainer);
