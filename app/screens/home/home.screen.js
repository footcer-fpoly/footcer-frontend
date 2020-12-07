import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import {headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import {listImageBanner} from '../../helpers/data-local.helper';
import {getListOrder} from '../../redux/actions/auth.action';
import {getListTeam} from '../../redux/actions/teams.action';
import colors from '../../theme/colors';

const HomeScreen = ({getListOrder, getListTeam}) => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([getListOrder(), getListTeam()]);
  };
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
          {/* <Swiper
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
          </Swiper> */}
        </View>
      </ScrollView>
    </View>
  );
};
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

const mapDispatchToProps = {
  getListOrder,
  getListTeam,
};

export default connect(
  null,
  mapDispatchToProps,
)(HomeScreen);
