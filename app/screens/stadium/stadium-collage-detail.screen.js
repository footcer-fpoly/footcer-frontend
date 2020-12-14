import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Octicons';
import {getStadiumCollageDetailService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import DescriptionStatus from '../../components/common/DescriptionStatus';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import NoDataComponent from '../../components/common/NoDataComponent';
import PrimaryButton from '../../components/common/PrimaryButton';
import RowInfo from '../../components/common/RowInfo';
import {headline5, headline6, Text} from '../../components/common/Text';
import TextError from '../../components/common/TextError';
import ToolBar from '../../components/common/Toolbar';
import DateItem from '../../components/stadium/DateItem';
import ModalCreateOrder from '../../components/stadium/ModalCreateOrder';
import TimeItem from '../../components/stadium/TimeItem';
import {
  converSecondsToTime,
  convertMilisecondsToMinutes,
  detachedArray,
  diffHours,
  formatToDate,
} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import useNextDays from '../../hooks/useNextDays';
import rootNavigator from '../../navigations/root.navigator';
import colors from '../../theme/colors';
import dimens from '../../theme/dimens';
import spacing from '../../theme/spacing';

export default function StadiumCollageDetailScreen({route}) {
  const {
    stadiumCollageId,
    stadiumName,
    address,
    category,
    nameCollage,
    stadiumUserId,
  } = route.params;
  const listDate = useNextDays();
  const scrollRef = useRef();

  const [state, setState] = useState({
    listDate,
    listTime: [],
    data: {},
    onReady: false,
    error: null,
  });
  const [order, setOrder] = useState({
    nameSadium: stadiumName,
    stadiumUserId,
    nameCollage,
    timeOrder: '',
    dateOrder: formatToDate(listDate[0]?.date),
    price: 0,
    description: '',
    stadiumDetailsId: null,
  });

  const [visibleModal, setVisibleModal] = useState(false);

  const handleOnPress = () => {
    rootNavigator.back();
  };

  const toggleModalCreateOrder = () => {
    if (!order.timeOrder) {
      scrollRef.current.scrollToEnd();
      setState({...state, error: true});
    } else {
      setVisibleModal(!visibleModal);
    }
  };

  const getData = async (index, date) => {
    try {
      console.log('date: ', formatToDate(date));
      const res = await getStadiumCollageDetailService({
        stadiumCollageId,
        date: !index ? formatToDate(listDate[0]?.date) : formatToDate(date),
      });
      if (res && res.code === StatusCode.SUCCESS) {
        if (!index) {
          setState({
            ...state,
            listTime: res?.data?.stadiumDetails?.filter(
              el => diffHours(el.startTimeDetail) > 0,
            ),
            data: res.data,
            onReady: true,
          });
        } else {
          setState({
            ...state,
            data: res.data,
            listTime: res.data.stadiumDetails,
            onReady: true,
          });
        }
      } else {
        ToastHelper.showToast(`Lỗi hệ thống: ${res.code}`, colors.red);
      }
    } catch (error) {
      console.log('getStadiumCollageDetailService -->err: ', error);
      ToastHelper.showToast('Lỗi hệ thống', colors.red);
    }
  };
  useEffect(() => {
    getData(0);
  }, []);
  const onPressChooseDate = (item, index) => async () => {
    item.choose = true;
    const newList = [...state.listDate];
    newList.map(e => {
      if (e.choose === true && e !== item) {
        e.choose = false;
      }
    });
    setState({
      ...state,
      listDate: newList,
    });
    setOrder({
      ...order,
      dateOrder: formatToDate(item.date),
      timeOrder: '',
    });
    getData(index, item.date);
  };

  const onPressChooseTime = item => () => {
    item.hasOrder = 'choose';
    const newList = [...state.listTime];
    newList.map(e => {
      if (e.hasOrder === 'choose' && e !== item) {
        e.hasOrder = false;
      }
    });
    setState({...state, listTime: newList, error: false});
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
    return (
      <DateItem
        key={index.toString()}
        onPress={onPressChooseDate(item, index)}
        item={item}
      />
    );
  };

  const renderSectionDate = () => {
    return (
      <View style={[styles.section, styles.mrTop]}>
        <Text type={headline6} style={styles.txtTitle}>
          1. Chọn ngày:
        </Text>
        <Carousel
          data={state.listDate}
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
        key={item.stadiumDetailsId}
      />
    ));
  };
  const renderSectionTime = () => {
    if (!!state?.data?.stadiumDetails) {
      const newList = [...state.listTime];
      const subList = detachedArray(newList, 4);
      return (
        <View style={[styles.section, styles.mrTop]}>
          <Text type={headline6} style={styles.txtTitle}>
            2. Chọn giờ:
          </Text>
          <View style={styles.wrapperDesStatus}>
            <DescriptionStatus color={colors.white} lable="Còn trống" />
            <DescriptionStatus color={colors.grayOpacity} lable="Đã được đặt" />
            <DescriptionStatus color={colors.green} lable="Đang chọn" />
          </View>
          {state.error && <TextError text={'Vui lòng chọn giờ'} />}
          {!subList.length ? (
            <>
              <Text />
              <NoDataComponent text="Hôm nay đã hết giờ hoạt động vui lòng chọn ngày hôm sau!" />
            </>
          ) : (
            <ScrollView
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              horizontal
              style={styles.paddingHor}>
              {subList.map((item, index) => (
                <View key={index.toString()} style={{marginRight: scale(5)}}>
                  {render(item)}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      );
    }
    return <View />;
  };
  const renderToolBar = () => {
    return (
      <ToolBar left={true} title="Đặt sân" backgroundColor={colors.main} />
    );
  };

  if (!state.onReady) {
    return (
      <>
        {renderToolBar()}
        <Text />
        <ListLoadingComponent onReady={state.onReady} />
      </>
    );
  }
  return (
    <View style={styles.container}>
      {renderToolBar()}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        style={styles.flex1}>
        <View style={styles.section}>
          <Text type={headline6} style={styles.txtTitle}>
            Thông tin sân:
          </Text>
          <View style={styles.paddingHor}>
            <RowInfo lable="Cụm sân: " value={stadiumName} />
            <RowInfo
              lable="Tên sân con: "
              value={state.data.stadiumCollageName}
            />
            <RowInfo lable="Loại sân: " value={category} />
            <RowInfo
              lable="Quy mô: "
              value={`Sân ${state.data.amountPeople} người`}
            />
            <RowInfo
              lable="Thời gian hoạt động: "
              value={`${converSecondsToTime(
                state.data.startTime,
              )} -${converSecondsToTime(state.data.endTime)}`}
            />
            <RowInfo
              lable="Thời gian trận đấu: "
              value={`${convertMilisecondsToMinutes(state.data.playTime)} phút`}
            />
            <RowInfo lable="Địa chỉ: " value={address} />
          </View>
        </View>
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
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: scale(60),
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
  wrapperDesStatus: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
});
