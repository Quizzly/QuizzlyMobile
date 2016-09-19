/**
 * Quizzly React Native App
 * Main
 * @keionanvari
 */

'use strict';
import React from 'react';
import {
  Navigator,
  StyleSheet,
  AppRegistry
} from 'react-native';

import Entrance from './components/Entrance';
import Courses from './components/Courses';
import Course from './components/Course';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'Entrance':
        return <Entrance navigator={navigator} {...route.passProps}  />
      case 'Courses':
        return <Courses navigator={navigator} {...route.passProps}  />
      case 'Course':
         return <Course navigator={navigator} {...route.passProps}  />
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
