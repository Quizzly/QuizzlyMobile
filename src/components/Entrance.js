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

export default class Entrance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Test1@gmail.com',
      password: 'test1',
      firstName: '',
      lastName: '',
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
     [{
        text: 'Dismiss',
        onPress: function(){
           var question = {
             text: 'What is the first rule of fight club?'
           };
           pr.navigator.push({
              name: 'Questions',
              passProps: {course: 'this.props.course', title:'course title', state:this.state, question}
           });
        },
     }]
    );
  }

  _onRemoteNotification(notification) {
    var pr = this.props;
    var st = this.state;
    AlertIOS.alert(
    'Quiz Alert',
    'Please take 30 seconds to finish the quiz - ' + notification.getMessage(),
    [{
        text: 'Take Quiz',
        onPress: function(){
           console.log("!! Loading Quiz...");

           var question = {
           text: 'What is the first rule of fight club?'
           };
           pr.navigator.push({
           name: 'Questions',
           passProps: {course: 'this.props.course', title:'course title', state:st, question}
           });
        },
    }]
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
    var user = {
      email: st.email,
      password: st.password,
      firstName: st.firstName,
      lastName: st.lastName
    };
    Api.server.post('signup', user)
    .then((user) => {
      this.goToCourses(user);
    });
  }

  signIn() {
    var st = this.state;

    var user = {
      email: st.email,
      password: st.password
    };
    // console.log("here at before the API Login ");
    // console.log("st.email", st.email);
    // console.log("st.password",st.password);

    Api.server.post('login',user)
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
        // this.goToCourses(user);
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
