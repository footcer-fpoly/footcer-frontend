import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {headline5, Text} from '../components/common/Text';
import ToolBar from '../components/common/Toolbar';
import colors from '../theme/colors';

export default function NotificationScreen() {
  return (
    <View>
      <ToolBar
        style={{backgroundColor: colors.main}}
        center={
          <Text type={headline5} style={styles.titleToolbar}>
            Thông báo
          </Text>
        }
      />
      <Text> notification.screen </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  titleToolbar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
});
