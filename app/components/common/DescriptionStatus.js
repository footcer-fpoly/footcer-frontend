import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {body3, Text} from './Text';

export default function DescriptionStatus({color, lable}) {
  return (
    <View style={styles.warpperStatus}>
      <View style={styles.status(color)} />
      <Text type={body3} style={styles.txtStatus}>
        {lable}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  status: bg => ({
    width: scale(20),
    height: scale(20),
    backgroundColor: bg,
    borderRadius: scale(5),
  }),
  txtStatus: {
    marginLeft: scale(5),
  },
  warpperStatus: {
    ...Styles.rowAlignCenter,
    flex: 1,
  },
});
