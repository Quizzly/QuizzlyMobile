'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import s from '../modules/Style.js';

export default class Row extends Component {
  constructor(props) {
    super(props);
  }


  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    var pr = this.props;
    return (
      <View
        style={[pr.style, styles.row]}
        ref={component => this._root = component}
      >
        {pr.body}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 13,
    borderColor: s.lightGray,
    borderTopWidth: 1,
  }
});
