import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

export default class ItemMatch extends Component {
  render() {
      const {urlImg, nameTeam, status} = this.props;
    return (
      <View style={styles.info}>
        <Image
          source={{
            uri: urlImg}}
          style={styles.imgInfo}
        />
        <Text numberOfLines={1} style={styles.textnameUser}>
          {nameTeam}
        </Text>
        <Text style={styles.textStatus}>{status}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    imgInfo: {
        height: 42,
        width: 42,
        borderRadius: 42 / 2,
      },
      info: {
        alignItems: 'center',
        margin: 15,
      },
      textStatus: {
        color: '#00b36b',
      },
      textnameUser: {
        maxWidth: 105,
        color: '#676767',
      },
})

