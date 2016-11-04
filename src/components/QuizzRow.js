/**
 * Quizzly React Native App
 * Main
 * @keionanvari
 */

'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,TouchableHighlight,
} from 'react-native';
import Api from '../modules/Api'
<<<<<<< HEAD
=======
import Session from '../modules/Session'
>>>>>>> 731b1ed42842674bb0a6941e6299e177486c30bf
import s from '../modules/Style';
import Row from '../elements/Row';

export default class QuizzRow extends Component {

<<<<<<< HEAD
  var jwt;
  var quesTotalCount;
  var quesAnsweredCorrect;
  var quesUnanswered;

  constructor(props) {
    super(props);
=======


  constructor(props) {
    super(props);
    this.state = {
      jwt: "",
      quesTotalCount: -1,
      quesAnsweredCorrect: -1,
      quesUnanswered: -1,
   };
>>>>>>> 731b1ed42842674bb0a6941e6299e177486c30bf
  }

  componentDidMount() {
    console.log(">>>>>>>>>>>> quiz", this.props.quiz);
<<<<<<< HEAD
  }

  renderQuizzRowBody() {
    var pr = this.props;
=======
    this.getRatio();
  }

getRatio(){
      var st = this.state;
      var pr = this.props;
      console.log("Session", Session);

      var studentQuizObject = {
         student: Session.student.id,
         quiz: pr.quiz.id
      };
      console.log("studentQuizObject", studentQuizObject);

      Api.server.post("studentanswer/getMetrics", studentQuizObject)
      .then((quizResults) => {
         console.log("quizResults", quizResults);
         this.setState({
            quesTotalCount: quizResults.size,
            quesAnsweredCorrect: quizResults.countCorrect,
            quesUnanswered: quizResults.countUnanswered,
         });
      });
    }

  renderQuizzRowBody() {
    var pr = this.props;
    var st = this.state;
>>>>>>> 731b1ed42842674bb0a6941e6299e177486c30bf
    return (
      <View style={styles.infoContainer}>
        <Text style={[s.p, s.italic]}>
          {pr.quiz.title}
        </Text>
        <View style={styles.endInfoContainer}>
          <Text style={[s.p, styles.grade]}>
<<<<<<< HEAD
            {quesAnsweredCorrect} / {quesTotalCount}
=======
            {st.quesAnsweredCorrect} / {st.quesTotalCount}
>>>>>>> 731b1ed42842674bb0a6941e6299e177486c30bf
          </Text>
          <Text style={styles.arrow}>
            >
          </Text>
        </View>
      </View>
    );
  }


<<<<<<< HEAD
  getRatio(){




    AsyncStorage.getItem('token', (err, result) => {
      var jwt = result;
    });

       var studentQuizObject = {
          student: jwt,
          quiz: this.props.quiz.id
       };

       Api.server.post("question/answer", studentQuizObject)
       .then((object) => {
          quesTotalCount = object.size;
          quesAnsweredCorrect = object.countCorrect;
          quesUnanswered = object.countUnanswered;
       });

  }

=======
>>>>>>> 731b1ed42842674bb0a6941e6299e177486c30bf

  render() {
    var pr = this.props;
    return (
      <TouchableHighlight
        onPress={pr.goTo.bind(this, pr.quiz)}
      >
        <Row
          body={this.renderQuizzRowBody()}
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  endInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'stretch',
  },
  grade: {
    color: s.green,
    marginRight: 10
  },
  arrow: {
    color: s.gray
  }
});
