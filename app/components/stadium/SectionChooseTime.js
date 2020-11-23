import React, {Component, forwardRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {detachedArray, renderNextDays} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import dimens from '../../theme/dimens';
import spacing from '../../theme/spacing';
import {headline5, Text} from '../common/Text';
import DateItem from './DateItem';
import TimeItem from './TimeItem';

const SectionChooseTime = forwardRef(({}, ref) => {
  var listTime = [
    {
      stadiumDetailsId: '6927dc1a-2c8e-11eb-8038-0242ac130002',
      stadiumCollageId: '6926bee4-2c8e-11eb-8038-0242ac130002',
      startTimeDetail: '0',
      endTimeDetail: '3600000',
      price: 112233,
      description: '',
      hasOrder: false,
      created_at: '0001-01-01T00:00:00Z',
      updated_at: '0001-01-01T00:00:00Z',
    },
    {
      stadiumDetailsId: '69298c51-2c8e-11eb-8038-0242ac130002',
      stadiumCollageId: '6926bee4-2c8e-11eb-8038-0242ac130002',
      startTimeDetail: '10800000',
      endTimeDetail: '14400000',
      price: 112233,
      description: '',
      hasOrder: false,
      created_at: '0001-01-01T00:00:00Z',
      updated_at: '0001-01-01T00:00:00Z',
    },
    {
      stadiumDetailsId: '692a20d2-2c8e-11eb-8038-0242ac130002',
      stadiumCollageId: '6926bee4-2c8e-11eb-8038-0242ac130002',
      startTimeDetail: '14400000',
      endTimeDetail: '18000000',
      price: 112233,
      description: '',
      hasOrder: false,
      created_at: '0001-01-01T00:00:00Z',
      updated_at: '0001-01-01T00:00:00Z',
    },
    {
      stadiumDetailsId: '692a9aad-2c8e-11eb-8038-0242ac130002',
      stadiumCollageId: '6926bee4-2c8e-11eb-8038-0242ac130002',
      startTimeDetail: '18000000',
      endTimeDetail: '21600000',
      price: 112233,
      description: '',
      hasOrder: true,
      created_at: '0001-01-01T00:00:00Z',
      updated_at: '0001-01-01T00:00:00Z',
    },
    {
      stadiumDetailsId: '692877fe-2c8e-11eb-8038-0242ac130002',
      stadiumCollageId: '6926bee4-2c8e-11eb-8038-0242ac130002',
      startTimeDetail: '3600000',
      endTimeDetail: '7200000',
      price: 112233,
      description: '',
      hasOrder: false,
      created_at: '0001-01-01T00:00:00Z',
      updated_at: '0001-01-01T00:00:00Z',
    },
    {
      stadiumDetailsId: '6928faf1-2c8e-11eb-8038-0242ac130002',
      stadiumCollageId: '6926bee4-2c8e-11eb-8038-0242ac130002',
      startTimeDetail: '7200000',
      endTimeDetail: '10800000',
      price: 112233,
      description: '',
      hasOrder: false,
      created_at: '0001-01-01T00:00:00Z',
      updated_at: '0001-01-01T00:00:00Z',
    },
  ];
  const render = arr => {
    return arr.map((item, index) => (
      <TimeItem
        // onPress={onPressChooseTime(item)}
        item={item}
        key={index.toString()}
      />
    ));
  };
  const renderSectionTime = () => {
    const newList = [...listTime];
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
  return renderSectionTime();
});
export default SectionChooseTime;
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
