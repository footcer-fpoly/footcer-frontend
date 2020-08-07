import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function(props) {
  console.log(props);
  return (
    <View style={{width: 100, alignItems: 'center'}}>
      <Image
        style={{height: 40, width: 40, borderRadius: 40 / 2}}
        source={{uri: props.urlImgTeam}}
      />
      <Text style={{fontSize: 14, maxWidth: 90}} numberOfLines={1}>
        {props.nameTeam}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
