import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class NotificationManager {

    configure = (onOpenNotification) => {

        PushNotification.configure({
            onRegister: function(token) {
                // onRegister(token.token);
                console.log("[NotificationManager] onRegister Token: " + token);
            },

            onNotification: function (notification) {
                console.log("[NotificationManager] onNOTIFICATION:", notification);

                if (!notification?.data) {
                    return
                }
                notification.userInteraction = true;

                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data);

                if (Platform.OS === 'ios') {
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }

                // if(Platform.OS === 'ios') {
                //     if(notification.data.openedInForeground) {
                //         notification.userInteraction = true;
                //     }
                // }

                // if(notification.userInteraction) {
                //     onOpenNotification(notification)
                // } else {
                //     onNotification(notification)
                // }

            //     if(Platform.OS === 'android') {
            //         notification.userInteraction = true;
            //     }
                
            //     //Only call callback 
            //     if(Platform.OS === 'ios') {
            //         if(!notification.data.openedInForeground) {
            //             notification.finish('backgroundFetchResultNoData')
            //         }
            //     } else {
            //         notification.finish('backgroundFetchResultNoData')
            //     }
            // },

            // senderID: senderID,

        },
        // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
            * (optional) default: true
            * - Specified if permissions (ios) and token (android and ios) will requested or not,
            * - if not, you must call PushNotificationsHandler.requestPermissions() later
            * - if you are not using remote notification or do not have Firebase installed, use this:
            *     requestPermissions: Platform.OS === 'ios'
            */
            requestPermissions: true,
        })
    }

    unRegister = () => {
        PushNotification.unregister();
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android only properties */
            ...this._buildAndroidNotification(id, title, message, data, options),
            /* iOS only properties */
            ...this._buildIOSNotification(id, title, message, data, options),
            /* IOS and Android properties */
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false, // If the notification was opened by the user from the notification area or not
        })
    }
    
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return{
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data,
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || "view",
            category: options.category || "",
            userInfo: {
                id: id,
                item: data,
            }
        }
    }

    cancelAllLocalNotification = () => {
        if(Platform.OS === 'ios'){
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    }

    removeAllDeliveredNotificationsById = (notificationId) => {
        console.log("[NotificationManager] removeAllDeliveredNotificationsById: ", notificationId);
        PushNotification.cancelAllLocalNotifications({id: `${notificationId}`})
    }
}

export  const notificationManager = new NotificationManager();