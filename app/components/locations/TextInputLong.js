import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';

export default class TextInputLong extends Component {
  render() {
    const {title, value} = this.props;

    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 17,
          marginVertical: 40,
        }}>
        <TextInput
          style={{
            borderRadius: 7,
            borderWidth: 0.5,
            height: 60,
            paddingHorizontal: 10,
            borderColor: '#707070',
          }}
          placeholder="Nhập tên đội bóng của bạn"
          value={value}
        />
        <Text
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: 125,
            height: 25,
            marginHorizontal: 67,
            top: -10,
            textAlign: 'center',
            fontSize: 15,
          }}>
          {title}
        </Text>
      </View>
    );
  }
}
