import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import Avatar from '../common/Avatar';
import {body3, headline5, Text} from '../common/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatToDate, formatToHours} from '../../helpers/format.helper';
import {TouchableOpacity} from 'react-native';

export default function CardGame({item}) {
  return (
    <View style={styles.container}>
      <Text type={headline5} style={styles.txtNameStadium}>
        {item?.stadium?.stadiumName}
      </Text>
      <View style={styles.wrapperContent}>
        <View style={styles.wrapperTeam}>
          <Avatar image={item?.teamHost?.teamAvatarHost} size={scale(70)} />
          <Text type={body3}>{item?.teamHost?.teamNameHost}</Text>
        </View>
        <View style={styles.warpperInfo}>
          <Text type={body3}>{item?.type}</Text>
          <Text type={body3}>{formatToHours(item?.hour)}</Text>
          <Text type={body3}>{formatToDate(item?.date)}</Text>
        </View>
        <View style={styles.wrapperTeam}>
          {item?.teamGuest?.teamAvatarGuest !== 'null' ? (
            <Avatar image={item?.teamHost?.teamAvatarHost} size={scale(70)} />
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
            <Text>{item?.teamHost?.teamNameGuest}</Text>
          ) : (
            <Text type={body3} style={styles.textGray}>
              Tham gia
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(20),
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
    color: colors.orange,
    marginBottom: scale(5),
  },
  wrapperTeam: {
    ...Styles.columnCenter,
    flex: 1,
  },
  textGray: {
    color: colors.gray,
  },
  warpperInfo: {
    ...Styles.columnCenter,
  },
});
