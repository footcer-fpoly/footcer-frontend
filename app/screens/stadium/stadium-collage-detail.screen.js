import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Octicons';
import {getStadiumCollageDetailService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import PrimaryButton from '../../components/common/PrimaryButton';
import {headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import DateItem from '../../components/stadium/DateItem';
import ModalCreateOrder from '../../components/stadium/ModalCreateOrder';
import TimeItem from '../../components/stadium/TimeItem';
import {
  converSecondsToTime,
  detachedArray,
  diffHours,
  formatToDate,
  renderNextDays,
} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigator from '../../navigations/root.navigator';
import colors from '../../theme/colors';
import dimens from '../../theme/dimens';
import spacing from '../../theme/spacing';

export default function StadiumCollageDetailScreen({route}) {
  const listDate = renderNextDays(14).map(e => ({
    choose: false,
    date: e,
  }));
  const {stadiumCollageId} = route.params;
  const [data, setData] = useState({
    listDate,
    listTime: [],
    onReady: false,
  });
  const [order, setOrder] = useState({
    nameSadium: '',
    timeOrder: '',
    dateOrder: '',
    price: 0,
    description: '',
    stadiumDetailsId: null,
  });

  const [visibleModal, setVisibleModal] = useState(false);

  const handleOnPress = () => {
    rootNavigator.back();
  };

  const toggleModalCreateOrder = () => {
    setVisibleModal(!visibleModal);
  };

  const onPressChooseDate = (item, index) => async () => {
    item.choose = true;
    const newList = [...data.listDate];
    newList.map(e => {
      if (e.choose === true && e !== item) {
        e.choose = false;
      }
    });
    setData({
      ...data,
      listDate: newList,
    });
    setOrder({
      ...order,
      dateOrder: formatToDate(item.date),
    });
    try {
      const res = await getStadiumCollageDetailService({
        stadiumCollageId,
        date: formatToDate(item.date),
      });
      console.log('getStadiumCollageDetailService -->res: ', res);
      if (res && res.code === StatusCode.SUCCESS) {
        if (!index) {
          setData({
            ...data,
            listTime: res.data.stadiumDetails.filter(
              el => diffHours(el.startTimeDetail) > 0,
            ),
          });
        } else {
          setData({
            ...data,
            listTime: res.data.stadiumDetails,
          });
        }
      } else {
        console.log('getStadiumCollageDetailService --> Failed');
        ToastHelper.showToast('Lỗi hệ thống');
      }
    } catch (error) {
      console.log('getStadiumCollageDetailService -->err: ', error);
    }
  };

  const onPressChooseTime = item => () => {
    item.hasOrder = 'choose';
    const newList = [...data.listTime];
    newList.map(e => {
      if (e.hasOrder === 'choose' && e !== item) {
        e.hasOrder = false;
      }
    });
    setData({...data, listTime: newList});
    setOrder({
      ...order,
      price: item.price,
      timeOrder:
        converSecondsToTime(item.startTimeDetail) +
        ' -' +
        converSecondsToTime(item.endTimeDetail),
      stadiumDetailsId: item.stadiumDetailsId,
    });
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItemChooseDate = ({item, index}) => {
    return <DateItem onPress={onPressChooseDate(item, index)} item={item} />;
  };

  const renderSectionDate = () => {
    return (
      <View style={[styles.section, styles.flex1]}>
        <Text type={headline5} style={styles.txtTitle}>
          1. Chọn ngày:
        </Text>
        <Carousel
          data={data.listDate}
          keyExtractor={keyExtractor}
          renderItem={renderItemChooseDate}
          sliderWidth={scale(dimens.WINDOW_WIDTH)}
          itemWidth={scale(170)}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          activeSlideAlignment={'start'}
          containerCustomStyle={styles.paddingHor}
        />
      </View>
    );
  };

  const render = arr => {
    return arr.map((item, index) => (
      <TimeItem
        onPress={onPressChooseTime(item)}
        item={item}
        key={index.toString()}
      />
    ));
  };
  const renderSectionTime = () => {
    const newList = [...data.listTime];
    const subList = detachedArray(newList, 6);
    return (
      <View style={[styles.section, styles.mrTop]}>
        <Text type={headline5} style={styles.txtTitle}>
          2. Chọn giờ:
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.paddingHor}>
          {subList.map((item, index) => (
            <View key={index.toString()} style={{marginRight: scale(5)}}>
              {render(item)}
            </View>
          ))}
        </ScrollView>
      </View>
    );
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
        {renderSectionDate()}
        {renderSectionTime()}
      </ScrollView>
      <View style={styles.wrapperBtnOrder}>
        <PrimaryButton onPress={toggleModalCreateOrder} title="Đặt sân" />
      </View>
      <ModalCreateOrder
        dismiss={toggleModalCreateOrder}
        visible={visibleModal}
        data={order}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  flex1: {flex: 1},
  paddingHor: {
    paddingHorizontal: scale(10),
  },
  mrTop: {
    marginTop: spacing.tiny,
  },
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
  section: {
    backgroundColor: colors.white,
    paddingVertical: spacing.large,
  },
  txtTitle: {
    paddingHorizontal: scale(10),
    marginBottom: spacing.tiny,
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
