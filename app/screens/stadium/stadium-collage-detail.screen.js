import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getStadiumCollageDetailService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import PrimaryButton from '../../components/common/PrimaryButton';
import {headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import DateItem from '../../components/stadium/DateItem';
import ModalCreateOrder from '../../components/stadium/ModalCreateOrder';
import TimeItem from '../../components/stadium/TimeItem';
import {
  detachedArray,
  diffHours,
  renderNextDays,
} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import colors from '../../theme/colors';
import dimens from '../../theme/dimens';
import spacing from '../../theme/spacing';

export default function StadiumCollageDetailScreen({route}) {
  const listDate = renderNextDays(14).map(e => ({
    choose: false,
    date: e,
  }));
  console.log('listDate: ', listDate);
  const {stadiumCollageId} = route.params;
  const [initalListTime, setInitalListTime] = useState();
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
    stadiumDetailsId: stadiumCollageId,
  });

  const [visibleModal, setVisibleModal] = useState(false);
  const getData = async () => {
    try {
      const res = await getStadiumCollageDetailService(stadiumCollageId);
      console.log('=====', res);
      if (res && res.code === StatusCode.SUCCESS) {
        setInitalListTime(res.data.stadiumDetails);
        setData({
          ...data,
          listTime: res.data.stadiumDetails.filter(
            el => diffHours(el.startTimeDetail) <= 0,
          ),
          onReady: true,
        });
      } else {
        console.log('getStadiumCollageDetailService --> Failed');
        ToastHelper.showToast('Lỗi hệ thống');
      }
    } catch (error) {
      console.log('getStadiumCollageDetailService -->err: ', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const toggleModalCreateOrder = () => {
    setVisibleModal(!visibleModal);
  };

  const onPressChooseDate = (item, index) => () => {
    item.choose = true;
    const newList = [...data.listDate];
    newList.map(e => {
      if (e.choose === true && e !== item) {
        e.choose = false;
      }
    });
    if (index) {
      setData({...data, listDate: newList, listTime: initalListTime});
    } else {
      const newListTime = initalListTime.filter(
        el => diffHours(el.startTimeDetail) <= 0,
      );
      setData({...data, listDate: newList, listTime: newListTime});
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
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItemChooseDate = ({item, index}) => {
    return (
      <DateItem
        onPress={onPressChooseDate(item, index)}
        choose={false}
        item={item}
      />
    );
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
        center={
          <Text type={headline5} style={styles.titleContent}>
            Đặt sân bóng
          </Text>
        }
      />
    );
  };
  if (!data.onReady) {
    return (
      <View style={styles.flex1}>
        {renderToolBar()}
        <View style={styles.mrTop10}>
          <ListLoadingComponent />
        </View>
      </View>
    );
  }
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
  mrTop10: {marginTop: scale(10)},
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
