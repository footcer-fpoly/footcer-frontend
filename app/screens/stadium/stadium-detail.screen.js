import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {getStadiumDetailService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import RowIcon from '../../components/common/RowIcon';
import {
  body3,
  headline4,
  headline5,
  headline6,
  Text,
} from '../../components/common/Text';
import ContentPlaceholder from '../../components/placeholder/ContentPlaceholder';
import ImagePlaceholder from '../../components/placeholder/ImagePlaceholder';
import BlockNameStadium from '../../components/stadium/BlockNameStadium';
import CardReview from '../../components/stadium/CardReview';
import CardStadiumCollage from '../../components/stadium/CardStadiumCollage';
import ItemServeice from '../../components/stadium/ItemServeice';
import {listStatusOrder} from '../../helpers/data-local.helper';
import {getStatusBarHeight} from '../../helpers/device.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {getListOrder} from '../../redux/actions/auth.action';
import colors from '../../theme/colors';

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
  const [showOrder, setShowOrder] = useState(false);
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
    outputRange: ['transparent', colors.white],
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

  const renderToolbar = () => {
    return (
      <Animated.View style={styles.toolbarContainer(fadeIn0To1, toolBarFadeIn)}>
        <TouchableOpacity style={styles.btnBack} onPress={handleOnPress}>
          <Icon name="chevron-left" size={scale(30)} color={colors.black} />
        </TouchableOpacity>
        <Animated.Text style={styles.textTitleToolBar(fadeIn0To1)}>
          Chi tiết cụm sân
        </Animated.Text>
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
          <BlockNameStadium hasOrder={isHasOrder} data={data} />
        </View>
        <View
          style={{
            ...Styles.rowCenter,
            marginTop: scale(20),
          }}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={data.rateCount}
            fullStarColor={colors.yellow}
            starSize={scale(30)}
          />
          <Text type={body3} style={styles.txtCountRate}>
            {data.rateCount || 0}/5
          </Text>
        </View>
        <View style={styles.blockInfo}>
          <Text type={headline4} style={styles.txtNameStadium}>
            {data?.stadiumName}
          </Text>
          <RowIcon iconName="location-on" text={data?.address} />
          <RowIcon iconName="account-circle" text={data?.user?.displayName} />
          <RowIcon iconName="dashboard" text={data?.category} />
          {data?.description && (
            <RowIcon iconName="description" text={data?.description} />
          )}
        </View>
        {data?.service?.length ? (
          <View style={styles.blockService}>
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
        <View style={styles.blockReview}>
          <View style={{...Styles.rowBetween}}>
            <Text style={styles.titleSection} type={headline5}>
              ĐÁNH GIÁ ({data?.review?.length || 0})
            </Text>
            {data?.review?.length ? (
              <TouchableOpacity onPress={toogleShowReivew}>
                <Icon name={review.icon} style={{fontSize: scale(25)}} />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
          {review.show &&
            data.review.map((item, index) => (
              <CardReview key={index.toString()} item={item} />
            ))}
        </View>
      </Animated.ScrollView>
      <View style={styles.footer}>
        <Text type={headline5} style={styles.titleFooter}>
          Vui lòng chọn sân con để đặt sân bóng
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
  flex1: {flex: 1, backgroundColor: colors.viewBackground},
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
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(14),
    paddingRight: scale(50),
  }),
  btnBack: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  txtCountRate: {
    color: colors.black,
    marginLeft: scale(5),
    marginRight: scale(10),
  },
  body: {
    backgroundColor: colors.viewBackground,
  },
  blockInfo: {
    marginHorizontal: scale(20),
    backgroundColor: colors.white,
    paddingTop: scale(10),
    paddingBottom: scale(25),
    marginTop: scale(10),
    paddingHorizontal: scale(20),
    // borderTopLeftRadius: scale(10),
    // borderTopRightRadius: scale(10),
    // borderTopWidth: scale(2),
    // borderLeftWidth: scale(2),
    // borderRightWidth: scale(2),
    // borderColor: colors.grayOpacity,
    borderRadius: scale(10),
  },
  txtNameStadium: {
    borderBottomWidth: scale(1),
    borderBottomColor: colors.grayOpacity,
    paddingBottom: scale(10),
    color: colors.greenDark,
  },
  contentContainer: {
    paddingBottom: scale(50),
    backgroundColor: colors.viewBackground,
  },
  blockReview: {
    marginHorizontal: scale(20),
    backgroundColor: colors.white,
    marginTop: scale(10),
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    paddingBottom: scale(10),
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    // borderLeftWidth: scale(2),
    // borderRightWidth: scale(2),
    // borderBottomWidth: scale(2),
    // borderColor: colors.grayOpacity,
    borderRadius: scale(10),
  },
  blockService: {
    backgroundColor: colors.white,
    marginTop: scale(10),
    marginHorizontal: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    // borderLeftWidth: scale(2),
    // borderRightWidth: scale(2),
    // borderColor: colors.grayOpacity,
    borderRadius: scale(10),
  },
  footer: {
    borderTopRightRadius: scale(5),
    borderTopLeftRadius: scale(5),
    backgroundColor: colors.greenDark + 'B3',
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
