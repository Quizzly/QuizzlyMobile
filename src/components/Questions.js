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

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {title: this.props.question.text, //need to inser the dynamic loading options here
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

  goToAnswers(course) {
    // console.log(this.props.question);
    this.props.navigator.push({
      //parse in the unique quiz id here.
      //dynamic generaiton of the questins needed.
      name: 'Answers',
    });
  }

  renderTextWells() {

    return this.state.questions.map((question, i) => {
      console.log("+++++++++++++++++", question.title);
      return (
        <View>
          <Text style={[styles.questionHeader]}>Question</Text>
          <TextWell
            text={question.title}
            color="red"
            style={[styles.textWellSpacing, {marginTop: 10}]}
          />
          <Text>A.)</Text>
          <TextWell
            text={question.A}
            color="blue"
            style={styles.textWellSpacing}
          />
          <Text>B.)</Text>
          <TextWell
            text={question.B}
            color="blue"
            style={styles.textWellSpacing}
          />
          <Text>C.)</Text>
          <TextWell
            text={question.C}
            color="blue"
            style={styles.textWellSpacing}
          />
          <Text>D.)</Text>
          <TextWell
            text={question.D}
            color="blue"
            style={styles.textWellSpacing}
          />
        </View>
      );
    });
  }
  renderNavBar(){
     return (
        <View>
           <NavBar
              title="Courses"
              back={this.back.bind(this)}
              hasBack
           />
        </View>
     );
  }

  renderCourses() {
    return this.state.questions.map((question, i) => {
      console.log("+++++++++++++++++", question.title);
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
          style={[styles.button, {marginTop: 20}]}
          onPress={this.goToAnswers.bind(this)}
        >
          <Text>Click me to See the Answer</Text>
        </TouchableHighlight>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  questionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
