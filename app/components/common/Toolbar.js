import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import dimens from '../../theme/dimens';
import Icon from 'react-native-vector-icons/Octicons';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import rootNavigator from '../../navigations/root.navigator';
import {headline5, Text} from './Text';

const ToolBar = ({
  left,
  right,
  style,
  backgroundColor,
  barStyle,
  title,
  onPressBack,
}) => {
  const {TOOL_BAR_HEIGHT} = dimens;
  const handleOnPress = () => {
    rootNavigator.back();
  };
  return (
    <SafeAreaView style={[styles.container(backgroundColor), style]}>
      <StatusBar barStyle={barStyle} />
      <View style={styles.statusbar} />
      <View style={styles.containerToolbar(TOOL_BAR_HEIGHT)}>
        <TouchableOpacity
          style={styles.iconLeft}
          onPress={onPressBack ? onPressBack : handleOnPress}>
          {left && (
            <Icon
              name="chevron-left"
              size={scale(25)}
              color={backgroundColor ? colors.white : colors.black}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.center(backgroundColor)} type={headline5}>
          {`  ${title}`}
        </Text>
        <View style={styles.iconRight}>{right}</View>
      </View>
    </SafeAreaView>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  container: (bg) => ({
    backgroundColor: bg ? bg : colors.white,
  }),
  containerToolbar: (TOOL_BAR_HEIGHT) => ({
    height: TOOL_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderBottomWidth: scale(0.5),
    borderBottomColor: colors.grayOpacity,
  }),
  statusbar: {
    height: Platform.select({
      ios: 0,
      android: StatusBar.currentHeight,
      default: 0,
    }),
  },
  iconLeft: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(50),
  },
  iconRight: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(50),
  },
  center: (bg) => ({
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: bg ? colors.white : colors.black,
  }),
});
