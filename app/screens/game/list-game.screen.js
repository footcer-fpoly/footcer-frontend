import React from 'react';
import {View, StyleSheet} from 'react-native';
import {headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import FloatingActionButton from '../../components/game/FLoatingActionButton';
import colors from '../../theme/colors';

const ListGameScreen = () => {
  return (
    <View style={styles.container}>
      <ToolBar
        style={{backgroundColor: colors.main}}
        center={
          <Text type={headline5} style={styles.titleToolbar}>
            Danh sách trận đấu
          </Text>
        }
      />
      <Text> find-opponent.screen </Text>
      <FloatingActionButton />
    </View>
  );
};
export default ListGameScreen;
const styles = StyleSheet.create({
  titleToolbar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
  },
});
