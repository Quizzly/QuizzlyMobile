'use strict';
import React, { Component } from 'react';
import {
   Text,
   View,
   TouchableHighlight,
   StyleSheet, TableView, ListView
} from 'react-native';

import TextWell from '../elements/TextWell'
import Row from '../elements/Row'
import CourseRow from './CourseRow'
import Api from '../modules/Api'
import s from '../modules/Style.js';
import LinearGradient from 'react-native-linear-gradient';
import NavBar from './NavBar.js'

export default class Entrance extends Component {
   constructor(props) {
      super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         courses: [],
         dataSource: ds.cloneWithRows(['row1', 'row2'])
      };
   }

   back() {
      this.props.navigator.pop();
   }

   componentDidMount() {
      console.log("Mounting...");
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
      Api.server.find('course')
      .then((courses) => {
         console.log("courses", courses);
         this.setState({
            courses: courses,
            dataSource: ds.cloneWithRows(courses)
         });
      });
   }
   goToCourse(course) {
      console.log("course", course);
   }
   coursesToMap() {
      // THIS DOESNT WORK LIKE I WANT IT TO
      // var coursesMap = ['hey1', 'hey2', 'done'];
      var coursesMap = [];
      this.state.courses.map((course, i) => {
         console.log("+++++++hey+++++++");
         coursesMap.push();
      });
      console.log("coursesMap", coursesMap);
      return coursesMap;
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

   renderCourses(rowData) {
     var course = rowData;
     return (
       <CourseRow
           course={course}
           goToCourse={this.goToCourse.bind(this)}
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
   renderTableView(){
      return this.state.courses.map((course, i) => {
         console.log("+++++++++++++++++", course.title);
         return (
            <ListView
               dataSource={this.state.dataSource}
               renderRow={(rowData) => <CourseRow
                   key={i}
                   course={course}
                   goToCourse={this.goToCourse.bind(this)}
                />}
            />
         );
      });
   }

  //  renderCourses() {
  //     return this.state.courses.map((course, i) => {
  //        console.log("+++++++++++++++++", course.title);
  //        return (
  //           <CourseRow
  //               key={i}
  //               course={course}
  //               goToCourse={this.goToCourse.bind(this)}
  //            />
   //
  //        );
  //     });
  //  }

   render() {
      return (
         <View style={styles.container}>

         {this.renderNavBar()}
          {/*{this.renderTableView()} */}
          {this.renderTable()}
         {/*{this.renderCourses()}*/}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   button: {
      //padding: 20,
      backgroundColor: 'green',
      alignSelf: 'center',
      borderRadius: 10
   },
   textWellSpacing: {
      marginHorizontal: 10,
      marginBottom: 10
   },
});
