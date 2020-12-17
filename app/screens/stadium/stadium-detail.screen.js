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
import {connect} from 'react-redux';
import {getListOrder} from '../../redux/actions/auth.action';
import {listStatusOrder} from '../../helpers/data-local.helper';
import {ScrollView} from 'react-native';
import ItemServeice from '../../components/stadium/ItemServeice';
import PrimaryButton from '../../components/common/PrimaryButton';
import ButtonOutline from '../../components/common/ButtonOutline';
import {Platform} from 'react-native';
import {Linking} from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export const StadiumDetailScreen = ({route, listOrder, getListOrder}) => {
  const {stadiumId} = route.params;
  const listOrderComplete = listOrder.filter((item) => {
    return item?.order_status?.status === listStatusOrder[3].key;
  });
  const isHasOrder = listOrderComplete.find(
    (item) => item?.stadium?.stadiumId === stadiumId,
  );
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
      fetchData();
    }, []),
  );

  const onPressDirection = (
    latitude = 0,
    longitude = 0,
    label = 'Footcer',
  ) => async () => {
    const url = Platform.select({
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });
    const isLinkingSupport = await Linking.canOpenURL(url);
    if (isLinkingSupport) {
      Linking.openURL(url);
    } else {
      const urlGoogleMap = `https://www.google.com/maps/dir/Current+Location/${latitude},${longitude}`;
      Linking.openURL(urlGoogleMap);
    }
  };

  const fetchData = async () => {
    await Promise.all([getStadiumDetail(), getListOrder()]);
  };
  const keyExtractor = (item, index) => index.toString();
  const renderStadiumCollage = ({item}) => {
    return (
      <CardStadiumCollage
        item={item}
        stadiumName={data?.stadiumName}
        address={data?.address}
        category={data?.category}
        stadiumUserId={data?.user?.userId}
      />
    );
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
  const handleOnPress = () => {
    rootNavigator.back();
  };
  const navigateToReview = () => {
    rootNavigator.navigate(REVIEW_STADIUM_SCREEN, {item: data});
  };
  const renderToolbar = () => {
    return (
      <Animated.View style={styles.toolbarContainer(fadeIn0To1, toolBarFadeIn)}>
        <TouchableOpacity style={styles.btnBack} onPress={handleOnPress}>
          <Icon name="chevron-left" size={scale(30)} color={colors.white} />
        </TouchableOpacity>
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
        nestedScrollEnabled={true}
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
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
        <View style={styles.wrapperBtn}>
          {isHasOrder && (
            <PrimaryButton
              title="Đánh giá sân"
              onPress={navigateToReview}
              style={styles.btnReview}
            />
          )}
          <ButtonOutline
            style={isHasOrder ? styles.flex0 : styles.flex1}
            title="Chỉ đường"
            colorOutline={colors.blue}
            titleColor={colors.blue}
            onPress={onPressDirection(
              data?.latitude,
              data?.longitude,
              data?.address,
            )}
            left={
              <Icon
                size={scale(20)}
                color={colors.blue}
                name="map-search-outline"
              />
            }
          />
        </View>
        {data?.service?.length ? (
          <View style={styles.wrapperSection}>
            <Text style={styles.titleSection} type={headline5}>
              DỊCH VỤ
            </Text>
            <ScrollView horizontal showsVerticalScrollIndicator>
              {data?.service?.map((item, index) => (
                <ItemServeice
                  key={index.toString()}
                  image={item?.image}
                  name={item?.name}
                  price={item?.price}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View />
        )}
        <View style={styles.line} />
        <View style={styles.wrapperSection}>
          <Text style={styles.titleSection} type={headline5}>
            THÔNG TIN SÂN
          </Text>
          <RowProflie
            label="Loại sân"
            value={data?.category}
            iconType={IconType.MaterialIcons}
            iconName="category"
            editable={false}
          />
          <RowProflie
            label="Số sân đơn"
            value={data?.stadium_collage?.length + ' sân'}
            iconType={IconType.MaterialIcons}
            iconName="casino"
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
            iconName="festival"
            editable={false}
          />
          <RowProflie
            label="Quận/Huyện"
            value={data?.district}
            iconType={IconType.MaterialIcons}
            iconName="festival"
            editable={false}
          />
          <RowProflie
            label="Phường/Xã"
            value={data?.ward}
            iconType={IconType.MaterialIcons}
            iconName="festival"
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
          {review.show &&
            data.review.map((item, index) => (
              <CardReview key={index.toString()} item={item} />
            ))}
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
};

const styles = StyleSheet.create({
  flex1: {flex: 1, backgroundColor: colors.white},
  flex0: {flex: 0},
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
    backgroundColor,
    borderBottomWidth,
    borderBottomColor: colors.gray,
    zIndex: 1,
  }),
  textTitleToolBar: (opacity) => ({
    textTransform: 'uppercase',
    opacity,
    flex: 1,
    color: colors.white,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: scale(14),
  }),
  btnBack: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  txtCountRate: {
    color: colors.white,
    marginLeft: scale(5),
    marginRight: scale(10),
  },
  body: {
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingBottom: scale(50),
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
    marginBottom: scale(15),
  },
  titleSection: {color: colors.gray},
  line: {
    width: '100%',
    height: scale(5),
    backgroundColor: colors.grayLight,
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  wrapperBtn: {
    paddingHorizontal: scale(10),
    paddingBottom: scale(15),
    flexDirection: 'row',
  },
  btnReview: {
    flex: 1,
    marginRight: scale(10),
    backgroundColor: colors.yellowDark,
  },
});

function mapStateToProps(state) {
  return {
    listOrder: state.authState.listOrder,
  };
}
const mapDispatchToProps = {
  getListOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StadiumDetailScreen);
