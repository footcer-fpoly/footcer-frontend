import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {headline5, Text} from '../common/Text';

export default function DateItem({item, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(item.choose)}>
      <Text type={headline5} style={styles.txt(item.choose)}>
        {item.date}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: choose => {
    return {
      backgroundColor: choose ? colors.green : colors.grayOpacity,
      marginRight: scale(10),
      borderRadius: scale(3),
      paddingVertical: scale(5),
      alignItems: 'center',
    };
  },
  txt: choose => {
    return {
      color: choose ? colors.white : colors.gray,
    };
  },
});
