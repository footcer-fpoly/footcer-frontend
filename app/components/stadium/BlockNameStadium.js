import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {REVIEW_STADIUM_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {body3, headline4, Text} from '../common/Text';

export default function BlockNameStadium({item, showBtnReview}) {
  return (
    <View style={styles.container}>
      <Text type={headline4} style={styles.txtName}>
        {item?.stadiumName}
      </Text>
      <Icon name="place" color="#FF0000" size={scale(25)} />
      <Text type={body3} style={styles.txtAddress}>
        {item?.address}
      </Text>
      {showBtnReview && (
        <TouchableOpacity
          onPress={() =>
            rootNavigator.navigate(REVIEW_STADIUM_SCREEN, {item: item})
          }
          style={styles.btn}>
          <Text type={body3} style={styles.txtBtn}>
            Đánh giá sân
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.columnCenter,
    backgroundColor: colors.white,
    borderRadius: scale(8),
    paddingHorizontal: scale(24),
    marginTop: scale(-60),
    marginHorizontal: scale(20),
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: scale(4),
    elevation: 2,
    zIndex: 1,
    paddingVertical: scale(10),
  },
  txtName: {
    marginBottom: scale(10),
    color: colors.orange,
  },
  btn: {
    ...Styles.columnCenter,
    width: 120,
    backgroundColor: colors.blue,
    paddingVertical: scale(5),
    borderRadius: scale(5),
    marginTop: scale(10),
  },
  txtBtn: {
    color: colors.white,
  },
  txtAddress: {
    textAlign: 'center',
  },
});
