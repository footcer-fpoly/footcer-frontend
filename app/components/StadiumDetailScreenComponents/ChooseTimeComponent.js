import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class ChooseTimeComponent extends Component {
  render() {
    const {time, timeLimit, price} = this.props;
    return (
      <View style={styles.chooseTime}>
        <Text style={styles.txt}>{time}</Text>
        <Text style={styles.txt}>{timeLimit} phút</Text>
        <Text style={styles.txtPrice}>{price}đ</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chooseTime: {
    borderWidth: 1,
    borderColor: '#676767',
    borderRadius: 5,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    width: 100,
    marginRight:5,
    alignItems: 'center',
  },
  txt: {
    color: '#676767',
    fontSize: 12,
  },
  txtPrice: {
    color: '#0AB134',
    fontSize: 12,
  },
});
