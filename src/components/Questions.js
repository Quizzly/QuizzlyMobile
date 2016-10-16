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
  recordAnswer(){
     console.log("Answer Recorded");
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
           <TouchableHighlight
             style={styles.qButton}
             onPress={function(){
                console.log("Answer A recorded.. ");
             }}
           >
             <Text style={styles.buttonText}>{question.A}</Text>
           </TouchableHighlight>

           <Text>B.)</Text>
           <TouchableHighlight
             style={styles.qButton}
             onPress={function(){
                console.log("Answer B recorded.. ");
             }}
           >
             <Text style={styles.buttonText}>{question.B}</Text>
           </TouchableHighlight>


           <Text>C.)</Text>
           <TouchableHighlight
             style={styles.qButton}
             onPress={function(){
                console.log("Answer C recorded.. ");
             }}
           >
             <Text style={styles.buttonText}>{question.C}</Text>
           </TouchableHighlight>


           <Text>C.)</Text>
           <TouchableHighlight
             style={styles.qButton}
             onPress={function(){
                console.log("Answer D recorded.. ");
             }}
           >
             <Text style={styles.buttonText}>{question.D}</Text>
           </TouchableHighlight>

         </View>

      );
    });
  }
  renderNavBar(){
     return (
        <View>
           <NavBar
              title="Quiz"
              back={this.back.bind(this)}
              hasBack
           />
        </View>
     );
  }

  renderCourses() {
    return this.state.questions.map((question, i) => {
      console.log("+++++++++++++++++", question.text);
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
  buttonText:{
     textAlign: 'center',
    // fontStyle: 'italic',
     color: s.black
 },
  qButton: {
     borderRadius:7,
     borderWidth: .25,
     width: 350,
     height: 40,
     justifyContent:'center',
     alignSelf:'center',
     margin: 20,
     backgroundColor: '#E1FBFF'
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
