import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import ToolBar from '../../components/common/Toolbar';
import {listImageBanner} from '../../helpers/data-local.helper';
import {scale} from '../../helpers/size.helper';
import {getListOrder} from '../../redux/actions/auth.action';
import {getListTeam} from '../../redux/actions/teams.action';
import colors from '../../theme/colors';
import {notificationManager} from '../../utils/NotificationManager';
import {fcmService} from '../../utils/FCMService';
import {updateNotiTokenService} from '../../api/auth.api';
import AlertHelper from '../../helpers/alert.helper';

const HomeScreen = ({getListOrder, getListTeam}) => {
  useEffect(() => {
    fetchData();
  }, []);

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
    notificationManager.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
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

  const fetchData = async () => {
    await Promise.all([getListOrder(), getListTeam()]);
  };
  return (
    <View style={styles.container}>
      <ToolBar title="Trang chủ" />
      <ScrollView>
        <View style={styles.warpperSwiper}>
          <Swiper
            activeDotColor={colors.main}
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
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    backgroundColor: colors.viewBackground,
  },
  warpperSwiper: {
    height: scale(250),
  },
  slideImage: {
    height: '100%',
    width: '100%',
  },
});

const mapDispatchToProps = {
  getListOrder,
  getListTeam,
};

export default connect(null, mapDispatchToProps)(HomeScreen);
