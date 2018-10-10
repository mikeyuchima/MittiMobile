import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ENVIRONMENT, ONESIGNAL_APP_ID } from '../../../config';

// constants
import { DEFAULT_LOCALE } from '../../constants/constants';

// actions
import { setDefaultRadius } from '../radius/radiusActions';
import { changeScene, refreshScene } from '../../modules/navigation/navigationActions.js';
import { findUnreadMessages } from '../../modules/unreadMessages/unreadMessagesActions.js';
import { onMessage } from './appActions';

// i18n
import { setLocale } from '../../i18n';

// other
import OneSignal from 'react-native-onesignal';

import moment from 'moment';
import { NOTIFICATION_TYPES } from '../../constants/constants';

class AppContainer extends Component {
    static propTypes = {
        // other module states
        me: PropTypes.object,
        onMessage: PropTypes.func.isRequired,
    };

    componentWillMount() {
        // OneSignal config
        OneSignal.init(ONESIGNAL_APP_ID);
        OneSignal.enableVibrate(true); // Android only
        OneSignal.enableSound(true); // Android only
        OneSignal.inFocusDisplaying(1); // No (0), Show alert (1), Show notification (2)
        OneSignal.setLogLevel(6, 0);

        OneSignal.addEventListener('received', this._oneSignalOnReceived);
        OneSignal.addEventListener('opened', this._oneSignalOnOpened);
        OneSignal.addEventListener('ids', this._oneSignalOnIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this._oneSignalOnReceived);
        OneSignal.removeEventListener('opened', this._oneSignalOnOpened);
        OneSignal.removeEventListener('ids', this._oneSignalOnIds);
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (this.props.me === null && nextProps.me && nextProps.me.settings) {
            this.props.findUnreadMessages();
            // this._oneSignalSetup(nextProps);
            setLocale(nextProps.me.settings.locale || DEFAULT_LOCALE);
            this.props.setDefaultRadius(
                nextProps.me.settings.defaultRadius,
                nextProps.me.settings.radiusUnit
            );
        }
    }

    render() {
        return this.props.children;
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

    _oneSignalOnIds = device => {
        console.log('Device info: ', device);
    };

    _openNotification = (notification, insideApp) => {
        const { findUnreadMessages, refreshScene, changeScene, onMessage } = this.props;

        console.log('Notification received: ', notification);

        // @NOTE: notification example
        // {
        //     shown: true, // BOOLEAN: If the notification was displayed to the user or not
        //     payload: {notificationID : "", contentAvailable : false, badge : 1, sound : "default", title : "Hello!", body : "World", launchURL : "", }, // OBJECT; the push data
        //     displayType: 1, //The display method of a received notification
        //     silentNotification: false // BOOLEAN : Wether the received notification was a silent one
        // }

        if (
            notification.payload.additionalData &&
            notification.payload.additionalData.hasOwnProperty('type')
        ) {
            switch (notification.payload.additionalData.type) {
                case NOTIFICATION_TYPES.chatMessage:
                case NOTIFICATION_TYPES.chatSchedule:
                case NOTIFICATION_TYPES.chatScheduleAccepted:
                case NOTIFICATION_TYPES.chatScheduleRejected:
                    findUnreadMessages();
                    if (notification.payload.additionalData.hasOwnProperty('chatId')) {
                        const params = {
                            itemId: notification.payload.additionalData.postId,
                            chatId: notification.payload.additionalData.chatId,
                            refreshTimestamp: new Date().getTime(),
                        };
                        if (this.props.navigation.state.routeName === 'chat') {
                            refreshScene('chat', params);
                        } else {
                            if (insideApp) {
                                onMessage('You just received a new message', () => {
                                    changeScene('chat', params);
                                });
                            } else {
                                changeScene('chat', params);
                            }
                        }
                    }

                    break;
                case NOTIFICATION_TYPES.answer:
                    if (notification.payload.additionalData.hasOwnProperty('questionId')) {
                        const params = {
                            questionId: notification.payload.additionalData.questionId,
                            refreshTimestamp: new Date().getTime(),
                        };

                        if (insideApp) {
                            onMessage('You just received a new answer', () => {
                                changeScene('community', params);
                            });
                        } else {
                            changeScene('community', params);
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
    };
}

export default connect(
    mapStateToProps,
    {
        findUnreadMessages,
        changeScene,
        refreshScene,
        setDefaultRadius,
        onMessage,
    }
)(AppContainer);
