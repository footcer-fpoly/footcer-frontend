import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {headline5, Text} from '../components/common/Text';
import ToolBar from '../components/common/Toolbar';
import colors from '../theme/colors';

export default function NotificationScreen() {
  return (
    <View>
      <ToolBar left={true} title="Thông báo" />
      <Text> notification.screen </Text>
    </View>
  );
}
const styles = StyleSheet.create({});
