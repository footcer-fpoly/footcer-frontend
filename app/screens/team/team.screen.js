import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ToolBar from '../../components/common/Toolbar';

export default function TeamScreen() {
  return (
    <View>
      <ToolBar left={true} title="Quản lý đội bóng" />
      <Text> team.screen </Text>
    </View>
  );
}
