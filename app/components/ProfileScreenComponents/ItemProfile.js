import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ItemProfile extends Component {
  render() {
    const {name, title} = this.props;
    return (
      <View style={styles.container}>
        <Icon name={name} style={{color: '#0AB134'}} size={20} />
        <Text style={{marginLeft: 20, fontSize: 14}}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.2,
    borderColor: '#707070',
    paddingHorizontal: 20,
    paddingVertical:25,
  },
});
