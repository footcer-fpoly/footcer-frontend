import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {converSecondsToTime, formatToDate} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import Avatar from '../common/Avatar';
import {body3, headline5, headline6, Text} from '../common/Text';

export default function CardGame({item}) {
  return (
    <LinearGradient
      colors={item?.teamInvite ? colors.blueGradient : colors.blueDarkGradient}
      style={styles.container}>
      <Text type={headline5} style={styles.txtNameStadium}>
        {item?.stadium?.stadiumName}
      </Text>
      <Text type={body3} style={styles.txtAddress}>
        {item?.stadium?.address}
      </Text>
      <View style={styles.wrapperContent}>
        <View style={styles.wrapperTeam}>
          <Avatar image={item?.teamHost?.teamAvatarHost} size={scale(70)} />
          <Text type={headline6} style={styles.txtNameTeam} numberOfLines={1}>
            {item?.teamHost?.teamNameHost}
          </Text>
        </View>
        <View style={styles.warpperInfo}>
          <Text type={headline6} style={styles.colorWhite}>
            {item?.type}
          </Text>
          <Text type={body3} style={styles.colorWhite}>
            {`${converSecondsToTime(
              item?.stadiumDetails?.startTimeDetail,
            )} - ${converSecondsToTime(item?.stadiumDetails?.endTimeDetail)}`}
          </Text>
          <Text type={body3} style={styles.colorWhite}>
            {formatToDate(item?.date)}
          </Text>
        </View>
        <View style={styles.wrapperTeam}>
          {item?.teamGuest?.teamAvatarGuest !== 'null' ? (
            <Avatar image={item?.teamHost?.teamAvatarGuest} size={scale(70)} />
          ) : (
            <TouchableOpacity>
              <Icon
                name="add-circle"
                color={colors.grayOpacity}
                size={scale(70)}
              />
            </TouchableOpacity>
          )}
          {item?.teamGuest?.teamNameGuest !== 'null' ? (
            <Text type={headline6} style={styles.txtNameTeam} numberOfLines={1}>
              {item?.teamHost?.teamNameGuest}
            </Text>
          ) : (
            <Text
              type={headline6}
              style={[styles.txtNameTeam, styles.textGray]}>
              Tham gia
            </Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  colorWhite: {
    color: colors.white,
  },
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
    paddingVertical: scale(20),
  },
  wrapperContent: {
    ...Styles.rowBetween,
  },
  txtNameStadium: {
    textAlign: 'center',
    color: '#ffdd59',
    marginBottom: scale(5),
    textTransform: 'uppercase',
  },
  wrapperTeam: {
    ...Styles.columnCenter,
    flex: 1,
  },
  textGray: {
    color: colors.grayOpacity,
  },
  warpperInfo: {
    ...Styles.columnCenter,
    flex: 1,
  },
  txtAddress: {
    textAlign: 'center',
    paddingHorizontal: scale(10),
    marginBottom: scale(5),
    color: colors.white,
  },
  txtNameTeam: {
    color: colors.white,
  },
});
