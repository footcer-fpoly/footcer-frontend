import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {headline5, Text} from './Text';

export default function PrimaryButton({
  title,
  onPress,
  style,
  textStyle,
  left,
}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View>{left}</View>
      <Text type={headline5} style={[styles.titleStyle, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleStyle: {color: colors.white, textTransform: 'uppercase'},
  container: {
    backgroundColor: colors.secondary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(40),
    borderRadius: scale(5),
    flexDirection: 'row',
  },
});
