import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import PrimaryButton from '../common/PrimaryButton';
import {body3, headline4, Text} from '../common/Text';
import TitleTextInputField from '../common/TitleTextInputField';
import {cancelOrderService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import {HOME_SCREEN} from '../../navigations/route-name';
import rootNavigator from '../../navigations/root.navigator';
import {ToastHelper} from '../../helpers/ToastHelper';
import {listreasonCancelOrder} from '../../helpers/data-local.helper';
import TextError from '../common/TextError';

const ModalCancelOrder = forwardRef(({orderId, idOwner, nameOwner}, ref) => {
  console.log('orderId: ', orderId);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    reason: '',
    curentSeclect: '',
    err: false,
  });

  const cancelOrder = async () => {
    try {
      if (state.reason) {
        const res = await cancelOrderService({
          orderId,
          reason: state.reason,
          userId: idOwner,
          name: nameOwner,
        });
        if (res && res.code === StatusCode.SUCCESS) {
          rootNavigator.navigate(HOME_SCREEN);
          hide();
          ToastHelper.showToast('Hủy lịch đặt sân thành công');
        }
      } else {
        setState({
          ...state,
          err: true,
        });
      }
    } catch (error) {}
  };
  const selectReson = (item, index) => () => {
    setState({
      reason: item,
      curentSeclect: index,
      err: false,
    });
  };

  const renderReson = () => {
    return listreasonCancelOrder.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={selectReson(item, index)}
          style={[
            styles.reason,
            {
              backgroundColor:
                state.curentSeclect === index
                  ? colors.grayDark + 'B3'
                  : colors.grayLight,
            },
          ]}>
          <Text
            type={body3}
            style={{
              color: state.curentSeclect === index ? colors.white : colors.gray,
            }}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
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
          <View style={styles.warpperListReson}>{renderReson()}</View>
          <TitleTextInputField
            style={styles.inputField}
            value={state.reason}
            lable="Lý do"
            sizeIcon={scale(22)}
            onChangeText={(text) =>
              setState({reason: text, curentSeclect: null, err: false})
            }
            otherTextInputProps={{
              multiline: true,
              placeholder: 'Thêm lý do hủy',
            }}
          />
        </View>
        {state.err && (
          <TextError text="Hãy chọn lý do bạn muốn hủy lịch đặt sân" />
        )}
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
  warpperListReson: {flexDirection: 'row', flexWrap: 'wrap'},
  reason: {
    marginRight: scale(10),
    marginBottom: scale(10),
    paddingHorizontal: scale(15),
    paddingVertical: scale(2),
    borderRadius: scale(40),
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
