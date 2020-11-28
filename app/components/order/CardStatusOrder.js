import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {converSecondsToTime, formatDateTime} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {ORDER_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {body3, headline5, headline6, Text} from '../common/Text';

export default function CardStatusOrder({item}) {
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
    <TouchableOpacity onPress={goToDetail} style={styles.container}>
      <View style={{...Styles.rowBetween}}>
        <Text type={headline6} style={styles.status(renderStatus().bgColor)}>
          {renderStatus().text}
        </Text>
        {item.order_status.status === 'REJECT' && (
          <Text type={body3} style={{color: colors.red}}>
            {item.order_status.isUser ? 'Bạn hủy' : 'Chủ sân hủy'}
          </Text>
        )}
      </View>
      <Text> {formatDateTime(item.time)} </Text>
      <Text>Cụm sân: {item.stadium.stadiumName} </Text>
      <Text>Sân con: {item.stadium_collage.stadiumCollageName} </Text>
      <Text>
        {converSecondsToTime(item.stadium_details.startTimeDetail)} -{' '}
        {converSecondsToTime(item.stadium_details.endTimeDetail)}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.borderView(colors.grayOpacity, scale(1), scale(5)),
    backgroundColor: colors.white,
    marginBottom: scale(10),
    padding: scale(10),
  },

  status: backgroundColor => {
    return {
      backgroundColor: backgroundColor,
      textTransform: 'capitalize',
      maxWidth: scale(150),
      textAlign: 'center',
      borderRadius: scale(20),
      color: colors.white,
      paddingVertical: scale(2),
      paddingHorizontal: scale(30),
    };
  },
});
