import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import {updateNotiTokenService} from '../../api/auth.api';
import imgTeam from '../../assets/images/image_team.jpg';
import imgYard from '../../assets/images/img_yard2.jpg';
import RowProflie from '../../components/account/RowProflie';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import PrimaryButton from '../../components/common/PrimaryButton';
import {
  body3,
  headline3,
  headline4,
  headline5,
  Text,
} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import CardPromotion from '../../components/home/CardPromotion';
import AlertHelper from '../../helpers/alert.helper';
import {callPhone} from '../../helpers/call-phone.helper';
import {listImageBanner} from '../../helpers/data-local.helper';
import {direction} from '../../helpers/direction.helper';
import {convertPlayTime, formatDateTime} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import {getDomain} from '../../helpers/storage.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {ORDER_DETAIL_SCREEN} from '../../navigations/route-name';
import {getListOrder} from '../../redux/actions/auth.action';
import {getListTeam} from '../../redux/actions/teams.action';
import colors from '../../theme/colors';
import {fcmService} from '../../utils/FCMService';
import {notificationManager} from '../../utils/NotificationManager';

const HomeScreen = ({getListOrder, getListTeam, listOrder}) => {
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );
  const listOrderAccept = listOrder.filter((item) => {
    return item?.order_status?.status === 'ACCEPT';
  });

  const order = listOrderAccept[listOrderAccept?.length - 1];

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    notificationManager.configure(onOpenNotification);
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      notificationManager.unRegister();
    };
  }, []);
  function onNotification(notify) {
    console.log('[App] onNotification: ', notify);
    const options = {
      soundName: 'default',
      playSound: true,
    };
    // notificationManager.showNotification(
    //   0,
    //   notify.title,
    //   notify.body,
    //   notify,
    //   options,
    // );
  }

  function onOpenNotification(notify) {
    console.log('[App] onOpenNotification: ', notify);
    const bodyNoti = JSON.parse(notify.body);
    AlertHelper.alert('success', bodyNoti.title, bodyNoti.content, {}, 10000);
  }

  const onRegister = async (token) => {
    try {
      console.log('[App] onRegistered: ', token);
      await updateNotiTokenService(token);
    } catch (error) {
      console.log(
        'LOG -> file: home.screen.js -> line 56 -> onRegister -> error',
        error,
      );
    }
  };

  const navigateToScreen = (name, params) => () => {
    rootNavigator.navigate(name, params);
  };
  const onPressShare = async () => {
    try {
      const domain = await getDomain();
      await Share.share({
        message: domain,
      });
    } catch (error) {}
  };

  const fetchData = async () => {
    await Promise.all([getListOrder(), getListTeam()]);
  };
  return (
    <View style={styles.container}>
      <ToolBar backgroundColor={colors.main} title="Trang chủ" />
      <ScrollView style={styles.flex1}>
        <View style={styles.warpperSwiper}>
          <Swiper
            activeDotColor={colors.yellowDark}
            dotColor={colors.white}
            autoplay={true}
            paginationStyle={styles.paginationStyle}>
            {listImageBanner?.map((image) => (
              <Image
                key={image}
                style={styles.slideImage}
                source={image.url}
                resizeMode="cover"
              />
            ))}
          </Swiper>
        </View>
        {order && (
          <View style={styles.blockOrder}>
            <Text type={headline3} style={styles.txtTitleOrder}>
              Lịch đặt sân sắp tới của bạn
            </Text>
            <RowProflie
              label="Địa chỉ: "
              value={order?.stadium?.address}
              iconType={IconType.MaterialIcons}
              iconName="location-on"
              editable={false}
              otherTextInputProps={{
                numberOfLines: 2,
              }}
            />
            <RowProflie
              label="Cụm sân: "
              value={order?.stadium?.stadiumName}
              iconType={IconType.MaterialCommunityIcons}
              iconName="stadium"
              editable={false}
              otherTextInputProps={{
                multiline: true,
              }}
            />
            <RowProflie
              label="Sân con: "
              value={order?.stadium_collage?.stadiumCollageName}
              iconType={IconType.MaterialCommunityIcons}
              iconName="ballot-outline"
              editable={false}
            />
            <RowProflie
              label="Ngày: "
              value={formatDateTime(order?.time)}
              iconType={IconType.MaterialCommunityIcons}
              iconName="calendar-month-outline"
              editable={false}
            />
            <RowProflie
              label="Thời gian: "
              value={convertPlayTime(
                order?.stadium_details?.startTimeDetail,
                order?.stadium_details?.endTimeDetail,
              )}
              iconType={IconType.MaterialCommunityIcons}
              iconName="clock-time-four-outline"
              editable={false}
            />
            <View style={styles.warpperBtton}>
              <TouchableOpacity
                onPress={navigateToScreen(ORDER_DETAIL_SCREEN, {
                  orderId: order?.orderId,
                })}
                style={styles.btnDetail}>
                <Text type={headline5} style={{color: colors.white}}>
                  Xem chi tiết
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={direction(
                  order?.stadium?.latitude,
                  order?.stadium?.longitude,
                  order?.stadium?.address,
                )}
                style={styles.btnDirec}>
                <Text type={headline5} style={{color: colors.white}}>
                  Chỉ đường
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{paddingHorizontal: scale(10), marginBottom: scale(10)}}>
          <Text type={headline5}>KHUYẾN MÃI DÀNH CHO BẠN</Text>
          <CardPromotion />
        </View>
        <ImageBackground
          source={imgYard}
          style={{
            height: scale(220),
          }}>
          <LinearGradient
            colors={colors.blackWhiteGradient}
            style={styles.blockOwner}>
            <Text type={headline4} style={{color: colors.white}}>
              Trở thành chủ sân bóng
            </Text>
            <Text
              type={body3}
              style={{
                marginTop: scale(5),
                marginBottom: scale(20),
                color: colors.white,
              }}>
              Liên hệ với chúng tôi để tư vấn hỗ trợ trở thành chủ sân bóng!
            </Text>
            <PrimaryButton
              onPress={callPhone('0903585173')}
              title="LIÊN HỆ"
              style={{width: scale(150), backgroundColor: colors.greenDark}}
            />
          </LinearGradient>
        </ImageBackground>
        <ImageBackground source={imgTeam} style={{height: scale(220)}}>
          <LinearGradient
            colors={colors.greenWhiteGradient}
            style={styles.blockShare}>
            <Text type={headline4}>Chia sẽ mã giới thiệu đến bạn bè</Text>
            <Text type={body3} style={styles.subTitleShare}>
              Cùng nhau tích điểm cho cả hai cùng nhau nhận quà tặng ưu đã cho
              tất cả mọi người!
            </Text>
            <PrimaryButton
              onPress={onPressShare}
              title="MỜI BẠN BÈ"
              style={{width: scale(150), backgroundColor: colors.greenDark}}
            />
          </LinearGradient>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  flex1: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: colors.viewBackground,
  },
  warpperSwiper: {
    height: scale(250),
  },
  slideImage: {
    height: '100%',
    width: '100%',
  },
  paginationStyle: {
    bottom: scale(55),
  },
  blockOrder: {
    backgroundColor: colors.white,
    marginHorizontal: scale(10),
    marginTop: scale(-50),
    borderRadius: scale(5),
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    marginBottom: scale(20),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: scale(4),
    elevation: 5,
  },
  txtTitleOrder: {
    textAlign: 'center',
    color: colors.greenDark,
    marginBottom: scale(15),
  },
  blockOwner: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingHorizontal: scale(10),
    paddingBottom: scale(20),
  },
  blockShare: {
    ...Styles.columnCenter,
    flex: 1,
    paddingHorizontal: scale(20),
  },
  subTitleShare: {
    textAlign: 'center',
    marginTop: scale(5),
    marginBottom: scale(20),
    color: colors.gray,
  },
  warpperBtton: {
    flexDirection: 'row',
    marginTop: scale(20),
    marginBottom: scale(5),
  },
  btnDetail: {
    ...Styles.columnCenter,
    backgroundColor: colors.orange,
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    borderRadius: scale(50),
    marginRight: scale(10),
    flex: 1,
  },
  btnDirec: {
    backgroundColor: colors.blueDark,
    paddingHorizontal: scale(25),
    paddingVertical: scale(10),
    borderRadius: scale(50),
  },
});

const mapDispatchToProps = {
  getListOrder,
  getListTeam,
};
function mapStateToProps(state) {
  return {
    listOrder: state.authState.listOrder,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
