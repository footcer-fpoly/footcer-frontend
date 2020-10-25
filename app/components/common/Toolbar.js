import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import dimens from '../../theme/dimens';

const ToolBar = ({
  left,
  center,
  right,
  style,
  leftStyle,
  rightStyle,
  barStyle,
}) => {
  const {TOOL_BAR_HEIGHT} = dimens;

  return (
    <SafeAreaView style={style}>
      <StatusBar barStyle={barStyle} />
      <View style={styles.statusbar} />
      <View style={styles.container(TOOL_BAR_HEIGHT)}>
        <View style={[styles.iconStyle, styles.left, leftStyle]}>{left}</View>
        <View style={styles.center}>{center}</View>
        <View style={[styles.iconStyle, styles.right, rightStyle]}>
          {right}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  container: TOOL_BAR_HEIGHT => ({
    height: TOOL_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    alignItems: 'stretch',
  }),
  statusbar: {
    height: Platform.select({
      ios: 0,
      android: StatusBar.currentHeight,
      default: 0,
    }),
  },
  iconStyle: {
    justifyContent: 'center',
    minWidth: '15%',
    maxWidth: '40%',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
