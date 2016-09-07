/**
 * Quizzly React Native App
 * https://github.com/facebook/react-native
 * @keionanvari
 */

'use strict';
import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

var Main = require('./src/main')

AppRegistry.registerComponent('QuizzlyMobile', () => Main);
