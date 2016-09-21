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
import NavBar from './NavBar.js'

export default class Answers extends Component {
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
        <Text>3.)</Text>
        <TextWell
          text="What is threading and how do we use it in computer science?"
          color="green"
          style={[styles.textWellSpacing, {marginTop: 10}]}
        />
        <Text>D.)</Text>
        <TextWell
          text="We use it with locks and Vs often and a lot"
          color="red"
          style={styles.textWellSpacing}
        />
      </View>
    );
  }

  renderNavBar(){
     return (
        <View>
           <NavBar
             title={"Courses"}
             back={this.back.bind(this)}
             hasBack
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
            goTo={this.goToCourse.bind(this)}
          />
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
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
    flex: 1
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
