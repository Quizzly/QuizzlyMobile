import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage, PushNotificationIOS, AlertIOS
} from 'react-native';

import s from '../modules/Style.js';
import Objects from '../modules/Objects.js';
import Api from '../modules/Api.js';
import HorizontalLine from '../elements/HorizontalLine';
import LinearGradient from 'react-native-linear-gradient';
//import CountDown from 'react-native-countdown';

export default class Entrance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'j@gmail.com',
      password: 'test',
      firstName: 'Joe',
      lastName: 'Biden',
      isSignUp: false
    };
  }

  componentDidMount(){
     Api.server.find("student")
     .then((students) => {
       this.setState({student: students[0]})
     })
    PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification.bind(this));
    PushNotificationIOS.addEventListener('notification', this._onRemoteNotification.bind(this));
  }
  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification.bind(this));
    PushNotificationIOS.removeEventListener('notification', this._onRemoteNotification.bind(this));
  }

  _onLocalNotification(notification){
    var pr = this.props;
    var st = this.state;
    AlertIOS.alert(
     'Local Notification Received',
     'Alert message: ' + notification.getMessage(),
     [
        { text: 'Take Quiz',  onPress: function takeQuiz() {
           Api.server.post('question/getopenquestion', {questionKey: notification.questionKey})
           .then((question) => {
             console.log("question -!!!! ::: ", question);
             pr.navigator.push({
                name: 'Questions',
                passProps: {state:this.state, notification, question}
             });
           });
     }},
      { text: 'Cancel',     }
     ]
    );
  }

  _onRemoteNotification(notification) {
    var pr = this.props;
    var st = this.state;

    AlertIOS.alert(
    'Quiz Alert',
    'Please take 30 seconds to finish the quiz - ' + notification.getMessage(),
    [
      { text: 'Take Quiz',  onPress: function takeQuiz() {
         var question = {
             "answers": [
               {
                 "option": "A",
                 "text": "String stuff",
                 "correct": false,
                 "question": "57c4d01d21cb2133112c0870",
                 "createdAt": "2016-08-30T00:15:25.449Z",
                 "updatedAt": "2016-08-30T00:15:25.449Z",
                 "id": "57c4d01d21cb2133112c0871"
               },
               {
                 "option": "B",
                 "text": "Needle through the eye",
                 "correct": true,
                 "question": "57c4d01d21cb2133112c0870",
                 "createdAt": "2016-08-30T00:15:25.450Z",
                 "updatedAt": "2016-08-30T00:15:25.450Z",
                 "id": "57c4d01d21cb2133112c0872"
               },
               {
                 "option": "C",
                 "text": "Masterfully sad",
                 "correct": false,
                 "question": "57c4d01d21cb2133112c0870",
                 "createdAt": "2016-08-30T00:15:25.450Z",
                 "updatedAt": "2016-08-30T00:15:25.450Z",
                 "id": "57c4d01d21cb2133112c0873"
              },
              {
                "option": "D",
                "text": "Random choice",
                "correct": false,
                "question": "57c4d01d21cb2133112c0870",
                "createdAt": "2016-08-30T00:15:25.450Z",
                "updatedAt": "2016-08-30T00:15:25.450Z",
                "id": "57c4d01d21cb2133112c0873"
              }
             ],
             "quiz": {
               "title": "Threading",
               "course": "57c4cf2821cb2133112c0867",
               "createdAt": "2016-08-30T00:13:23.793Z",
               "updatedAt": "2016-08-30T00:15:01.907Z",
               "id": "57c4cfa321cb2133112c086b"
             },
             "text": "What is threading?",
             "type": "multipleChoice",
             "duration": 30,
             "createdAt": "2016-08-30T00:15:25.443Z",
             "updatedAt": "2016-08-30T00:15:25.445Z",
             "id": "57c4d01d21cb2133112c0870"
            };
         console.log('Notification!!!:::: ', notification);
         console.log("question -!!!! ::: ", question);

         pr.navigator.push({
            name: 'Questions',
            passProps: {state:this.state, notification, question}
         });

      }},
      { text: 'Cancel',     }
    ]
    );
  }

  enterQuizzly() {
    // TODO: must add this back in
    if(this.state.isSignUp) {
      this.signUp();
    } else {
      this.signIn();
    }
  }

  signUp() {
    var st = this.state;
    var pr = this.props;

    var DeviceInfo = require('react-native-device-info');

    var mobile = {
      deviceId: '69',
      type: DeviceInfo.getManufacturer() == 'Apple' ? 'ios' : 'android'
    };

    var user = {
      email: st.email,
      password: st.password,
      firstName: st.firstName,
      lastName: st.lastName,
      mobile: pr.installation
    };
    console.log('User  :::: ', user);

    Api.server.post('signup', user)
     .then((user) => {
        Api.server.post('login',user)
        .then((loginResponse)=>{
           console.log("loginResponse.token", loginResponse.jwt);
           AsyncStorage.setItem('token',JSON.stringify(loginResponse));
           console.log("after set up loginResponse.token", loginResponse.jwt);
         if(loginResponse.jwt == undefined){
            console.log("The sign up isn't successful");
         }else{
            console.log("Right before the goToCourses");
            this.goToCourses(this.state); // just for testing
            // this.goToCourses(user);
         }
        })
     });

  }

  signIn() {
    var st = this.state;
    var pr = this.props;

    var DeviceInfo = require('react-native-device-info');
    console.log('Model :::: ', DeviceInfo.getManufacturer());
    var mobile = {
      deviceId: '69',
      type: DeviceInfo.getManufacturer() == 'Apple' ? 'ios' : 'android'
    };

    var user = {
      email: st.email,
      password: st.password,
      mobile: pr.installation
    };
    // console.log("here at before the API Login ");
    // console.log("st.email", st.email);
    // console.log("st.password",st.password);

    Api.server.post('login', user)
    .then((loginResponse)=>{
      console.log("loginResponse.token", loginResponse.jwt);
      AsyncStorage.setItem('token',JSON.stringify(loginResponse));
      //Prep for storing the user object to the AsyncStorage
      // AsyncStorage.setItem('user',JSON.stringify(user));
      console.log("after set up loginResponse.token", loginResponse.jwt);
      if(loginResponse.jwt == undefined){
        //update the front end GUI to show that user doesn't exist
        console.log("The user info isn't correct");
      }else{
        console.log("Right before the goToCourses");
        this.goToCourses(this.state);
        // this.goToCourses(user);  //just for test
      }

    })

    //if authentificated, go to the courselist page

    // return this.fetchPost(this.baseUrl + model + findUrl, data);
  }

  goToCourses(props) {

    console.log("<<<<<<<< device ID: ", this.props.deviceID);
    this.props.navigator.push({
      name: 'Courses',
      passProps: props
    });
  }

  toggleSignInUp() {
    this.setState({isSignUp: !this.state.isSignUp});
  }

  startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
  }

  renderMainInputs() {
    var st = this.state;
    var pr = this.props;
    return (
      <View>
        <TextInput
          style={s.inputClear}
          value={st.email}
          keyboardType={'email-address'}
          onChangeText={(text) => this.setState({email: text})}
          placeholder={'School Email'}
          placeholderTextColor={s.white}
        />
        <HorizontalLine style={styles.lineSpace} />
        <TextInput
          style={s.inputClear}
          value={st.password}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          placeholder={'Password'}
          placeholderTextColor={s.white}
        />
        <HorizontalLine style={styles.lineSpace} />
      </View>
    );
  }

  renderSignUpInputs() {
    var st = this.state;
    return (
      <View>
        <TextInput
          style={s.inputClear}
          value={st.firstName}
          onChangeText={(text) => this.setState({firstName: text})}
          placeholder={'First name'}
          placeholderTextColor={s.white}
        />
        <HorizontalLine style={styles.lineSpace} />
        <TextInput
          style={s.inputClear}
          value={st.lastName}
          onChangeText={(text) => this.setState({lastName: text})}
          placeholder={'Last name'}
          placeholderTextColor={s.white}
        />
        <HorizontalLine style={styles.lineSpace} />
      </View>
    );
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <LinearGradient
        colors={['#32F1A8', '#32D7EF']}
        style={styles.container}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Text style={[styles.logoFont, {marginBottom: 10}]}>QUIZZLY</Text>

        <Image
          style={styles.logoImage}
          source={require('./images/logo.png')}
        />

        {this.renderMainInputs()}
        {st.isSignUp ? this.renderSignUpInputs() : null}

        <TouchableHighlight
          onPress={this.enterQuizzly.bind(this)}
        >
          <Text style={styles.boldButtonText}>{st.isSignUp ? "SIGN UP" : "SIGN IN"}</Text>
        </TouchableHighlight>

        <View style={styles.infoContainer}>
          <Text style={[s.p, {color: s.white}]}>Or switch to </Text>
          <TouchableHighlight
            onPress={this.toggleSignInUp.bind(this)}
          >
            <Text style={[s.p, s.underline, {color: s.white}]}>{st.isSignUp ? "sign in" : "sign up"}</Text>
          </TouchableHighlight>

          {/* <CountDown
           onPress={this.sendAgain} //default null
           text={'Try again'} //default ''
           time={60} //default 60
           buttonStyle={{padding:20}}
           textStyle={{color:'black'}} //default black
           disabledTextStyle={{color:'gray'}} //default gray
         /> */}

        </View>

        <Text style={[s.p, s.underline, styles.bottomInfoContainer, {color: s.white}]}>About</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  logoImage: {
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 25,
    width: 78,
    height: 80,
  },
  logoFont: {
    fontSize: 30,
    fontWeight: '700',
    color: s.white,
    alignSelf: 'center',
    fontFamily: s.mont
  },
  lineSpace: {
    marginTop: 5,
    marginBottom: 20,
  },
  boldButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: s.white,
    alignSelf: 'center',
    fontFamily: s.mont
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20
  },
  bottomInfoContainer: {
    alignSelf: 'center',
    marginBottom: 20
  }
});
