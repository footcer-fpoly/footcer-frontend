import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Button,
  Linking,
  Dimensions,
  Platform,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {body3, headline4, headline5, Text} from '../../components/common/Text';
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
import LottieView from 'lottie-react-native';
import animationMap from '../../assets/lottie-animation/map-animation.json';
import animationOnLocation from '../../assets/lottie-animation/on-location.json';
import markerDefault from '../../assets/images/marker-default.png';
import markerStadium from '../../assets/images/marker-stadium.png';
import {connect} from 'react-redux';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import Styles from '../../helpers/styles.helper';
import PrimaryButton from '../../components/common/PrimaryButton';
import spacing from '../../theme/spacing';
import PermissionFail from '../../components/stadium/PermissionFail';
import ToolBar from '../../components/common/Toolbar';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const StadiumScreen = ({isPermissionLocation}) => {
  console.log('isPermissionLocation: ', isPermissionLocation);
  const [state, setState] = useState({
    listStadium: [],
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    onReady: false,
  });

  useEffect(() => {
    if (isPermissionLocation) {
      setTimeout(getData, 3000);
    }
  }, []);

  const getData = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const resListStadium = await getListStadiumService({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
        if (resListStadium && resListStadium.code === StatusCode.SUCCESS) {
          setState({
            ...state,
            listStadium: resListStadium.data,
            region: {
              ...state.region,
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
            },
            onReady: true,
          });
        }
      },
      error => {
        console.log('code:', error.code, 'message:', error.message);
      },
    );
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= state.listStadium.length) {
        index = state.listStadium.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {latitude, longitude} = state.listStadium[index];
          _map.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });
  const interpolations = state.listStadium.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scaleAni = mapAnimation.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return {scaleAni};
  });
  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };
  const _map = useRef();
  const _scrollView = useRef();
  const keyExtractor = (item, index) => index.toString();
  const renderItem = (item, index) => {
    return <CardStadium key={index.toString()} item={item} />;
  };
  if (!isPermissionLocation) {
    return <PermissionFail />;
  } else if (!state.onReady) {
    return (
      <LottieView source={animationMap} style={styles.full} autoPlay loop />
    );
  }
  return (
    <View style={styles.container}>
      <ToolBar
        style={{backgroundColor: colors.main}}
        center={
          <Text type={headline5} style={styles.titleToolbar}>
            Danh sách cụm sân
          </Text>
        }
      />
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={state.region}>
        {state.listStadium?.map((item, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scaleAni,
              },
            ],
          };
          return (
            <MapView.Marker
              key={index}
              onPress={e => onMarkerPress(e)}
              coordinate={{
                latitude: item?.latitude,
                longitude: item?.longitude,
              }}>
              <Animated.Image
                source={markerStadium}
                style={[styles.markerStadium, scaleStyle]}
                resizeMode="cover"
              />
            </MapView.Marker>
          );
        })}
        <Marker
          coordinate={{
            latitude: state.region.latitude,
            longitude: state.region.longitude,
          }}>
          <Image
            source={markerDefault}
            style={styles.marker}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
      <View style={styles.footer}>
        <Text type={headline4}>Danh sách sân quanh đây</Text>
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          contentContainerStyle={{
            paddingHorizontal: SPACING_FOR_CARD_INSET,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}>
          {state.listStadium.map((marker, index) => {
            console.log('-----', marker);
            return (
              <View style={styles.card} key={index}>
                <Image
                  source={{uri: marker.image}}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  full: {position: 'absolute', top: -50, left: -50, right: -50, bottom: -50},
  marker: {width: scale(30), height: scale(30)},
  markerStadium: {width: scale(40), height: scale(40)},
  container: {
    flex: 1,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: colors.white + 'B3',
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  titleToolbar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
});

function mapStateToProps(state) {
  return {
    isPermissionLocation: state.authState.isPermissionsLocation,
  };
}

export default connect(
  mapStateToProps,
  null,
)(StadiumScreen);
