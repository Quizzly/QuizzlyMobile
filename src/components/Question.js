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
      courses: [
        {title: 'What is threading and how do we use it in computer science?',
        A:'It is designed by a Germany scientist',
        B:'It is just an imaginary concept which sounds cool',
        C:'The threading is things going on at the same time',
        D:'We use it with locks and Vs often and a lot',
        index:'0'},
      ]
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

    return this.state.courses.map((course, i) => {
      console.log("+++++++++++++++++", course.title);
      return (
        <View>
          <Text>Question</Text>
          <TextWell
            text={course.title}
            color="red"
            style={[styles.textWellSpacing, {marginTop: 10}]}
          />
          <Text>A.)</Text>
          <TextWell
            text={course.A}
            color="blue"
            style={styles.textWellSpacing}
          />
          <Text>B.)</Text>
          <TextWell
            text={course.B}
            color="blue"
            style={styles.textWellSpacing}
          />
          <Text>C.)</Text>
          <TextWell
            text={course.C}
            color="blue"
            style={styles.textWellSpacing}
          />
          <Text>D.)</Text>
          <TextWell
            text={course.D}
            color="blue"
            style={styles.textWellSpacing}
          />
        </View>
      );
    });
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
        <Text>Render the Navigation Bar Here.</Text>
        {this.renderTextWells()}


        <TouchableHighlight
          style={styles.button}
          onPress={this.back.bind(this)}
        >
          <Text>Click me to go back to Entrance</Text>
        </TouchableHighlight>
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
