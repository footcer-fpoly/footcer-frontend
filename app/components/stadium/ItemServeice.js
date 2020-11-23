import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ItemServeice extends Component {
  render() {
    const {imgService, txtService} = this.props;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#fff', '#00C17A']}
          style={styles.linearGradient}>
          <Image style={styles.imgService} source={imgService} />
        </LinearGradient>
        <Text style={styles.txtService} numberOfLines={1}>
          {txtService}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 10,
    width: 90,
  },
  linearGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtService: {
    maxWidth: 90,
  },
});
