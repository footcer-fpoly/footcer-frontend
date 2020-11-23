import React, {useRef, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/Octicons';
import {getStadiumCollageDetailService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import BackIcon from '../../components/common/BackIcon';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import PrimaryButton from '../../components/common/PrimaryButton';
import {headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import DateItem from '../../components/stadium/DateItem';
import ModalCreateOrder from '../../components/stadium/ModalCreateOrder';
import SectionChooseDate from '../../components/stadium/SectionChooseDate';
import SectionChooseTime from '../../components/stadium/SectionChooseTime';
import TimeItem from '../../components/stadium/TimeItem';
import {
  detachedArray,
  diffHours,
  renderNextDays,
  formatToDate,
} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigator from '../../navigations/root.navigator';
import colors from '../../theme/colors';
import dimens from '../../theme/dimens';
import spacing from '../../theme/spacing';

export default function StadiumCollageDetailScreen({route, navigation}) {
  const {stadiumCollageId} = route.params;
  const chooseDateRef = useRef();
  const [data, setData] = useState({
    date: null,
    listTime: [],
    onReady: false,
  });
  const [order, setOrder] = useState({
    nameSadium: '',
    timeOrder: '',
    dateOrder: '',
    price: 0,
    description: '',
    stadiumDetailsId: stadiumCollageId,
  });

  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    const date = chooseDateRef.current.getValue();
    console.log(date);
    if (date) {
      getData(date);
    }
  });
  const getData = async date => {
    try {
      const res = await getStadiumCollageDetailService({
        stadiumCollageId,
        date,
      });
      console.log('=====', res);
      if (res && res.code === StatusCode.SUCCESS) {
      } else {
        console.log('getStadiumCollageDetailService --> Failed');
        ToastHelper.showToast('Lỗi hệ thống');
      }
    } catch (error) {
      console.log('getStadiumCollageDetailService -->err: ', error);
    }
  };

  const toggleModalCreateOrder = () => {
    setVisibleModal(!visibleModal);
  };

  const handleOnPress = () => {
    navigation.goBack();
  };
  const renderToolBar = () => {
    return (
      <ToolBar
        style={styles.toolBar}
        left={
          <TouchableOpacity style={styles.btnBack} onPress={handleOnPress}>
            <Icon name="chevron-left" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
        center={
          <Text type={headline5} style={styles.titleContent}>
            Đặt sân bóng
          </Text>
        }
      />
    );
  };
  // if (!data.onReady) {
  //   return (
  //     <View style={styles.flex1}>
  //       {renderToolBar()}
  //       <View style={styles.mrTop10}>
  //         <ListLoadingComponent />
  //       </View>
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      {renderToolBar()}
      <ScrollView style={styles.flex1}>
        <SectionChooseDate ref={chooseDateRef} />
        <SectionChooseTime />
      </ScrollView>
      <View style={styles.wrapperBtnOrder}>
        <PrimaryButton onPress={toggleModalCreateOrder} title="Đặt sân" />
      </View>
      <ModalCreateOrder
        dismiss={toggleModalCreateOrder}
        visible={visibleModal}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  flex1: {flex: 1},
  btnBack: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  toolBar: {
    backgroundColor: colors.main,
  },
  container: {
    flex: 1,
  },
  titleContent: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  wrapperBtnOrder: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
    paddingBottom: scale(5),
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
  },
});
