import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {getStadiumDetailService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import BackgroudImage from '../../components/common/BackgroudImage';
import {headline4, Text} from '../../components/common/Text';
import ContentPlaceholder from '../../components/placeholder/ContentPlaceholder';
import ImagePlaceholder from '../../components/placeholder/ImagePlaceholder';
import CardStadiumCollage from '../../components/stadium/CardStadiumCollage';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';

export default function StadiumDetailScreen({route}) {
  const [data, setData] = useState(null);
  const getStadiumDetail = async () => {
    try {
      const {stadiumId} = route.params;
      const res = await getStadiumDetailService(stadiumId);
      console.log('getStadiumDetailService -->res: ', res);
      if (res && res.code === StatusCode.SUCCESS) {
        setData(res.data);
      } else {
        console.log('getStadiumDetailService -->err: Lỗi ');
      }
    } catch (error) {
      console.log('getStadiumDetailService -->err: ', error);
    }
  };
  useEffect(() => {
    getStadiumDetail();
  }, []);
  const keyExtractor = (item, index) => index.toString();
  const renderStadiumCollage = ({item}) => {
    return <CardStadiumCollage item={item} />;
  };

  if (!data) {
    return (
      <View style={styles.flex1}>
        <ImagePlaceholder size={scale(50)} />
        <View style={styles.contentPlaceholder}>
          <ContentPlaceholder />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.flex1}>
      <ScrollView style={styles.scrollViewContent}>
        <BackgroudImage image={data.image} height={scale(220)} />
        <Text>Chi tiết sân</Text>
      </ScrollView>
      <View style={styles.footer}>
        <Text type={headline4} style={styles.titleFooter}>
          Chọn sân con
        </Text>
        <FlatList
          data={data.stadium_collage}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.listStadiumCollage}
          keyExtractor={keyExtractor}
          renderItem={renderStadiumCollage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {flex: 1},
  contentPlaceholder: {width: scale(344), flex: 1, marginTop: scale(20)},
  scrollViewContent: {flex: 1, backgroundColor: colors.viewBackground},
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    backgroundColor: colors.green,
    paddingVertical: scale(10),
  },
  titleFooter: {
    textAlign: 'center',
    color: colors.white,
    borderBottomWidth: scale(2),
    borderBottomColor: colors.grayOpacity,
    paddingBottom: scale(5),
    marginBottom: scale(10),
  },
  listStadiumCollage: {
    paddingHorizontal: scale(10),
  },
});
