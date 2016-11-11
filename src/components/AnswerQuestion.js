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

var counter;

export default class AnswerQuestion extends Component {
   constructor(props) {
      super(props);

      console.log("!!!PROPS: ", this.props.question);

      var length = this.props.question.answers.length;
      var type = this.props.question.type;

      this.state = {
         questions: [
            {title: this.props.question.text, //need to inser the dynamic loading options here
               Type:type,
               index:'0'
            },
         ],
         time: this.props.time,
         text: 'Please answer the question here'
      };

      }
      componentDidMount(){
         this.startTimer(this.props.time);
      }
      componentWillUnmount(){
         clearInterval(counter);
      }

      back() {
         this.props.navigator.pop();
      }

      startTimer(duration) {
        counter = setInterval(timer, 1000); //1000 will run it every 1 second
        var me = this;
        function timer() {
          duration--;
          var time = me.state.time;
          time = duration;

          me.setState({time: time}, function() {
            if (duration <= 0) {
              clearInterval(counter);
              if (this.props.question.type == "multipleChoice") {
                 this.recordMutipleChoiceAnswer(0);
              }else if (this.props.question.type == "freeResponse"){
                 this.recordFreeResponseAnswer();
              }
              this.back();
              return;
           }
          }.bind(me));
       }
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

      recordMutipleChoiceAnswer(answerID){
         var answerObject = {
            questionKey: this.props.questionKey,
            answer: answerID
         };
         Api.server.post("question/answer", answerObject)
         .then((object) => {
            console.log("successful post.");
         });
         this.back();
      }

      recordFreeResponseAnswer(){
         var answerObject = {
            questionKey: this.props.questionKey,
            text: this.state.text
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
                  <TouchableHighlight
                     style={[styles.button, {marginTop: 20}]}
                     onPress={this.recordFreeResponseAnswer.bind(this)}
                  >
                     <Text>Submit</Text>
                  </TouchableHighlight>
               </View>
            );
         });
      }

      renderMultipleChoiceQuestion() {
          const Answer = ({answer, recordMutipleChoiceAnswer}) => {
            return (
              <View>
                 <Text>{answer.option}.</Text>
                 <TouchableHighlight
                   style={styles.qButton}
                   onPress={this.recordMutipleChoiceAnswer.bind(this,answer.id)}
                 >
                   <Text style={styles.buttonText}>{answer.text}</Text>
                 </TouchableHighlight>
              </View>
            );
          }

          return (
             <View>
                <View>
                   <Text style={[styles.questionHeader]}>Question</Text>
                   <TextWell
                    text={this.props.question.text}
                    color="red"
                    style={[styles.textWellSpacing, {marginTop: 10}]}
                  />
               </View>

               {this.props.question.answers.map((answer, i) => {
                  return (
                     <View>
                          <Answer
                            answer={answer}
                            recordMutipleChoiceAnswer={this.recordMutipleChoiceAnswer.bind(this)}
                          />
                     </View>
                  );
              })}
             </View>
       )

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
                     <Text style={[styles.timer, {marginTop: 20}]}>{this.state.time}</Text>
                  </View>
               );

            }else if(type == "freeResponse"){
               console.log("THE TYPE IS FREE RESPONSE");
               return (
                  <View style={styles.container}>
                     {this.renderNavBar()}
                     {this.renderFreeResponseQuestion()}
                     <Text style={[styles.timer, {marginTop: 20}]}>{this.state.time}</Text>
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
            backgroundColor: 'yellow',
            alignSelf: 'center',
            borderRadius: 10,
            borderWidth: .25,
         },
         timer: {
            padding: 20,
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
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
