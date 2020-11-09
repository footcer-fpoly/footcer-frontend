import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class ItemMore extends Component {
  render() {
    const {title} = this.props;
    return (
      <View style={styles.headerFieldContainer}>
        <Text style={styles.fieldTitle}>{title}</Text>
        <Text style={styles.fieldMore}>Xem thêm</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  fieldMore: {
    color: '#0AB134',
  },
});
