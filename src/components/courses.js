/**
 * Quizzly React Native App
 * Login
 * @keionanvari
 */

'use strict';
import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View, Image, TextInput, TouchableHighlight, AlertIOS
} from 'react-native';


module.exports = React.createClass({
   getInitialState: function() {
      return {
         email: '',
         password: ''
      };
   },

   render: function() {
      return (
         <View style={styles.container} >
            <Text>
               Hey My Name Is Keion
            </Text>
         </View>
      );
   },

   onPress: function() {
      AlertIOS.alert('Alert', 'Hello' + ' ' + this.state.email + '!', [{text: 'OK'}] );
   }
});

var styles = StyleSheet.create({
   container: {

   }
});
