import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {
  getListStadiumService,
  searchStadiumNameService,
} from '../../api/stadium.api';
import {StatusCode} from '../../api/status-code';
import markerDefault from '../../assets/images/marker-default.png';
import markerStadium from '../../assets/images/marker-stadium.png';
import animationMap from '../../assets/lottie-animation/map-animation.json';
import SearchInput from '../../components/common/SearchInput';
import {headline4, headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import ButtonMyLocation from '../../components/stadium/ButtonMyLocation';
import CardStadium from '../../components/stadium/CardStadium';
import PermissionFail from '../../components/stadium/PermissionFail';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import {showLoading, hideLoading} from '../../redux/actions/loading.action';
import TextError from '../../components/common/TextError';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const StadiumScreen = ({isPermissionLocation, showLoading, hideLoading}) => {
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
  const [search, setSearch] = useState({
    show: false,
    iconName: 'search',
    text: '',
  });
  const [showMove, setShowMove] = useState(true);
  const toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearch({
      show: !search.show,
      iconName: search.iconName === 'search' ? 'refresh' : 'search',
      text: '',
    });

    getData();
  };

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
          setShowMove(true);
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
            1000,
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
  const renderItem = (item, index) => {
    return (
      <CardStadium showMove={showMove} key={index.toString()} item={item} />
    );
  };
  const searchStadium = async () => {
    try {
      if (search.text.length) {
        showLoading();
        const res = await searchStadiumNameService(search.text);
        if (res && res.code === StatusCode.SUCCESS) {
          setState({...state, listStadium: res.data});
          setShowMove(false);
        } else {
        }
        hideLoading();
      }
    } catch (error) {}
  };
  const renderToolBar = () => {
    return (
      <>
        <ToolBar
          title="Đặt sân bóng"
          left={true}
          right={
            <TouchableOpacity onPress={toggleSearch}>
              <MaterialIcons
                name={search.iconName}
                size={scale(25)}
                color={colors.black}
              />
            </TouchableOpacity>
          }
        />
        {search.show && (
          <View style={styles.warpperSearch}>
            <SearchInput
              onChangeText={value => setSearch({...search, text: value})}
              onPress={searchStadium}
            />
          </View>
        )}
      </>
    );
  };
  if (!isPermissionLocation) {
    return (
      <>
        {renderToolBar()}
        <PermissionFail />
      </>
    );
  } else if (!state.onReady) {
    return (
      <>
        {renderToolBar()}
        <LottieView source={animationMap} style={styles.full} autoPlay loop />
      </>
    );
  }
  return (
    <View style={styles.container}>
      {renderToolBar()}
      {!search.show && (
        <ButtonMyLocation
          onPress={() => {
            _map.current.animateToRegion(
              {
                latitude: state.region.latitude,
                longitude: state.region.longitude,
                latitudeDelta: state.region.latitudeDelta,
                longitudeDelta: state.region.longitudeDelta,
              },
              1000,
            );
          }}
        />
      )}
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
        <View style={styles.warpperTitle}>
          <Text type={headline4} style={styles.titleFooter}>
            Danh sách cụm sân
          </Text>
          <View style={styles.warpperTitle}>
            <Text type={headline5} style={styles.txtCountListStadium}>
              {state.listStadium?.length}
            </Text>
            <Icon size={scale(20)} color={colors.green} name="stadium" />
          </View>
        </View>
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 10}
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
          {state.listStadium.map((marker, index) => renderItem(marker, index))}
        </Animated.ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  full: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
    zIndex: -1,
  },
  warpperSearch: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
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
    backgroundColor: colors.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
  titleFooter: {
    marginBottom: scale(10),
  },
  titleToolbar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  warpperTitle: {
    ...Styles.rowBetween,
    paddingHorizontal: scale(10),
  },
  txtCountListStadium: {
    color: colors.green,
    marginRight: spacing.tiny,
  },
  btnSearch: {
    marginRight: scale(10),
  },
});

function mapStateToProps(state) {
  return {
    isPermissionLocation: state.authState.isPermissionsLocation,
  };
}
const mapDispatchToProps = {
  showLoading,
  hideLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StadiumScreen);
