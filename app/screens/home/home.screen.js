import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, KeyboardAvoidingView} from 'react-native';
import LottieView from 'lottie-react-native';
import ToolBar from '../../components/common/Toolbar';
import colors from '../../theme/colors';
import {headline5, Text} from '../../components/common/Text';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ToolBar
          style={{backgroundColor: colors.main}}
          center={
            <Text type={headline5} style={styles.titleToolbar}>
              Trang chủ
            </Text>
          }
        />
        <Text>haha</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    backgroundColor: '#EDEDED',
  },
  titleToolbar: {
    color: colors.white,
    textTransform: 'uppercase',
  },
});
