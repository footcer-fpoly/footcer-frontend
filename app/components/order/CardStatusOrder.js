import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {converSecondsToTime, formatDateTime} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {ORDER_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {body2, body3, headline5, headline6, Text} from '../common/Text';

export default function CardStatusOrder({item, onPress}) {
  const goToDetail = () => {
    rootNavigator.navigate(ORDER_DETAIL_SCREEN, {orderId: item.orderId});
  };
  const renderStatus = () => {
    switch (item.order_status.status) {
      case 'ACCEPT':
        return {bgColor: colors.green, text: 'Đã xác nhận'};
      case 'WAITING':
        return {bgColor: colors.yellow, text: 'Chờ xác nhận'};
      case 'REJECT':
        return {bgColor: colors.red, text: 'Đã hủy'};
      case 'FINISH':
        return {bgColor: colors.gray, text: 'Đã hoàn thành'};
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : goToDetail}
      style={styles.container(renderStatus().bgColor)}>
      <View style={{...Styles.rowBetween}}>
        <Text type={headline6} style={styles.status(renderStatus().bgColor)}>
          {renderStatus().text}
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
          <Text type={body3} style={styles.txt}>
            Cụm sân: {item.stadium.stadiumName}
          </Text>
          <Text type={body3} style={styles.txt}>
            Sân con: {item.stadium_collage.stadiumCollageName}
          </Text>
          <Text type={body3} style={styles.txt}>
            Thời gian:
            {converSecondsToTime(item.stadium_details.startTimeDetail)} -
            {converSecondsToTime(item.stadium_details.endTimeDetail)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: (color) => ({
    ...Styles.borderView(colors.grayOpacity, scale(1), scale(5)),
    backgroundColor: colors.white,
    marginBottom: scale(10),
    borderBottomWidth: scale(5),
    borderBottomColor: color + 'B3',
    overflow: 'hidden',
  }),

  status: (backgroundColor) => {
    return {
      backgroundColor: backgroundColor,
      textTransform: 'capitalize',
      textAlign: 'center',
      color: colors.white,
      paddingVertical: scale(2),
      paddingHorizontal: scale(30),
      marginBottom: scale(10),
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
  },
  warpperContent: {
    marginLeft: scale(5),
  },
  txt: {
    maxWidth: scale(240),
    marginTop: scale(5),
    color: colors.orange,
  },
});
