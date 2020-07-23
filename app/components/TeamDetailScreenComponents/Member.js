import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

export default class Member extends Component {
  render() {
    const {urlImgAvatar, name} = this.props;
    return (
      <View style={{paddingRight: 26, alignItems: 'center'}}>
        <Image
          style={{height: 75, width: 75, borderRadius: 75 / 2}}
          source={{uri: urlImgAvatar}}
        />
        <Text style={{fontSize: 14, maxWidth: 75}} numberOfLines={1}>
          {name}
        </Text>
      </View>
    );
  }
}
