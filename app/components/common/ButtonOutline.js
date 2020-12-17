import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {headline5, Text} from './Text';

export default function ButtonOutline({
  onPress,
  style,
  textStyle,
  left,
  right,
  title,
  colorOutline,
  titleColor,
}) {
  return (
    <TouchableOpacity
      style={[styles.container(colorOutline), style]}
      onPress={onPress}>
      <View>{left}</View>
      <Text type={headline5} style={[styles.titleStyle(titleColor), textStyle]}>
        {title}
      </Text>
      <View>{right}</View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: (color) => ({
    ...Styles.borderView(color, scale(2), scale(5)),
    ...Styles.rowCenter,
    height: scale(40),
    paddingHorizontal: scale(10),
  }),
  titleStyle: (color) => ({
    paddingHorizontal: scale(10),
    color,
  }),
});
