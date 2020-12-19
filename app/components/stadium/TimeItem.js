import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  converSecondsToTime,
  numberWithCommas,
} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import {body3, headline6, Text} from '../common/Text';

export default function TimeItem({item, key, onPress}) {
  const colorItemTime = (hasOrder) => {
    switch (hasOrder) {
      case false:
        return {
          backgroundColor: colors.white,
          colorTime: colors.black,
          colorPrice: colors.green,
        };
      case true:
        return {
          backgroundColor: colors.grayLight,
          colorTime: colors.gray,
          colorPrice: colors.gray,
        };
      case 'choose':
        return {
          backgroundColor: colors.green,
          colorTime: colors.white,
          colorPrice: colors.white,
        };
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={item.hasOrder}
      key={key}
      style={styles.itemTime(colorItemTime(item.hasOrder).backgroundColor)}>
      <Text
        type={headline6}
        style={styles.txtTitleTimeItem(colorItemTime(item.hasOrder).colorTime)}>
        {converSecondsToTime(item.startTimeDetail)} -
        {converSecondsToTime(item.endTimeDetail)}
      </Text>
      <Text
        type={body3}
        style={styles.txtPriceTimeItem(
          colorItemTime(item.hasOrder).colorPrice,
        )}>
        {numberWithCommas(item.price)}đ
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemTime: (backgroundColor) => ({
    ...Styles.borderView(colors.grayLight, 2, 5),
    ...Styles.columnCenter,
    backgroundColor: backgroundColor,
    width: scale(150),
    marginTop: scale(5),
    paddingVertical: scale(10),
  }),
  txtTitleTimeItem: (color) => ({
    color: color,
  }),
  txtPriceTimeItem: (color) => ({
    color: color,
    marginTop: spacing.tiny,
  }),
});
