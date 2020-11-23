import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import PrimaryButton from '../common/PrimaryButton';
import {body1, headline2, headline4, Text} from '../common/Text';
import TitleTextInputField from '../common/TitleTextInputField';
import {addOrderService} from '../../api/order.api';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {StatusCode} from '../../api/status-code';

export default function ModalCreateOrder({dismiss, visible, data}) {
  const [description, setdescription] = useState('');
  const confirmOrder = async () => {
    const res = await addOrderService({
      time: data.dateOrder,
      price: data.price,
      description,
      stadiumDetailsId: data.stadiumDetailsId,
    });
    console.log(res);
    if (res && res.code === StatusCode.SUCCESS) {
      dismiss();
      alert('ok nha');
    } else {
      dismiss();
      alert('nhu cc');
    }
  };
  return (
    <Modal
      onBackButtonPress={dismiss}
      onBackdropPress={dismiss}
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        <Text type={headline4} style={styles.txtTitle}>
          Xác nhận đặt sân
        </Text>
        <View style={styles.body}>
          <Text>{data.dateOrder}</Text>
          <Text>{data.price}</Text>
          <Text>{data.timeOrder}</Text>
          <Text>{data.stadiumDetailsId}</Text>
          <TitleTextInputField
            style={styles.inputField}
            lable="Ghi chú thêm"
            sizeIcon={scale(22)}
            onChangeText={text => setdescription(text)}
            otherTextInputProps={{
              multiline: true,
              placeholder: 'Thêm ghi chú cho chủ sân',
            }}
          />
        </View>
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
    backgroundColor: colors.greenDark,
    color: colors.white,
    textAlign: 'center',
    paddingVertical: scale(15),
  },
  body: {
    paddingHorizontal: scale(10),
    marginTop: scale(20),
  },
});
