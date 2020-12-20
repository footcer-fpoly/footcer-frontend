import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {STADIUM_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {body3, headline2, headline5, headline6, Text} from '../common/Text';

export default function CardPromotion() {
  const navigateToStadium = () => {
    rootNavigator.navigate(STADIUM_SCREEN);
  };
  return (
    <LinearGradient colors={colors.greenGrayGradient} style={styles.container}>
      <View style={{...Styles.flexRow}}>
        <View style={styles.warpperIcon}>
          <FontAwesome name="bookmark" size={scale(100)} color="red" />
          <Text type={headline2} style={styles.txt50}>
            - 50%
          </Text>
        </View>
        <View style={{marginTop: scale(5)}}>
          <Text type={headline5} style={{color: colors.white}}>
            KHUYẾN MÃI CỰC HẤP DẪN
          </Text>
          <Text style={{color: colors.white, marginTop: scale(15)}}>
            Nhập mã{' '}
            <Text type={headline5} style={{color: colors.yellow}}>
              FOOTCER VIP PRO
            </Text>
          </Text>
          <Text type={headline6} style={styles.txtSub}>
            Để giảm 50% cho lần đặt sân đầu tiên
          </Text>
        </View>
      </View>
      <View style={styles.warpperBtn}>
        <TouchableOpacity onPress={navigateToStadium} style={styles.btn}>
          <Text
            type={body3}
            style={{color: colors.greenDark, marginRight: scale(5)}}>
            Đặt sân
          </Text>
          <Icon name="arrow-right" size={scale(15)} color={colors.greenDark} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: scale(10),
    marginTop: scale(10),
    paddingHorizontal: scale(10),
    overflow: 'hidden',
    paddingBottom: scale(20),
  },
  txt50: {color: colors.white, position: 'absolute', top: scale(25)},
  txtSub: {
    flex: 1,
    marginLeft: scale(10),
    color: colors.white,
    marginTop: scale(5),
  },
  warpperBtn: {alignItems: 'flex-end', marginTop: scale(20)},
  btn: {
    ...Styles.rowCenter,
    width: scale(100),
    backgroundColor: colors.white,
    paddingVertical: scale(10),
    borderRadius: scale(50),
  },
  warpperIcon: {
    ...Styles.columnCenter,
    marginTop: scale(-8),
    marginRight: scale(10),
  },
});
