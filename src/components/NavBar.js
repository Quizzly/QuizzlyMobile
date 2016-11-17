
import React, { Component } from 'react';
import {
   AlertIOS,
   Text,
   View,
   StyleSheet,
   PushNotificationIOS, AppState
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

   testPush() { this._sendLocalNotification(); }

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

   render(){
      var pr = this.props;
      var st = this.state;
      var rightButtonConfig = {
         title: 'Push',
         tintColor: 'white',
         handler: this.testPush.bind(this),
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
         leftButton={this.props.hasBack ? leftButtonConfig : {}}
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
