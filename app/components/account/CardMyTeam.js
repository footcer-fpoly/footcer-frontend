import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigation from '../../navigations/root.navigator';
import {TEAM_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import {headline3, headline5, Text} from '../common/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CardMyTeam({item, onPress, width}) {
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
      onPress={
        onPress
          ? onPress
          : navigateToScreen(TEAM_DETAIL_SCREEN, {teamDetail: item})
      }
      style={styles.container(width)}>
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
              {item?.member?.length === 1 ? 'Thêm thành viên' : 'Thành viên'}
            </Text>
            {item?.member?.length === 1 ? (
              <TouchableOpacity
                onPress={navigateToScreen(TEAM_DETAIL_SCREEN, {
                  teamDetail: item,
                })}>
                <Icon name="add-circle" size={50} color={colors.greenLight} />
              </TouchableOpacity>
            ) : (
              renderMember()
            )}
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
  container: width => ({
    marginRight: spacing.medium,
    height: scale(200),
    width: width,
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: spacing.medium,
  }),
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
    ...Styles.borderRadiusCircle(scale(50)),
    ...Styles.borderView(colors.white, 2, scale(50) / 2),
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
