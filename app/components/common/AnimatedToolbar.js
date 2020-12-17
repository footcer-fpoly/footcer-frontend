import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {yardImage} from '../../assets/Images';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import BackgroudImage from './BackgroudImage';
import {headline4} from './Text';
import ToolBar from './Toolbar';
import {Text} from '../../components/common/Text';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function AnimatedToolbar({
  scrollY,
  image,
  height,
  onPress,
  children,
  style,
}) {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 50],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.header, {height: headerHeight}, style]}>
      {/* <ToolBar
        style={styles.bar}
        center={
          <Text type={headline4} style={styles.titleContent}>
            Tài khoản
          </Text>
        }
      /> */}
      {/* <BackgroudImage
        style={styles.backgroundImage}
        height={300}
        image={image}
        onPress={onPress}
        children={children}
      /> */}
      <Animated.Image
        style={[
          styles.backgroundImage,
          {
            // opacity: imageOpacity,
            transform: [{translateY: imageTranslate}],
          },
        ]}
        source={yardImage}
      />
      <View style={styles.bar}>
        <Text style={styles.title}>Title</Text>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    zIndex: -1,
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
});
