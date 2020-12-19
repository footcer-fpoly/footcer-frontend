import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import PrimaryButton from '../common/PrimaryButton';
import {headline4, Text} from '../common/Text';
import TitleTextInputField from '../common/TitleTextInputField';
import {cancelOrderService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import {HOME_SCREEN} from '../../navigations/route-name';
import rootNavigator from '../../navigations/root.navigator';
import {ToastHelper} from '../../helpers/ToastHelper';

const ModalCancelOrder = forwardRef(({orderId, idOwner, nameOwner}, ref) => {
  console.log('orderId: ', orderId);
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');

  const cancelOrder = async () => {
    const res = await cancelOrderService({
      orderId,
      reason,
      userId: idOwner,
      name: nameOwner,
    });
    if (res && res.code === StatusCode.SUCCESS) {
      rootNavigator.navigate(HOME_SCREEN);
      hide();
      ToastHelper.showToast('Hủy lịch đặt sân thành công');
    }
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  return (
    <Modal
      onBackButtonPress={hide}
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        <Text type={headline4} style={styles.txtTitle}>
          Hủy đặt sân
        </Text>
        <View style={styles.body}>
          <TitleTextInputField
            style={styles.inputField}
            lable="Lý do"
            sizeIcon={scale(22)}
            onChangeText={(text) => setReason(text)}
            otherTextInputProps={{
              multiline: true,
              placeholder: 'Thêm lý do hủy',
            }}
          />
        </View>
        <View style={styles.warpperButton}>
          <PrimaryButton
            style={[styles.btn, styles.mrRight]}
            title="Hủy bỏ"
            onPress={hide}
          />
          <PrimaryButton
            onPress={cancelOrder}
            style={[styles.btn, styles.mrLeft]}
            title="Xác nhận"
          />
        </View>
      </View>
    </Modal>
  );
});

export default ModalCancelOrder;
const styles = StyleSheet.create({
  btn: {flex: 1},
  mrRight: {marginRight: spacing.tiny, backgroundColor: colors.gray},
  mrLeft: {marginLeft: spacing.tiny, backgroundColor: colors.red},
  warpperButton: {
    ...Styles.rowBetween,
    paddingHorizontal: scale(10),
    marginTop: spacing.extraLarge,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: scale(5),
    paddingBottom: scale(10),
    overflow: 'hidden',
  },
  txtTitle: {
    textTransform: 'uppercase',
    backgroundColor: colors.red,
    color: colors.white,
    textAlign: 'center',
    paddingVertical: scale(15),
  },
  body: {
    paddingHorizontal: scale(10),
    marginTop: scale(20),
  },
});
