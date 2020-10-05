import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';

export default function ItemHeader2({title, navigation}) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={styles.iconHeader} name="chevron-left" size={21} />
      </TouchableOpacity>
      <Text style={styles.titleHeader}>{title}</Text>
      <View style={{paddingHorizontal: 25}} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleHeader: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  iconHeader: {
    color: '#fff',
    padding: 20,
  },
});
