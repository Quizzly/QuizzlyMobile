import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Image, PushNotificationIOS,
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
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      isSignUp: false,
      permissions: null
    };
  }

  componentDidMount(){
     Api.server.find("student")
     .then((students) => {
        this.setState({student: students[0]})
     })
 }

  enterQuizzly() {
    this.goToCourses(this.state);
    // TODO: must add this back in
    // if(this.state.isSignUp) {
    //   this.signUp();
    // } else {
    //   this.signIn();
    // }
  }
  _showPermissions() {
     console.log("Checking Perms...");

     PushNotificationIOS.checkPermissions((permissions) => {
       this.setState({permissions});
       console.log('Perms: ', JSON.stringify(this.state.permissions));
    });

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
    console.log("working...");

    var user = {
      email: st.email,
      password: st.password,
    };
    Api.server.post('login', user)
    .then((user) => {
      this.goToCourses(user);
    });
  }

  goToCourses(props) {
    this._showPermissions();

    PushNotificationIOS.addEventListener('register', function(token){
      // console.log("hey");
      console.log('You are registered and the device token is: ',token)
    });
    
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
