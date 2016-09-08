import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import s from '../modules/Style.js';
import TextWell from '../elements/TextWell'
import Row from '../elements/Row'
import CourseRow from './CourseRow'
import Api from '../modules/Api'

export default class Entrance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  back() {
    this.props.navigator.pop();
  }

  componentDidMount() {
    console.log("Hey what's up");
    Api.server.find('course')
    .then((courses) => {
      console.log("courses", courses);
      this.setState({courses: courses});
    });
  }

  goToCourse(course) {
    console.log("course", course);
  }

  renderTextWells() {
    return (
      <View>
        <TextWell
          text="Hello I'm a green text box that like to talk way too much!  I like to be right all the time whenever I can. So please say things for me to feel happy about!"
          color="green"
          style={[styles.textWellSpacing, {marginTop: 10}]}
        />
        <TextWell
          text="I'm a cool blue piece of text that most people like reading.  Especially when they are angry or feeling really red!"
          color="blue"
          style={styles.textWellSpacing}
        />
        <TextWell
          text="I'm red.  I'm always angry and always wrong!"
          color="red"
          style={styles.textWellSpacing}
        />
      </View>
    );
  }

  renderCourses() {
    return this.state.courses.map((course, i) => {
      console.log("+++++++++++++++++", course.title);
      return (
          <CourseRow
            key={i}
            course={course}
            goToCourse={this.goToCourse.bind(this)}
          />
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>I am the Courses page.</Text>
        <Text>This is the email prop passed in: {this.props.email}</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={this.back.bind(this)}
        >
          <Text>Click me to go back to Entrance</Text>
        </TouchableHighlight>
        {this.renderTextWells()}
        {this.renderCourses()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  button: {
    padding: 20,
    backgroundColor: 'green',
    alignSelf: 'center',
    borderRadius: 10
  },
  textWellSpacing: {
    marginHorizontal: 10,
    marginBottom: 10
  },
});
