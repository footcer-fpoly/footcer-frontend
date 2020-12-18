import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {keyNoti} from '../../helpers/data-local.helper';
import {scale} from '../../helpers/size.helper';
import {
  GAME_DETAIL_SCREEN,
  NOTIFICATION_SCREEN,
  ORDER_DETAIL_SCREEN,
  TEAM_DETAIL_SCREEN,
} from '../../navigations/route-name';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {convertDateTime} from '../../helpers/format.helper';
import {body2, body3, Text} from '../common/Text';
import {color} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import rootNavigator from '../../navigations/root.navigator';

export default function CardNoti({item}) {
  const conditionItem = () => {
    switch (item?.key) {
      case keyNoti.ACCEPT_INVITE:
      case keyNoti.ADD_MEMBER:
        return {
          iconName: 'account-group-outline',
          color: colors.main,
          navigate: TEAM_DETAIL_SCREEN,
          params: {teamID: item?.generalId},
        };
      case keyNoti.CANCEL_MEMBER:
      case keyNoti.DELETE_MEMBER:
        return {
          iconName: 'account-group-outline',
          color: colors.red,
          navigate: NOTIFICATION_SCREEN,
          params: {},
        };
      case keyNoti.REJECT:
        return {
          iconName: 'book-open',
          color: colors.red,
          navigate: ORDER_DETAIL_SCREEN,
          params: {orderId: item?.generalId},
        };
      case keyNoti.ACCEPT:
        return {
          iconName: 'book-open',
          color: colors.main,
          navigate: ORDER_DETAIL_SCREEN,
          params: {orderId: item?.generalId},
        };
      case keyNoti.JOIN_GAME:
        return {
          iconName: 'sword-cross',
          color: colors.main,
          navigate: GAME_DETAIL_SCREEN,
          params: {gameID: item?.generalId},
        };
      case keyNoti.ACCEPT_GAME:
        return {
          iconName: 'sword-cross',
          color: colors.main,
          navigate: NOTIFICATION_SCREEN,
          params: {},
        };
      case keyNoti.REFUSEJOIN:
        return {
          iconName: 'sword-cross',
          color: colors.red,
          navigate: NOTIFICATION_SCREEN,
          params: {},
        };
      default:
        return;
    }
  };

  const navigateToScreen = () => {
    rootNavigator.navigate(conditionItem()?.navigate, conditionItem()?.params);
  };

  return (
    <TouchableOpacity onPress={navigateToScreen} style={styles.container}>
      <Icon
        name={conditionItem()?.iconName}
        color={conditionItem()?.color}
        size={scale(40)}
      />
      <View style={styles.content}>
        <Text type={body2}>{item?.title}</Text>
        <Text type={body3} style={styles.txt}>
          {item?.content}
        </Text>
        <Text type={body3} style={styles.txt}>
          {convertDateTime(item?.created_at)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: scale(10),
    borderRadius: scale(10),
    paddingHorizontal: scale(15),
    paddingVertical: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: scale(10),
    flex: 1,
  },
  txt: {
    color: colors.gray,
    marginTop: scale(5),
    fontStyle: 'italic',
    flex: 1,
  },
});
