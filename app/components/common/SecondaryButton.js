import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {body2, Text} from './Text';

export default function SecondaryButton({title, onPress, style, textStyle}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text type={body2} style={[styles.titleStyle, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleStyle: {color: colors.white},
  container: {
    backgroundColor: colors.greenDark,
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(30),
    borderRadius: scale(5),
  },
});
