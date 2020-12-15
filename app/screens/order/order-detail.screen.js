import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {getOrderDetailService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import PrimaryButton from '../../components/common/PrimaryButton';
import {headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import ModalCancelOrder from '../../components/order/ModalCancelOrder';
import {scale} from '../../helpers/size.helper';
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
    return <ActivityIndicator size="large" color={colors.red} />;
  }
  return (
    <View>
      <ToolBar
        title="Chi tiết đặt sân"
        left={true}
        right={
          <TouchableOpacity onPress={navigateToScreen}>
            <Icon name="home" size={scale(25)} color={colors.black} />
          </TouchableOpacity>
        }
      />
      {state?.data?.order_status?.status === 'WAITING' && (
        <PrimaryButton
          onPress={showModal}
          style={{backgroundColor: colors.orange}}
          title="HỦY LỊCH ĐẶT SÂN"
        />
      )}
      <ModalCancelOrder ref={modalAddRef} orderId={state.data.orderId} />
    </View>
  );
}
const styles = StyleSheet.create({});
