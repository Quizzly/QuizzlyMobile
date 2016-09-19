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
import CourseRow from './CourseRow'
import Api from '../modules/Api'
import NavBar from './NavBar.js'

export default class Entrance extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      quizzes: [],
      dataSource: ds.cloneWithRows(['row1', 'row2'])
    };
  }

  back() {
    this.props.navigator.pop();
  }


  componentDidMount() {
    console.log("Hey what's up");
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    Api.server.find('quiz')
    .then((quizzes) => {
      console.log("quizzes", quizzes);
      this.setState({
         quizzes: quizzes,
         dataSource: ds.cloneWithRows(quizzes)

      });
    });
  }

  renderNavBar(){
     return (
        <View>
           <NavBar
             title={this.props.course.title}
             back={this.back.bind(this)}
             hasBack
           />
        </View>
     );
  }

  goToQuizzList(course) {
    this.props.navigator.push({
      //parse in the unique quiz id here.
      //dynamic generaiton of the questins needed.
      name: 'Questions',
    });
  }


  renderCourses(rowData) {
    var quiz = rowData;
    console.log(">>>>>>>>>>>> Quiz",quiz);
    return (
      <CourseRow
          course={quiz}
          goToCourse={this.goToQuizzList.bind(this)}
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
