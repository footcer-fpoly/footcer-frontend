import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {converSecondsToTime, formatDateTime} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import useStatusOrder from '../../hooks/useStatusOrder';
import rootNavigator from '../../navigations/root.navigator';
import {ORDER_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {body2, body3, headline5, headline6, Text} from '../common/Text';

export default function CardStatusOrder({item, onPress}) {
  const goToDetail = () => {
    rootNavigator.navigate(ORDER_DETAIL_SCREEN, {orderId: item.orderId});
  };
  const statusOrder = useStatusOrder(item?.order_status?.status);

  return (
    <TouchableOpacity
      onPress={onPress ? onPress : goToDetail}
      style={styles.container(statusOrder.bgColor)}>
      <View style={{...Styles.rowBetween}}>
        <Text type={headline6} style={styles.status(statusOrder.bgColor)}>
          {statusOrder.text}
        </Text>
        {item.order_status.status === 'REJECT' && (
          <Text
            type={body3}
            style={{color: colors.red, marginRight: scale(10)}}>
            {item.order_status.isUser ? 'Bạn hủy' : 'Chủ sân hủy'}
          </Text>
        )}
      </View>
      <View style={styles.body}>
        <Image
          style={styles.image}
          source={{
            uri: item?.stadium?.image,
          }}
        />
        <View style={styles.warpperContent}>
          <Text type={headline5}>{formatDateTime(item.time)}</Text>
          <Text type={body3} style={styles.txtTime}>
            {converSecondsToTime(item.stadium_details.startTimeDetail)} -
            {converSecondsToTime(item.stadium_details.endTimeDetail)}
          </Text>
          <Text type={body3} style={styles.txt}>
            {item.stadium.stadiumName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (color) => ({
    backgroundColor: colors.white,
    marginBottom: scale(10),
    borderBottomWidth: scale(5),
    borderBottomColor: color + 'B3',
    overflow: 'hidden',
    borderRadius: scale(10),
  }),

  status: (backgroundColor) => {
    return {
      backgroundColor: backgroundColor,
      textTransform: 'capitalize',
      textAlign: 'center',
      color: colors.white,
      paddingVertical: scale(2),
      paddingHorizontal: scale(30),
      marginBottom: scale(5),
      borderBottomRightRadius: scale(5),
    };
  },

  body: {
    paddingRight: scale(10),
    paddingBottom: scale(10),
    flexDirection: 'row',
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(10),
    marginLeft: scale(5),
  },
  warpperContent: {
    marginLeft: scale(5),
  },
  txt: {
    maxWidth: scale(240),
    marginTop: scale(5),
    color: colors.grayDark,
  },
  txtTime: {
    color: colors.gray,
  },
});
