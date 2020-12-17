import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {headline6, Text} from '../common/Text';

export default function BlockCount({style, lable, count, colorCount, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text type={headline6}> {lable} </Text>
      <Text type={headline6} style={styles.txtCount(colorCount)}>
        {count}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.columnCenter,
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingVertical: scale(20),
  },
  txtCount: (color) => ({
    color: color,
    marginTop: scale(5),
  }),
});
