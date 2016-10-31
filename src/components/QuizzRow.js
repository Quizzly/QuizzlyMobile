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
import s from '../modules/Style';
import Row from '../elements/Row';

export default class QuizzRow extends Component {

  var jwt;
  var quesTotalCount;
  var quesAnsweredCorrect;
  var quesUnanswered;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(">>>>>>>>>>>> quiz", this.props.quiz);
  }

  renderQuizzRowBody() {
    var pr = this.props;
    return (
      <View style={styles.infoContainer}>
        <Text style={[s.p, s.italic]}>
          {pr.quiz.title}
        </Text>
        <View style={styles.endInfoContainer}>
          <Text style={[s.p, styles.grade]}>
            {quesAnsweredCorrect} / {quesTotalCount}
          </Text>
          <Text style={styles.arrow}>
            >
          </Text>
        </View>
      </View>
    );
  }


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
