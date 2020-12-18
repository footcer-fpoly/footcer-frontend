import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {getOrderDetailService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import avatar from '../.././assets/images/avatar.jpg'
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

        <Image 
        source={avatar} 
        style={{
          width:'100%', height:'40%',
          borderBottomLeftRadius:20, 
          borderBottomRightRadius:20,
          marginBottom:10
          }}/>
          <View style={styles.container}>
            <Text style={styles.nameDetail}>Sân bóng Chảo Lửa</Text>
            <View style={styles.marginView}>
              <View style={styles.inContainer}>
                <Text>Ngày:</Text>
                <Text>17/12/2020</Text>
              </View>
              <View style={styles.textDetail}>
                <Text>Thời gian:</Text>
                <Text>17:00 - 20:00</Text>
              </View>
              <View style={styles.textDetail}>
                <Text>Loại sân:</Text>
                <Text>Sân 5</Text>
              </View>
              <View style={styles.textDetail}>
                <Text>Địa chỉ:</Text>
                <Text>2 Phan Thúc Duyện, Tân Bình</Text>
              </View>
              <View style={styles.textDetail}>
                <Text>Trạng thái:</Text>
                <Text>Đang chờ xác nhận</Text>
              </View>
              <View style={styles.textDetail}>
                <Text>Giá tiền:</Text>
                <Text>1200000</Text>
              </View>
            </View>
          </View>

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
const styles = StyleSheet.create({
  container: {
    marginVertical:10, 
    backgroundColor:'white',
    paddingVertical:20
    },
  textDetail: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginTop:5
    },
  nameDetail: {
      fontSize: 22,
      marginHorizontal:20, 
      color: colors.black
    },
  marginView: {marginHorizontal:20,marginVertical:20},
  inContainer: {
      flexDirection:'row',
      alignItems: 'center', 
      justifyContent:'space-between'
    },
    

});
