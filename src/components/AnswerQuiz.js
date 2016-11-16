import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet, TableView, ListView
} from 'react-native';

import s from '../modules/Style.js';
import TextWell from '../elements/TextWell'
import Row from '../elements/Row'
import QuestionRow from './QuestionRow'
import Api from '../modules/Api'
import NavBar from './NavBar.js'

export default class Entrance extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      questions: [],
      dataSource: ds.cloneWithRows(['row1', 'row2']),
      time: this.props.time,
    };
  }

   componentDidMount(){
     this.startTimer(this.props.time);
   }
   componentWillUnmount(){
     //clearInterval(counter);
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
      console.log("Time: ", time);
      me.setState({time: time}, function() {
        if (duration <= 0) {
          clearInterval(counter);
          console.log("AHHHHHH");
          this.back();
          return;
      }
      }.bind(me));
   }
 }

  componentDidMount() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    Api.server.find('question',{quiz: this.props.quiz.id})
    .then((questions) => {
      console.log("question", questions);
      this.setState({
         questions: questions,
         dataSource: ds.cloneWithRows(questions)
      });
    });
  }

  renderNavBar(){
     return (
        <View>
           <NavBar
             title={this.props.quiz.title}
             back={this.back.bind(this)}
             hasBack
           />
        </View>
     );
  }

  goToQuestions(question) {
     var pr = this.props;
     this.props.navigator.push({
      name: 'AnswerQuestion',
      passProps: {question:question, quizKey:pr.quizKey, time:question.duration }
     });
  }


  renderCourses(rowData) {
    var question = rowData;
    //console.log(">>>>>>>>>>>> Question",question);
    return (
      <QuestionRow
          question={question}
          goTo={this.goToQuestions.bind(this, question)}
       />
    );

  }
  renderTable() {
     return (
        <ListView
           dataSource={this.state.dataSource}
           renderRow={this.renderCourses.bind(this)}
        />
     );
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderTable()}
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
});
