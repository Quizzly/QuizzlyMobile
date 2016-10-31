import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from 'react-native';

import s from '../modules/Style.js';
import TextWell from '../elements/TextWell'
import Row from '../elements/Row'
import CourseRow from './CourseRow'
import Api from '../modules/Api'
import NavBar from './NavBar.js'

export default class AnswerQuestion extends Component {
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
            ]
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
           ]
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

  goToAnswers(question) {
    console.log("HERE INSIDE THE GO TO ANSWER PAGE-> inputText  ",question);
    // console.log(this.props.question);
    this.props.navigator.push({
      //parse in the unique quiz id here.
      //dynamic generaiton of the questins needed.
      name: 'Answers',
      passProps: {question: question}
    });
  }

  //send to URL: question/answer
  recordAnswer(answerID){

     var answerObject = {
        questionKey: this.props.questionKey,
        answer: answerID
     };
     console.log("Answer OBJ:", answerObject);

     Api.server.post("question/answer", answerObject)
     .then((object) => {
        console.log("successful post.");
     });

     this.back(); 

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
           <TouchableHighlight
             style={styles.qButton}
             onPress={this.recordAnswer.bind(this,this.props.question.answers[0].id)}
           >
             <Text style={styles.buttonText}>{question.A}</Text>
           </TouchableHighlight>

           <Text>B.)</Text>
           <TouchableHighlight
             style={styles.qButton}
             onPress={this.recordAnswer.bind(this,this.props.question.answers[1].id)}
           >
             <Text style={styles.buttonText}>{question.B}</Text>
           </TouchableHighlight>


           <Text>C.)</Text>
           <TouchableHighlight
             style={styles.qButton}
             onPress={this.recordAnswer.bind(this,this.props.question.answers[2].id)}
           >
             <Text style={styles.buttonText}>{question.C}</Text>
           </TouchableHighlight>


           {/* <Text>D.)</Text>
           <TouchableHighlight
             style={styles.qButton}
             onPress={this.recordAnswer.bind(this,this.props.question.answers[3].id)}
           >
             <Text style={styles.buttonText}>{question.D}</Text>
           </TouchableHighlight> */}

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

        </View>
      );

    }else if(type == "freeResponse"){
      console.log("THE TYPE IS FREE RESPONSE");
      return (
        <View style={styles.container}>
          {this.renderNavBar()}
          {this.renderFreeResponseQuestion()}

          <TouchableHighlight
            style={[styles.button, {marginTop: 20}]}
            onPress={this.goToAnswers.bind(this,pr.question)}
          >
            <Text>Click me to See the Answer</Text>
          </TouchableHighlight>

        </View>
      );
    }

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
