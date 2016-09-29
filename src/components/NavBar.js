
import React, { Component } from 'react';
import {
   AlertIOS,
   Text,
   View,
   StyleSheet,
   PushNotificationIOS
} from 'react-native';

import s from '../modules/Style.js';
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from 'react-native-navbar';

export default class NavBar extends Component {
   constructor(props) {
      super(props);
      this.state = {

      };
   }
   componentDidMount(){
      PushNotificationIOS.addEventListener('register', this._onRegistered);
      // PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);
      PushNotificationIOS.addEventListener('notification', this._onRemoteNotification);
      PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
      PushNotificationIOS.requestPermissions();

   }
   componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register', this._onRegistered);
    //PushNotificationIOS.removeEventListener('registrationError', this._onRegistrationError);
    PushNotificationIOS.removeEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
  }
  testPush(){
     console.log("test push");
     this._sendNotification();
     PushNotificationIOS.addEventListener('register', function(token){
        console.log("hey");
        console.log('You are registered and the device token is: ',token)
     });

     PushNotificationIOS.addEventListener('notification', function(notification){
       console.log('You have received a new notification!', notification);
      });
 }
  _sendNotification() {
    //this._showPermissions();
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
      aps: {
        alert: 'Sample notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }
  _sendLocalNotification() {
     require('RCTDeviceEventEmitter').emit('localNotificationReceived', {
       aps: {
         alert: 'Sample local notification',
         badge: '+1',
         sound: 'default',
         category: 'REACT_NATIVE'
       },
     });
   }
   _onRegistered(deviceToken) {
    AlertIOS.alert(
      'Registered For Remote Push',
      `Device Token: ${deviceToken}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onRegistrationError(error) {
    AlertIOS.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onRemoteNotification(notification) {
    AlertIOS.alert(
      'Quiz Alert',
      'Please take 30 seconds to finish the quiz - ' + notification.getMessage(),
      [{
        text: 'Take Quiz',
        onPress: null,
      }]
    );
  }

  _onLocalNotification(notification){
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
  _showPermissions() {
     console.log("working...");
     PushNotificationIOS.checkPermissions((permissions) => {
       this.setState({permissions});
     });
   }


   render(){
      var pr = this.props;
      var st = this.state;
      var rightButtonConfig = {
         title: '=',
         tintColor: 'white',
         handler: this.testPush.bind(this),//() => alert('Coming soon..'),
      };
      var leftButtonConfig = {
         title: 'Back',
         tintColor: 'white',
         handler: pr.back,
      };

      var titleConfig = {
         title: pr.title,
         tintColor: 'white'
      };
      var statusBarConfig = {
         style: 'light-content',
         hidden: false,
         tintColor: '#32D7EF',
         showAnimation: 'slide',
         hideAnimation: 'slide'
      };
      return(
         <View style={styles.container}>
            <NavigationBar
               style={styles.navBar}
               title={titleConfig}
               statusBar={statusBarConfig}
               rightButton={rightButtonConfig}
               leftButton={leftButtonConfig}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   navBar: {
      borderTopWidth: 0,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      // iOS styles:
      backgroundColor: '#32D7EF',
      height: 44,
      paddingLeft: 8,
      paddingRight: 8,
   }
});
