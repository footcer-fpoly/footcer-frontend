import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import PrimaryButton from '../common/PrimaryButton';
import {body1, Text} from '../common/Text';
import TitleTextInputField from '../common/TitleTextInputField';

export default function ModalCreateOrder({dismiss, visible, data}) {
  const confirmOrder = () => {
    dismiss();
  };
  return (
    <Modal
      onBackButtonPress={dismiss}
      onBackdropPress={dismiss}
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        <Text type={body1} style={styles.txtTitle}>
          Xác nhận đặt sân
        </Text>
        <Text>{data}</Text>
        <TitleTextInputField
          style={styles.inputField}
          lable="Ghi chú thêm"
          sizeIcon={scale(22)}
          //   onChangeText={text => changeFormData('description', text)}
          otherTextInputProps={{
            multiline: true,
            placeholder: 'Thêm ghi chú cho chủ sân',
          }}
        />
        <View style={styles.warpperButton}>
          <PrimaryButton
            style={[styles.btn, styles.mrRight]}
            title="Hủy bỏ"
            onPress={dismiss}
          />
          <PrimaryButton
            onPress={confirmOrder}
            style={[styles.btn, styles.mrLeft]}
            title="Xác nhận"
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  btn: {flex: 1},
  mrRight: {marginRight: spacing.tiny, backgroundColor: colors.gray},
  mrLeft: {marginLeft: spacing.tiny},
  warpperButton: {
    ...Styles.rowBetween,
    marginTop: spacing.extraLarge,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
    paddingTop: scale(40),
    paddingBottom: scale(10),
  },
  txtTitle: {
    textTransform: 'uppercase',
    backgroundColor: colors.greenDark,
    color: colors.white,
    borderRadius: scale(20),
    paddingHorizontal: scale(40),
    paddingVertical: scale(10),
    position: 'absolute',
    top: scale(-23),
    right: scale(40),
    left: scale(40),
    textAlign: 'center',
  },
});
