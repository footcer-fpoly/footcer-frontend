import React from 'react';
import {View, StyleSheet} from 'react-native';
import {headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import colors from '../../theme/colors';

const FindOpponentScreen = () => {
  return (
    <View>
      <ToolBar
        style={{backgroundColor: colors.main}}
        center={
          <Text type={headline5} style={styles.titleToolbar}>
            Danh sách trận đấu
          </Text>
        }
      />
      <Text> find-opponent.screen </Text>
    </View>
  );
};
export default FindOpponentScreen;
const styles = StyleSheet.create({
  titleToolbar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
});
