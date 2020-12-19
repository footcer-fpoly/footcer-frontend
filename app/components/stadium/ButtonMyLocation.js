import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';

export default function ButtonMyLocation({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="my-location" size={20} color={colors.black} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.columnCenter,
    backgroundColor: colors.white,
    width: scale(40),
    height: scale(40),
    borderRadius: scale(5),
    position: 'absolute',
    top: scale(80),
    left: 10,
    zIndex: 1,
  },
});
