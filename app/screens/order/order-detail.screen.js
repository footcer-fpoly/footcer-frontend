import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {getOrderDetailService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import RowProflie from '../../components/account/RowProflie';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import PrimaryButton from '../../components/common/PrimaryButton';
import {Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import ModalCancelOrder from '../../components/order/ModalCancelOrder';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import useStatusOrder from '../../hooks/useStatusOrder';
import rootNavigator from '../../navigations/root.navigator';
import {HOME_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';

export default function orderDetail({route}) {
  const {orderId} = route.params;
  const modalAddRef = useRef();

  const [state, setState] = useState({
    onReady: false,
    data: {},
  });
  const statusOrder = useStatusOrder(state?.data?.order_status?.status);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getOrderDetailService(orderId);
    console.log(res);
    if (res && res.code === StatusCode.SUCCESS) {
      setState({
        onReady: true,
        data: res.data,
      });
    }
  };
  const showModal = () => {
    modalAddRef.current.show();
  };
  const navigateToScreen = () => {
    rootNavigator.navigate(HOME_SCREEN);
  };

  if (!state.onReady) {
    return (
      <View style={styles.flex1}>
        <ToolBar
          title="Chi tiết đặt sân"
          left={true}
          right={
            <TouchableOpacity onPress={navigateToScreen}>
              <Icon name="home" size={scale(25)} color={colors.black} />
            </TouchableOpacity>
          }
        />
        <Text />
        <ActivityIndicator size="small" color={colors.greenDark} />
      </View>
    );
  }
  return (
    <View style={styles.flex1}>
      <ToolBar
        title="Chi tiết đặt sân"
        left={true}
        right={
          <TouchableOpacity onPress={navigateToScreen}>
            <Icon name="home" size={scale(25)} color={colors.black} />
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.scrollContainer}>
        <Image
          source={{
            uri: state?.data?.stadium?.image,
          }}
          style={styles.image}
        />
        <RowProflie
          label="Phường/Xã"
          value={state?.data?.stadium?.stadiumName}
          iconType={IconType.MaterialIcons}
          iconName="festival"
          editable={false}
        />
        <Text>{`Trạng thái ${statusOrder.text}`}</Text>
      </ScrollView>
      <View style={styles.wrapperBtn}>
        {state?.data?.order_status?.status === 'WAITING' && (
          <PrimaryButton
            onPress={showModal}
            style={{backgroundColor: colors.orange}}
            title="HỦY LỊCH ĐẶT SÂN"
          />
        )}
      </View>
      <ModalCancelOrder ref={modalAddRef} orderId={state.data.orderId} />
    </View>
  );
}
const styles = StyleSheet.create({
  flex1: {flex: 1, backgroundColor: colors.viewBackground},
  scrollContainer: {
    ...Styles.flex1,
    backgroundColor: colors.viewBackground,
  },
  image: {
    width: '100%',
    height: scale(200),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(10),
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    paddingVertical: scale(10),
  },
});
