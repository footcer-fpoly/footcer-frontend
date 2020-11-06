import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import {yardImage} from '../../assets/Images';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import IconMaterialOrSvg from '../common/IconMaterialOrSvg';
import {
  body2,
  body3,
  headline3,
  headline4,
  headline5,
  Text,
} from '../common/Text';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../../helpers/styles.helper';
import rootNavigation from '../../navigations/root.navigator';
import {TEAM_DETAIL_SCREEN} from '../../navigations/route-name';

export default function CardMyTeam({item}) {
  console.log('item: ', item);
  const navigateToScreen = (routeName, params) => () => {
    rootNavigation.navigate(routeName, params);
  };
  const renderMember = () => {
    return (
      <View style={styles.warpperList}>
        {item?.member?.map(item => {
          return (
            <Image
              style={styles.imgMem}
              key={item.user.userId}
              source={{
                uri: item.user.avatar,
              }}
            />
          );
        })}
      </View>
    );
  };
  return (
    <TouchableHighlight
      onPress={navigateToScreen(TEAM_DETAIL_SCREEN, {teamDetail: item})}
      style={styles.container}>
      <ImageBackground
        source={{uri: item?.background}}
        style={styles.background}>
        <LinearGradient
          colors={['#00000000', '#00000070', '#00000090']}
          style={styles.gradient}>
          <Text type={headline3} style={styles.txtTeamName}>
            {item?.name}
          </Text>
          <Image
            style={styles.imgBgTeam}
            source={{
              uri: item?.avatar,
            }}
          />
          <View style={styles.warpperListMem}>
            <Text type={headline5} style={styles.txtMem}>
              Thành viên
            </Text>
            {renderMember()}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  txtMem: {
    color: '#48dbfb',
    marginBottom: spacing.small,
  },
  container: {
    marginRight: spacing.medium,
    height: scale(200),
    width: scale(320),
    overflow: 'hidden',
    borderRadius: 10,
  },
  background: {
    flex: 1,
    borderRadius: 1000,
  },
  gradient: {
    flex: 1,
  },
  warpperListMem: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  warpperList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.small,
  },
  imgMem: {
    ...Styles.borderRadiusCircle(50),
    ...Styles.borderColor(colors.white, 2),
    marginLeft: -spacing.small,
  },
  imgBgTeam: {
    ...Styles.borderRadiusCircle(60),
    position: 'absolute',
    top: 10,
    right: 10,
  },
  txtTeamName: {
    color: colors.white,
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
