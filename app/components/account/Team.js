import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

export default class Team extends Component {
  render() {
    const {urlImgTeam, nameTeam, level} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: -1,
          marginHorizontal: 15,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#707070',
        }}>
        <Image
          style={{height: 75, width: 75, borderRadius: 3}}
          source={{uri: urlImgTeam}}
        />
        <View
          style={{
            paddingLeft: 15,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#676767'}}>{nameTeam}</Text>
          <Text
            style={{
              fontSize: 14,
              color: '#676767',
              paddingTop: 5,
            }}>
            {level}
          </Text>
        </View>
      </View>
    );
  }
}
