import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {convertMilisecondsToMinutes} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {STADIUM_COLLAGE_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {body3, headline5, Text} from '../common/Text';

export default function CardStadiumCollage({item}) {
  const getNavigateCollageDetail = () => {
    rootNavigator.navigate(STADIUM_COLLAGE_DETAIL_SCREEN, {
      stadiumCollageId: item.stadiumCollageId,
    });
  };
  return (
    <TouchableOpacity
      onPress={getNavigateCollageDetail}
      style={styles.container}>
      <Text type={headline5} style={styles.txtName}>
        {item.stadiumCollageName}
      </Text>
      <Text type={body3}>Sân {item.amountPeople} người</Text>
      <Text type={body3}>
        {convertMilisecondsToMinutes(item.playTime)} Phút
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.borderView(colors.white, 1, 5),
    ...Styles.columnCenter,
    padding: scale(20),
    marginRight: scale(10),
    backgroundColor: colors.white,
    minWidth: scale(200),
  },
  txtName: {
    color: colors.greenDark,
  },
});
