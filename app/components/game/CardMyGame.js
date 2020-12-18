import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  compareDateTime,
  converSecondsToTime,
  formatToDate,
} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {GAME_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import Avatar from '../common/Avatar';
import PrimaryButton from '../common/PrimaryButton';
import {body3, headline5, headline6, Text} from '../common/Text';

export default function YourMatch({item}) {
  const navigateToDetail = () => {
    rootNavigator.navigate(GAME_DETAIL_SCREEN, {gameId: item?.gameId});
  };

  const renderBgTop = () => {
    if (compareDateTime(item?.date, new Date())) {
      return colors.greenDark;
    }
    return colors.grayDark;
  };
  return (
    <View style={styles.container}>
      <View style={styles.top(renderBgTop())}>
        <Text type={headline6} style={styles.txtDate}>
          {formatToDate(item?.date)}
        </Text>
        <Text type={body3} style={styles.txtTime}>
          {`${converSecondsToTime(
            item?.stadiumDetails?.startTimeDetail,
          )} -${converSecondsToTime(item?.stadiumDetails?.endTimeDetail)}`}
        </Text>
      </View>
      <View style={styles.center}>
        <View style={styles.warpperTeam}>
          <Text type={headline5} numberOfLines={1} style={styles.txtNameTeam}>
            {item?.teamHost?.teamNameHost}
          </Text>
          <Avatar
            borderWidth={1}
            borderColor={colors.gray}
            image={item?.teamHost?.teamAvatarHost}
            size={scale(80)}
          />
        </View>
        <Text type={body3} style={styles.txtType}>
          {item?.type}
        </Text>
        {item?.teamIdGuest ? (
          <View style={styles.warpperTeam}>
            <Text type={headline5} numberOfLines={1} style={styles.txtNameTeam}>
              {item?.teamGuest?.teamNameGuest}
            </Text>
            <Avatar
              borderWidth={1}
              borderColor={colors.gray}
              image={item?.teamGuest?.teamAvatarGuest}
              size={scale(80)}
            />
          </View>
        ) : (
          <View style={styles.warpperTeam}>
            <Text
              type={headline6}
              style={
                styles.txtConfirm
              }>{`DS đội chờ xác nhận tham gia tham gia (${
              item?.teamInvite?.lenght || 0
            })`}</Text>
          </View>
        )}
      </View>
      <View style={styles.bottom}>
        <Text type={headline5} numberOfLines={1}>
          {item?.stadium?.stadiumName}
        </Text>
        <View style={styles.warpperAddress}>
          <Icon name="place" color="#FF0000" size={scale(20)} />
          <Text type={body3} style={styles.txtAddress}>
            {item?.stadium?.address}
          </Text>
        </View>
      </View>
      <PrimaryButton
        title="Xem chi tiết"
        style={{backgroundColor: colors.orange, marginTop: scale(10)}}
        onPress={navigateToDetail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: colors.white,
    borderRadius: scale(5),
    marginHorizontal: scale(10),
    overflow: 'hidden',
  },
  top: (bg) => ({
    ...Styles.rowAlignCenter,
    backgroundColor: bg,
    paddingVertical: scale(3),
    paddingHorizontal: scale(10),
  }),
  txtDate: {
    color: colors.white,
    flex: 1,
  },
  txtTime: {
    color: colors.white,
    flex: 0,
  },

  center: {
    ...Styles.rowBetween,
    marginTop: scale(10),
    paddingHorizontal: scale(10),
  },
  txtType: {
    ...Styles.borderView(colors.main, 1, scale(5)),
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
    marginTop: scale(5),
  },
  txtNameTeam: {
    color: colors.greenDark,
    maxWidth: scale(80),
    flex: 0,
  },
  txtConfirm: {
    textAlign: 'center',
  },
  warpperTeam: {
    ...Styles.columnCenter,
    flex: 1,
    paddingHorizontal: scale(10),
  },
  bottom: {
    marginTop: scale(10),
    paddingHorizontal: scale(10),
  },
  warpperAddress: {
    ...Styles.rowAlignCenter,
    marginTop: scale(5),
  },
  txtAddress: {
    marginLeft: scale(5),
    flex: 1,
  },
});
