import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Button,
  Linking,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {body3, Text} from '../../components/common/Text';
import colors from '../../theme/colors';
import Geolocation from 'react-native-geolocation-service';
import {getListStadiumService} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import Carousel from 'react-native-snap-carousel';
import CardStadium from '../../components/stadium/CardStadium';

import {scale} from '../../helpers/size.helper';
import dimens from '../../theme/dimens';
import {
  animatedStyles,
  scrollInterpolator,
} from '../../utils/animation/animationCarousel';
import {userImage} from '../../assets/Images';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4.5);

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const StadiumScreen = () => {
  const initialMapState = {
    listStadium: null,
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 1,
      longitudeDelta: 1,
    },
    isPermission: false,
  };

  const [mapState, setMapState] = useState(initialMapState);

  const GetPosition = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        setMapState({
          ...mapState,
          region: {
            ...mapState.region,
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          },
          isPermission: true,
        });
      },
      error => {
        console.log('code:', error.code, 'message:', error.message);
      },
    );
  };

  const getListStadium = async () => {
    const resListStadium = await getListStadiumService({
      // latitude: mapState.region.latitude,
      // longitude: mapState.region.longitude,
      latitude: 10.775104,
      longitude: 106.640483,
    });
    console.log('getListStadiumService -->res: ', resListStadium);
    if (resListStadium && resListStadium.code === StatusCode.SUCCESS) {
      setMapState({...mapState, listStadium: resListStadium.data});
    }
  };

  useEffect(() => {
    getListStadium();
  }, []);

  const fetchData = async () => {
    await Promise.all([requestLocationPermission(), getListStadium()]);
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setMapState({...mapState, isPermission: true});
        GetPosition();
      } else {
        Linking.openSettings();
        return setMapState({...mapState, isPermission: false});
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return <CardStadium item={item} />;
  };
  // if (!mapState.isPermission) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.item}>Try permissions</Text>
  //       <Button
  //         title="request permissions"
  //         onPress={requestLocationPermission}
  //       />
  //     </View>
  //   );
  // } else if (!mapState.region.latitude || !mapState.region.longitude) {
  //   return <Text>haha</Text>;
  // }
  return (
    <View style={styles.container}>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={{
          latitude: mapState.region.latitude,
          longitude: mapState.region.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}>
        {mapState.listStadium?.map((item, index) => {
          console.log('item-----: ', item);
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: item?.latitude,
                longitude: item?.longitude,
              }}
              // onPress={e => onMarkerPress(e)}
            >
              <Animated.Image
                source={userImage}
                style={[styles.marker]}
                resizeMode="cover"
              />
            </MapView.Marker>
          );
        })}
        <Marker
          coordinate={{
            latitude: mapState.region?.latitude,
            longitude: mapState.region?.longitude,
          }}
        />
      </MapView> */}
      <View style={styles.footer}>
        <Carousel
          data={mapState.listStadium}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          coyantainerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
          currentIndex={1}
        />
      </View>
    </View>
  );
};
export default StadiumScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    // height: ITEM_HEIGHT,
    position: 'absolute',
    bottom: 5,
    right: 0,
    left: 0,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
