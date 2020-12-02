import React, {useEffect, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Swiper from 'react-native-swiper';
import {getStadiumDetailService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import BackIcon from '../../components/common/BackIcon';
import {
  body2,
  body3,
  headline4,
  headline5,
  Text,
} from '../../components/common/Text';
import ContentPlaceholder from '../../components/placeholder/ContentPlaceholder';
import ImagePlaceholder from '../../components/placeholder/ImagePlaceholder';
import BlockNameStadium from '../../components/stadium/BlockNameStadium';
import CardReview from '../../components/stadium/CardReview';
import CardStadiumCollage from '../../components/stadium/CardStadiumCollage';
import {getStatusBarHeight} from '../../helpers/device.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {REVIEW_STADIUM_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import RowProflie from '../../components/account/RowProflie';
import {IconType} from '../../components/common/IconMaterialOrSvg';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default function StadiumDetailScreen({route}) {
  const [data, setData] = useState(null);
  const [review, setReview] = useState({
    show: true,
    icon: 'minus',
  });
  const toogleShowReivew = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setReview({
      show: !review.show,
      icon: review.icon === 'plus' ? 'minus' : 'plus',
    });
  };
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
  useFocusEffect(
    React.useCallback(() => {
      getStadiumDetail();
    }, []),
  );
  const keyExtractor = (item, index) => index.toString();
  const renderStadiumCollage = ({item}) => {
    return <CardStadiumCollage item={item} />;
  };

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const toolBarFadeIn = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: ['transparent', colors.main],
    extrapolate: 'clamp',
  });
  const fadeIn0To1 = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, scale(30), scale(60)],
    extrapolate: 'clamp',
  });
  const renderToolbar = () => {
    return (
      <Animated.View style={styles.toolbarContainer(fadeIn0To1, toolBarFadeIn)}>
        <BackIcon iconName="chevron-left" />
        <Animated.Text style={styles.textTitleToolBar(fadeIn0To1)}>
          Chi tiết cụm sân
        </Animated.Text>
        <View style={{...Styles.rowCenter}}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={data.rateCount}
            fullStarColor={colors.yellow}
            starSize={20}
            containerStyle={styles.star}
          />
          <Text type={body3} style={styles.txtCountRate}>
            {data.rateCount || 0}/5
          </Text>
        </View>
      </Animated.View>
    );
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
      {renderToolbar()}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        style={styles.scrollViewContent}>
        <Animated.View
          style={[
            styles.sliderHeight,
            {
              transform: [{translateY: translateY}],
            },
          ]}>
          <Swiper
            activeDotColor={colors.secondary}
            dotColor={colors.white}
            paginationStyle={styles.paginationStyle}>
            <Image
              style={styles.sliderImage}
              source={{uri: data.image}}
              resizeMode="cover"
            />
          </Swiper>
        </Animated.View>
        <View style={styles.body}>
          <BlockNameStadium item={data} />
        </View>
        <View style={styles.wrapperSection}>
          <Text style={styles.titleSection} type={headline5}>
            THÔNG TIN SÂN
          </Text>
          <RowProflie
            label="Loại sân"
            value={data?.category}
            iconType={IconType.MaterialIcons}
            iconName="account-circle"
            editable={false}
          />
          <RowProflie
            label="Số sân đơn"
            value={data?.stadium_collage?.length + ' sân'}
            iconType={IconType.MaterialIcons}
            iconName="account-circle"
            editable={false}
          />
        </View>
        <View style={styles.line} />

        <View style={styles.wrapperSection}>
          <Text style={styles.titleSection} type={headline5}>
            ĐỊA CHỈ
          </Text>
          <RowProflie
            label="Tỉnh/Thành phố"
            value={data?.city}
            iconType={IconType.MaterialIcons}
            iconName="account-circle"
            editable={false}
          />
          <RowProflie
            label="Quận/Huyện"
            value={data?.district}
            iconType={IconType.MaterialIcons}
            iconName="account-circle"
            editable={false}
          />
          <RowProflie
            label="Phường/Xã"
            value={data?.ward}
            iconType={IconType.MaterialIcons}
            iconName="account-circle"
            editable={false}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.wrapperSection}>
          <Text style={styles.titleSection} type={headline5}>
            GIỚI THIỆU
          </Text>
          <Text>{data?.description}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.wrapperSection}>
          <View style={{...Styles.rowBetween}}>
            <Text style={styles.titleSection} type={headline5}>
              ĐÁNH GIÁ ({data?.review?.length || 0})
            </Text>
            <TouchableOpacity onPress={toogleShowReivew}>
              <Icon name={review.icon} style={{fontSize: scale(25)}} />
            </TouchableOpacity>
          </View>
          {review.show && data.review.map(item => <CardReview item={item} />)}
        </View>
      </Animated.ScrollView>
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
  flex1: {flex: 1, backgroundColor: colors.white},
  contentPlaceholder: {width: scale(344), flex: 1, marginTop: scale(20)},
  sliderHeight: {
    height: scale(250),
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  toolbarContainer: (borderBottomWidth, backgroundColor) => ({
    position: 'absolute',
    paddingTop: getStatusBarHeight(true) + 10,
    paddingBottom: scale(10),
    top: 0,
    flexDirection: 'row',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    backgroundColor,
    borderBottomWidth,
    borderBottomColor: colors.gray,
    zIndex: 1,
  }),
  textTitleToolBar: opacity => ({
    textTransform: 'uppercase',
    opacity,
    flex: 1,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(14),
  }),
  txtCountRate: {color: colors.white, marginLeft: scale(5)},
  body: {
    backgroundColor: colors.white,
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: scale(5),
  },
  footer: {
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
  wrapperSection: {
    paddingHorizontal: scale(10),
    marginBottom: scale(30),
  },
  titleSection: {color: colors.gray},
  line: {
    width: '100%',
    height: scale(5),
    backgroundColor: colors.grayLight,
    marginTop: scale(10),
    marginBottom: scale(20),
  },
});
