import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {STADIUM_COLLAGE_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {body2, body3, Text} from '../common/Text';

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
      <Text type={body2}>{item.stadiumCollageName}</Text>
      <Text type={body3}>Sân {item.amountPeople} người</Text>
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
});
