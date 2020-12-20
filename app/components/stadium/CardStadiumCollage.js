import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {convertMilisecondsToMinutes} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {body3, headline5, Text} from '../common/Text';

export default function CardStadiumCollage({item, choose, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(choose)}>
      <Text type={headline5} style={styles.txtName(choose)}>
        {item.stadiumCollageName}
      </Text>
      <Text type={body3} style={{color: choose ? colors.white : colors.black}}>
        Sân {item.amountPeople} người
      </Text>
      <Text type={body3} style={{color: choose ? colors.white : colors.black}}>
        {convertMilisecondsToMinutes(item.playTime)} Phút
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: (choose) => ({
    ...Styles.borderView(colors.white, 1, 5),
    ...Styles.columnCenter,
    padding: scale(10),
    marginRight: scale(10),
    backgroundColor: choose ? colors.greenDark : colors.white,
    minWidth: scale(150),
  }),
  txtName: (choose) => ({
    color: choose ? colors.white : colors.greenDark,
  }),
});
