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
import {
  body2,
  body3,
  headline2,
  headline4,
  headline5,
  Text,
} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import ModalCancelOrder from '../../components/order/ModalCancelOrder';
import {
  convertDateTime,
  formatDateTime,
  numberWithCommas,
} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import useStatusOrder from '../../hooks/useStatusOrder';
import rootNavigator from '../../navigations/root.navigator';
import {HOME_SCREEN, STADIUM_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import {formatToDate, convertPlayTime} from '../../helpers/format.helper';
import TitleTextInputField from '../../components/common/TitleTextInputField';
import {callPhone} from '../../helpers/call-phone.helper';
import {direction} from '../../helpers/direction.helper';

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
  const navigateToStadium = () => {
    rootNavigator.navigate(STADIUM_DETAIL_SCREEN, {
      stadiumId: state?.data?.stadium?.stadiumId,
    });
  };
  const renderReson = () => {
    if (state?.data?.order_status?.status === 'REJECT') {
      return (
        <View>
          <Text type={headline5} style={{color: colors.orange}}>
            {state?.data?.order_status?.isUser
              ? 'Bạn đã hủy với lý do:'
              : ' Chủ sân hủy với lý do:'}
          </Text>
          <Text type={body3} style={styles.txtReason}>
            {state?.data?.order_status?.reason}
          </Text>
        </View>
      );
    }
  };
  const renderBtnLeft = () => {
    console.log('LOG -> status', state?.data?.order_status?.status);
    switch (state?.data?.order_status?.status) {
      case 'WAITING':
        return (
          <TouchableOpacity
            onPress={showModal}
            style={styles.btnLeft(colors.red)}>
            <Text type={headline5} style={{color: colors.white}}>
              HỦY LỊCH ĐẶT SÂN
            </Text>
          </TouchableOpacity>
        );
      case 'ACCEPT':
        return (
          <TouchableOpacity
            onPress={callPhone()}
            style={styles.btnLeft(colors.yellowDark)}>
            <Text type={headline5} style={{color: colors.white}}>
              LIÊN HỆ
            </Text>
          </TouchableOpacity>
        );
      case 'FINISH':
      case 'REJECT':
        return (
          <TouchableOpacity
            onPress={navigateToStadium}
            style={styles.btnLeft(colors.main)}>
            <Text type={headline5} style={{color: colors.white}}>
              ĐẶT LẠI
            </Text>
          </TouchableOpacity>
        );
      default:
        break;
    }
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
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerScroll}>
        <View>
          <Image
            source={{
              uri: state?.data?.stadium?.image,
            }}
            style={styles.image}
          />
          <Text body={headline4} style={styles.txtStatus(statusOrder.bgColor)}>
            {statusOrder.text}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            marginTop: scale(10),
            paddingHorizontal: scale(10),
            paddingTop: scale(10),
            paddingBottom: scale(20),
          }}>
          <View style={styles.wrapperTime}>
            <Text type={headline2}>{formatDateTime(state?.data?.time)}</Text>
            <Text type={headline2} style={styles.txtTime(statusOrder.bgColor)}>
              {convertPlayTime(
                state?.data?.stadium_details?.startTimeDetail,
                state?.data?.stadium_details?.endTimeDetail,
              )}
            </Text>
          </View>
          {renderReson()}
          <RowProflie
            label="Cụm sân: "
            value={state?.data?.stadium?.stadiumName}
            iconType={IconType.MaterialCommunityIcons}
            iconName="stadium"
            editable={false}
            otherTextInputProps={{
              multiline: true,
            }}
          />
          <RowProflie
            label="Sân con: "
            value={state?.data?.stadium_collage?.stadiumCollageName}
            iconType={IconType.MaterialCommunityIcons}
            iconName="ballot-outline"
            editable={false}
          />
          <RowProflie
            label="Địa chỉ: "
            value={state?.data?.stadium?.address}
            iconType={IconType.MaterialIcons}
            iconName="location-on"
            editable={false}
            otherTextInputProps={{
              multiline: true,
            }}
          />
          <RowProflie
            label="Loại sân: "
            value={state?.data?.stadium?.category}
            iconType={IconType.MaterialIcons}
            iconName="dashboard"
            editable={false}
          />
          <RowProflie
            label="Sân: "
            value={`${state?.data?.stadium_collage?.amountPeople} vs ${state?.data?.stadium_collage?.amountPeople}`}
            iconType={IconType.MaterialIcons}
            iconName="supervisor-account"
            editable={false}
          />

          <RowProflie
            label="Giá tiền: "
            value={`${numberWithCommas(
              state?.data?.stadium_details?.price,
            )} vnđ`}
            iconType={IconType.MaterialIcons}
            iconName="attach-money"
            editable={false}
          />
          <Text />
          <TitleTextInputField
            style={styles.inputField}
            lable="Ghi chú thêm cho chủ sân của bạn"
            sizeIcon={scale(22)}
            value={state?.data?.description}
            otherTextInputProps={{
              multiline: true,
              editable: false,
            }}
          />
        </View>
        <Text
          type={body3}
          style={
            styles.txtCreate
          }>{`Bạn đã gữi yêu cầu đặt sân vào lúc ${convertDateTime(
          state?.data?.createdAt,
        )}`}</Text>
      </ScrollView>
      <View style={styles.wrapperBtn}>
        <View style={{...Styles.flexRow}}>
          {renderBtnLeft()}
          <TouchableOpacity
            onPress={direction(
              state?.data?.stadium?.latitude,
              state?.data?.stadium?.longitude,
              state?.data?.stadium?.address,
            )}
            style={styles.btnDirec}>
            <Text type={headline5} style={{color: colors.white}}>
              CHỈ ĐƯỜNG
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalCancelOrder
        ref={modalAddRef}
        orderId={state.data.orderId}
        nameCollage={state?.data?.stadium_collage?.stadiumCollageName}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  flex1: {flex: 1, backgroundColor: colors.viewBackground},
  scrollContainer: {
    ...Styles.flex1,
    backgroundColor: colors.viewBackground,
  },
  contentContainerScroll: {
    paddingBottom: scale(20),
  },
  image: {
    width: '100%',
    height: scale(220),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  txtStatus: (bg) => ({
    backgroundColor: bg,
    position: 'absolute',
    bottom: scale(10),
    left: scale(10),
    paddingHorizontal: scale(30),
    paddingVertical: scale(2),
    color: colors.white,
    fontWeight: 'bold',
    borderRadius: scale(20),
  }),
  wrapperBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(10),
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    paddingVertical: scale(10),
  },
  btnLeft: (bg) => ({
    ...Styles.columnCenter,
    backgroundColor: bg,
    paddingHorizontal: scale(15),
    paddingVertical: scale(12),
    borderRadius: scale(50),
    marginRight: scale(10),
    flex: 1,
  }),
  btnDirec: {
    backgroundColor: colors.blueDark,
    paddingHorizontal: scale(25),
    paddingVertical: scale(12),
    borderRadius: scale(50),
  },
  txtCreate: {
    color: colors.gray,
    marginTop: scale(15),
    textAlign: 'center',
    flex: 1,
  },
  wrapperTime: {
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  txtReason: {
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
    marginTop: scale(5),
    color: colors.gray,
    flex: 1,
  },
  txtTime: (bg) => ({
    color: bg,
    textAlign: 'right',
    marginTop: scale(5),
  }),
});
