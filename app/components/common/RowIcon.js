import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {body3, Text} from './Text';

export default function RowIcon({text, iconName}) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={iconName} color={colors.grayDark} size={scale(16)} />
      <Text type={body3} style={styles.txt}>
        {text}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {...Styles.rowBetween, marginTop: scale(15)},
  txt: {
    flex: 1,
    marginLeft: scale(10),
    color: colors.grayDark,
  },
});
