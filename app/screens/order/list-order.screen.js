import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import ToolBar from '../../components/common/Toolbar';
import Icon from 'react-native-vector-icons/Octicons';
import rootNavigator from '../../navigations/root.navigator';
import {headline5, Text} from '../../components/common/Text';
import colors from '../../theme/colors';
import {scale} from '../../helpers/size.helper';

export default function ListOrderScreen() {
  const handleOnPress = () => {
    rootNavigator.back();
  };
  const renderToolBar = () => {
    return (
      <ToolBar
        style={styles.toolBar}
        left={
          <TouchableOpacity style={styles.btnBack} onPress={handleOnPress}>
            <Icon name="chevron-left" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
        center={
          <Text type={headline5} style={styles.titleToolBar}>
            Danh sách lịch đặt sân
          </Text>
        }
      />
    );
  };
  return (
    <View>
      {renderToolBar()}
      <Text> list-order.screen </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  btnBack: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
  toolBar: {
    backgroundColor: colors.main,
  },
  titleToolBar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
});
