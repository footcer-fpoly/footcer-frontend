import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {body3, headline6, Text} from './Text';

export default function RowInfo({lable, value}) {
  return (
    <View style={styles.container}>
      <Text type={headline6} style={styles.txtLable}>
        {lable}
      </Text>
      <Text type={body3} style={styles.txtValue}>
        {value}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Styles.rowBetween,
    borderBottomColor: colors.gray,
    borderBottomWidth: scale(0.5),
    paddingVertical: scale(5),
    marginBottom: scale(10),
  },
  txtLable: {
    color: colors.gray,
    flex: 0,
    marginRight: scale(10),
  },
  txtValue: {
    flex: 1,
    textAlign: 'right',
    color: colors.gray,
  },
});
