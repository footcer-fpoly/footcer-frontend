import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {renderNextDays} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import dimens from '../../theme/dimens';
import spacing from '../../theme/spacing';
import {headline5, Text} from '../common/Text';
import DateItem from './DateItem';

const SectionChooseDate = forwardRef(({}, ref) => {
  const listDate = renderNextDays(14).map((e) => ({
    choose: false,
    date: e,
  }));
  const [data, setData] = useState({
    currentSelected: null,
    date: null,
  });
  const seclectItem = (item, index) => () => {
    setData({
      currentSelected: index,
      date: item.date,
    });
  };

  useImperativeHandle(ref, () => ({
    getValue,
  }));

  const getValue = () => {
    const {date} = data;
    return date;
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItemChooseDate = ({item, index}) => {
    return (
      <DateItem
        onPress={seclectItem(item, index)}
        choose={data.currentSelected === index ? true : false}
        item={item}
      />
    );
  };
  return (
    <View style={styles.section}>
      <Text type={headline5} style={styles.txtTitle}>
        1. Chọn ngày:
      </Text>
      <Carousel
        data={listDate}
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
});
export default SectionChooseDate;
const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: spacing.large,
  },
  txtTitle: {
    paddingHorizontal: scale(10),
    marginBottom: spacing.tiny,
    textTransform: 'uppercase',
  },
  paddingHor: {
    paddingHorizontal: scale(10),
  },
});
