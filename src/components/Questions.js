import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AlertIOS,
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
    console.log("!!!PROPS: ", this.props.question);
    var length = this.props.question.answers.length;
    var type = this.props.question.type;

    if(type=="multipleChoice"){
      if(length==3){
        this.state = {
            questions: [
              {title: this.props.question.text, //need to inser the dynamic loading options here
              A:this.props.question.answers[0].text,
              B:this.props.question.answers[1].text,
              C:this.props.question.answers[2].text,
              Type:type,
              index:'0'},
            ],
            pressedA: false,
            pressedB: false,
            pressedC: false,
            pressedSubmit: false
          };
     }else if(length==4){
       this.state = {
           questions: [
             {title: this.props.question.text, //need to inser the dynamic loading options here

             A:this.props.question.answers[0].text,
             B:this.props.question.answers[1].text,
             C:this.props.question.answers[2].text,
             D:this.props.question.answers[3].text,
             Type:type,
             index:'0'},
           ],
           pressedA: false,
           pressedB: false,
           pressedC: false,
           pressedD: false,
           pressedSubmit: false
         };
     }
   }else if(type == "freeResponse"){
      this.state = {
         questions: [
           {title: this.props.question.text, //need to inser the dynamic loading options here
           Type:type,
           index:'0'},
         ],
         text: 'Please answer the question here'
       };
   }

  }

  back() {
    this.props.navigator.pop();
  }

  pressA() {
    if(this.state.pressedSubmit) return;
    this.setState({
      pressedA: true,
      pressedB: false,
      pressedC: false
    });
    console.log("Answer A recorded.. ");
  }

  pressB() {
    if(this.state.pressedSubmit) return;
    this.setState({
      pressedA: false,
      pressedB: true,
      pressedC: false
    });
    console.log("Answer B recorded.. ");
  }

  pressC() {
    if(this.state.pressedSubmit) return;
    this.setState({
      pressedA: false,
      pressedB: false,
      pressedC: true
    });
    console.log("Answer C recorded.. ");
  }

  pressSubmit() {
    if(!(this.state.pressedA ^ this.state.pressedB ^ this.state.pressedC)) {
      AlertIOS.alert(
        'Please choose an answer'
        );
      return;
    }
    this.setState({
      pressedSubmit: true
    })
    console.log("Submit pressed..");
  }

  goToAnswers(question) {
    if(!this.state.pressedSubmit) return;
    console.log("HERE INSIDE THE GO TO ANSWER PAGE-> inputText  ",question);
    // console.log(this.props.question);
    this.props.navigator.push({
      //parse in the unique quiz id here.
      //dynamic generaiton of the questins needed.
      name: 'Answers',
      passProps: {question: question}
    });
  }
  recordAnswer(){
     console.log("Answer Recorded");
  }

  renderFreeResponseQuestion(){
    console.log("HERE INSDIE THE renderFreeResponseQuestion");
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

           <TextInput
               style={{height: 120, borderColor: 'gray', borderWidth: 1,margin:10}}
               multiline = {true}
               numberOfLines = {4}
               onChangeText={(text) => this.setState({text})}
               value={this.state.text}
          />
         </View>
      );
    });
  }
  renderMultipleChoiceQuestion() {

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
           <TouchableOpacity
             style={this.state.pressedA ? styles.qButtonPressed : styles.qButton}
             onPress={this.pressA.bind(this)}
           >
             <Text style={styles.buttonText}>{question.A}</Text>
           </TouchableOpacity>

           <Text>B.)</Text>
           <TouchableOpacity
             style={this.state.pressedB ? styles.qButtonPressed : styles.qButton}
             onPress={this.pressB.bind(this)}
           >
             <Text style={styles.buttonText}>{question.B}</Text>
           </TouchableOpacity>


           <Text>C.)</Text>
           <TouchableOpacity
             style={this.state.pressedC ? styles.qButtonPressed : styles.qButton}
             onPress={this.pressC.bind(this)}
           >
             <Text style={styles.buttonText}>{question.C}</Text>
           </TouchableOpacity>

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
    console.log("HERE IS THE RENDER FUNCTION");
    console.log("QUESTION",this.props.question);
    var pr = this.props;
    var type = pr.question.type;

    if(type == "multipleChoice"){
      console.log("THE TYPE IS MULTIPLE CHOICE");

      return (
        <View style={styles.container}>
          {this.renderNavBar()}
          {this.renderMultipleChoiceQuestion()}

          <TouchableOpacity
            style={[this.state.pressedSubmit ? styles.submitNotPressed : styles.button, {marginTop: 20}]}
            onPress={this.pressSubmit.bind(this)}
          >
            <Text>    Submit    </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[this.state.pressedSubmit ? styles.button : styles.submitNotPressed, {marginTop: 20}]}
            onPress={this.goToAnswers.bind(this,pr.question)}
          >
            <Text>See Answer</Text>
          </TouchableOpacity>

        </View>
      );

    }else if(type == "freeResponse"){
      console.log("THE TYPE IS FREE RESPONSE");
      return (
        <View style={styles.container}>
          {this.renderNavBar()}
          {this.renderFreeResponseQuestion()}

          <TouchableOpacity
            style={[styles.button, {marginTop: 20}]}
            onPress={function() {

            }}
          >
            <Text>    Submit    </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, {marginTop: 20}]}
            onPress={this.goToAnswers.bind(this,pr.question)}
          >
            <Text>See Answer</Text>
          </TouchableOpacity>

        </View>
      );
    }

  }
}

var styles = StyleSheet.create({
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
  qButtonPressed: {
     borderRadius:7,
     borderWidth: .25,
     width: 350,
     height: 40,
     justifyContent:'center',
     alignSelf:'center',
     margin: 20,
     backgroundColor: '#F3E1FF'
  },
  button: {
    padding: 20,
    backgroundColor: '#F0FFE1',
    alignSelf: 'center',
    borderRadius: 10
  },
  submitNotPressed: {
    padding: 20,
    backgroundColor: '#DBDBD6',
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
