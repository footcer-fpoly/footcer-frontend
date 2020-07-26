import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ItemHeader extends Component {
  render() {
    const {titleHeader} = this.props;
    return (
      <View style={styles.headerContainer}>
        <Icon style={styles.iconHeader} name="chevron-left" size={21} />
        <Text style={styles.titleHeader}>{titleHeader}</Text>
        <View style={{width: 21}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  titleHeader: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  iconHeader: {
    color: '#fff',
  },
});
