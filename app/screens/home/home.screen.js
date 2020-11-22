import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import ToolBar from '../../components/common/Toolbar';
import colors from '../../theme/colors';
import {headline5, Text} from '../../components/common/Text';
import Swiper from 'react-native-swiper';
import {listImageBanner} from '../../helpers/data-local.helper';

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
        <ScrollView>
          <View style={{backgroundColor: 'red', height: 250}}>
            <Swiper
              activeDotColor={colors.main}
              dotColor={colors.white}
              autoplay={true}
              paginationStyle={styles.paginationStyle}>
              {listImageBanner?.map(image => (
                <Image
                  key={image}
                  style={styles.slideImage}
                  source={image.url}
                  resizeMode="cover"
                />
              ))}
            </Swiper>
          </View>
        </ScrollView>
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
  slideImage: {
    height: '100%',
    width: '100%',
  },
});
