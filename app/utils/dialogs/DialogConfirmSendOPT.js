import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import PrimaryButton from '../../components/common/PrimaryButton';
import {body2, headline3, Text} from '../../components/common/Text';
import {scale} from '../../helpers/size.helper';
import rootNavigator from '../../navigations/root.navigator';
import {OTP_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const DialogConfirmSendOPT = ({
  phone,
  flag,
  navigation,
  visible,
  dismiss,
  data,
  title,
  changePass,
}) => {
  const _gotoOTPScreen = (phone, flag, dismiss, data) => () => {
    dismiss();
    rootNavigator.navigate(OTP_SCREEN, {phone, flag, data});
  };
  return (
    <Modal
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        <Text type={headline3} style={styles.txtTitle}>
          {changePass ? 'Xác thực số điện thoại' : 'Đăng kí tài khoản'}
        </Text>
        <Text type={headline3} style={styles.txtPhone}>
          {phone}
        </Text>
        <Text type={body2}>
          {changePass
            ? `Chúng tôi sẻ gửi một mã xác thực đến ${phone}. Bạn có muốn tiếp tục?`
            : `Số điện thoại chưa được đặng kí tài khoản. Chúng tôi sẻ gửi một mã xác thực đến ${phone}. Bạn có muốn tiếp tục? `}
        </Text>
        <View style={styles.footer}>
          <PrimaryButton
            onPress={dismiss}
            title="HỦY"
            style={[styles.flex49, styles.colorGray]}
          />
          <PrimaryButton
            onPress={_gotoOTPScreen(phone, flag, dismiss, data)}
            title="TIẾP TỤC"
            style={styles.flex49}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DialogConfirmSendOPT;

const styles = StyleSheet.create({
  flex49: {
    flex: 0.49,
  },
  colorGray: {
    backgroundColor: colors.grayDark,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: scale(5),
    paddingHorizontal: scale(20),
    paddingVertical: scale(30),
  },
  txtTitle: {
    color: colors.gray,
  },
  txtPhone: {
    color: colors.greenDark,
    marginTop: spacing.large,
    marginBottom: spacing.small,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.extraLarge,
  },
});
