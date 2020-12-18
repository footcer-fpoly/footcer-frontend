import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';

export default function NotificationScreen() {
  return (
    <View>
      <ToolBar left={true} title="Thông báo" />
      <Text> notification.screen </Text>
    </View>
  );
}
const styles = StyleSheet.create({});
