/**
 * Quizzly React Native App
 * https://github.com/facebook/react-native
 * @keionanvari
 */

'use strict';
var React = require('react-native');
var {
  AppRegistry
} = React;

var Main = require('./src/main')

AppRegistry.registerComponent('QuizzlyMobile', () => Main);
