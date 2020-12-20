import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {addOrderService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import {numberWithCommas} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigator from '../../navigations/root.navigator';
import {ORDER_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import RowProflie from '../account/RowProflie';
import {IconType} from '../common/IconMaterialOrSvg';
import PrimaryButton from '../common/PrimaryButton';
import {headline4, Text} from '../common/Text';
import TitleTextInputField from '../common/TitleTextInputField';

export default function ModalCreateOrder({dismiss, visible, data}) {
  const [description, setdescription] = useState('');
  const [loading, setLoading] = useState(false);
  const confirmOrder = async () => {
    try {
      setLoading(true);
      const res = await addOrderService({
        time: data.dateOrder,
        price: data.price,
        description,
        stadiumDetailsId: data.stadiumDetailsId,
        stadiumUserId: data.stadiumUserId,
        stadiumName: data.nameCollage,
        stadiumTime: data.timeOrder,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        dismiss();
        ToastHelper.showToast('Bạn đã đặt lịch thành công', colors.greenDark);
        rootNavigator.replace(ORDER_DETAIL_SCREEN, {
          orderId: res?.data?.orderId,
        });
      } else {
        dismiss();
        ToastHelper.showToast('Lỗi');
      }
    } catch (error) {
      console.log(
        'LOG -> file: ModalCreateOrder.js -> line 44 -> confirmOrder -> error',
        error,
      );
      dismiss();
      ToastHelper.showToast('Lỗi');
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
          <RowProflie
            label="Cụm sân: "
            value={data.nameSadium}
            iconType={IconType.MaterialCommunityIcons}
            iconName="stadium"
            editable={false}
            otherTextInputProps={{
              multiline: true,
            }}
          />
          <RowProflie
            label="Sân con: "
            value={data.nameCollage}
            iconType={IconType.MaterialCommunityIcons}
            iconName="ballot-outline"
            editable={false}
          />
          <RowProflie
            label="Ngày: "
            value={data.dateOrder}
            iconType={IconType.MaterialCommunityIcons}
            iconName="calendar-month-outline"
            editable={false}
          />
          <RowProflie
            label="Thời gian: "
            value={data.timeOrder}
            iconType={IconType.MaterialCommunityIcons}
            iconName="clock-time-four-outline"
            editable={false}
          />
          <RowProflie
            label="Giá tiền: "
            value={`${numberWithCommas(data.price)} vnđ`}
            iconType={IconType.MaterialIcons}
            iconName="attach-money"
            editable={false}
          />
          <TitleTextInputField
            style={styles.inputField}
            lable="Ghi chú thêm"
            sizeIcon={scale(22)}
            onChangeText={(text) => setdescription(text)}
            otherTextInputProps={{
              multiline: true,
              placeholder: 'Thêm ghi chú cho chủ sân',
            }}
          />
        </View>
        <View style={styles.warpperButton}>
          <PrimaryButton
            style={[styles.btn, styles.mrRight]}
            title="Hủy"
            onPress={dismiss}
            disabled={loading}
          />
          <PrimaryButton
            onPress={confirmOrder}
            style={[styles.btn, styles.mrLeft]}
            title="Xác nhận"
            disabled={loading}
            right={
              loading && <ActivityIndicator size="small" color={colors.white} />
            }
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  btn: {flex: 1, paddingHorizontal: scale(10)},
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
  inputField: {
    marginTop: scale(15),
  },
});
