import React, {Component} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import PrimaryButton from '../common/PrimaryButton';
import {body2, body3, Text} from '../common/Text';
import animationOnLocation from '../../assets/lottie-animation/on-location.json';
import spacing from '../../theme/spacing';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import LottieView from 'lottie-react-native';
import colors from '../../theme/colors';

export default function PermissionFail() {
  const openSetting = () => {
    Linking.openSettings();
  };
  return (
    <View
      style={[
        styles.container,
        {...Styles.columnCenter, paddingHorizontal: scale(20)},
      ]}>
      <LottieView
        source={animationOnLocation}
        style={{width: scale(250)}}
        autoPlay
        loop
      />
      <Text type={body3} style={styles.txt}>
        Hãy cho phép ứng dụng quyền truy cập vị trí để tiếp tục đặt sân
      </Text>
      <PrimaryButton onPress={openSetting} title="Đi đến cài đặt" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    textAlign: 'center',
    color: colors.gray,
    marginTop: spacing.small,
    marginBottom: spacing.extraLarge,
    paddingHorizontal: scale(30),
    textTransform: 'uppercase',
  },
});
