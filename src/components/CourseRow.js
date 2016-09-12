'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import s from '../modules/Style';
import Row from '../elements/Row';

export default class CourseRow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(">>>>>>>>>>>> course", this.props.course);
  }

  renderCourseRowBody() {
    var pr = this.props;
    return (
      <View style={styles.infoContainer}>
        <Text style={[s.p, s.italic]}>
          {pr.course.title}
        </Text>
        <View style={styles.endInfoContainer}>
          <Text style={[s.p, styles.grade]}>
            {pr.course.ratio}
          </Text>
          <Text style={styles.arrow}>
            >
          </Text>
        </View>
      </View>
    );
  }

  render() {
    var pr = this.props;
    return (
      <TouchableHighlight
        onPress={pr.goToCourse.bind(this, pr.course)}
      >
        <Row
          body={this.renderCourseRowBody()}
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
