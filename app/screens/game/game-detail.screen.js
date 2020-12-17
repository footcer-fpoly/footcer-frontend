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
  const navigateToScreen = () => {
    rootNavigator.navigate(HOME_SCREEN);
  };
  return (
    <View>
      <ToolBar
        left={true}
        title="Chi tiết trận đấu"
        right={
          <TouchableOpacity style={styles.btnBack} onPress={navigateToScreen}>
            <Icon name="home" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
      />
      <Text> game-detail.screen </Text>
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
});
