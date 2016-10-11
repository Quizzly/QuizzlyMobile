/**
 * Quizzly React Native App
 * Main
 * @keionanvari
 */

'use strict';
import React from 'react';
import {
  AlertIOS,
  Navigator,
  StyleSheet,
  AppRegistry,
  PushNotificationIOS
} from 'react-native';

import Entrance from './components/Entrance';
import Courses from './components/Courses';
import Course from './components/Course';
import Answers from './components/Answers';
import Questions from './components/Questions';
import QuestionsList from './components/QuestionsList';
import QuizzList from './components/QuizzList';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceID: null,
      permissions: null
   };
  }
  componentDidMount(){

    PushNotificationIOS.addEventListener('register', this._onRegistered.bind(this));
    //PushNotificationIOS.addEventListener('registrationError', this._onRegistrationError);
    PushNotificationIOS.addEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
    PushNotificationIOS.requestPermissions();
    this._showPermissions();

  }
  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register', this._onRegistered);
    //PushNotificationIOS.removeEventListener('registrationError', this._onRegistrationError);
    PushNotificationIOS.removeEventListener('notification', this._onRemoteNotification);
    PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
  }
  _showPermissions() {
     console.log("Checking Perms...");

     PushNotificationIOS.checkPermissions((permissions) => {
       this.setState({permissions});
       console.log('Perms: ', JSON.stringify(this.state.permissions));
     });

   }

  testPush(){
    console.log("test push");
    this._sendNotification();
  }

  _sendNotification() {
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
    console.log("OnRegistered_DeviceToken:", deviceToken);
    this.state.deviceID = deviceToken;

    //Handle creation of new installation{deviceToken, ios, userID}

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
        onPress: function(){
           console.log("Loading Quiz...");

           var question = {
             text: 'Test'
           };
         //   this.props.navigator.push({
         //     name: 'Questions',
         //     passProps: {course: 'this.props.course', title:this.props.course.title, state:this.state, question}
         //   });
        },
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


  renderScene(route, navigator) {
     var props = {};
     props.testPush = this.testPush.bind(this);
     props.deviceID = this.state.deviceID;
    switch (route.name) {
      case 'Entrance':
        return <Entrance {...props} navigator={navigator} {...route.passProps}  />
      case 'Courses':
        return <Courses {...props} navigator={navigator} {...route.passProps}  />
      case 'Course':
         return <Course {...props} navigator={navigator} {...route.passProps}  />
      case 'Answers':
        return <Answers navigator={navigator} {...route.passProps}  />
      case 'Questions':
        return <Questions navigator={navigator} {...route.passProps}  />
      case 'QuizzList':
        return <QuizzList navigator={navigator} {...route.passProps}  />
      case 'QuestionsList':
        return <QuestionsList navigator={navigator} {...route.passProps}  />
    }
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: 'Entrance' }}
        renderScene={ this.renderScene.bind(this) }
        configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
