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
import Answers from './components/Answers';
import Questions from './components/Questions';
import QuizzList from './components/QuizzList';

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
      case 'Answers':
        return <Answers navigator={navigator} {...route.passProps}  />
      case 'Questions':
        return <Questions navigator={navigator} {...route.passProps}  />
      case 'QuizzList':
        return <QuizzList navigator={navigator} {...route.passProps}  />
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
