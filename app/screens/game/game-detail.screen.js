import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ToolBar from '../../components/common/Toolbar';
import Icon from 'react-native-vector-icons/Octicons';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {headline5, Text} from '../../components/common/Text';
import rootNavigator from '../../navigations/root.navigator';
import {HOME_SCREEN} from '../../navigations/route-name';

export default function GameDetailScreen() {
  const handleOnPress = () => {
    rootNavigator.back();
  };
  const navigateToScreen = () => {
    rootNavigator.navigate(HOME_SCREEN);
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
            Chi tiết trân đấu
          </Text>
        }
        right={
          <TouchableOpacity style={styles.btnBack} onPress={navigateToScreen}>
            <Icon name="home" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
      />
    );
  };
  return (
    <View>
      {renderToolBar()}
      <Text> game-detail.screen </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toolBar: {
    backgroundColor: colors.main,
  },
  titleToolBar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  btnBack: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(15),
  },
});
