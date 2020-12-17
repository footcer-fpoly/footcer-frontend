import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigation from '../../navigations/root.navigator';
import {TEAM_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import PrimaryButton from '../common/PrimaryButton';
import {headline3, headline5, Text} from '../common/Text';
import Octicons from 'react-native-vector-icons/Octicons';
import {connect} from 'react-redux';

const CardMyTeam = ({item, onPress, width, confirm, profile}) => {
  const listMember = [...item?.member];
  const leader = listMember.shift();
  const isLeader = leader?.user?.userId === profile.userId;

  const navigateToScreen = (routeName, params) => () => {
    rootNavigation.navigate(routeName, params);
  };
  const renderMember = () => {
    return (
      <View style={styles.warpperList}>
        {item?.member?.map((item, index) => {
          return (
            <Image
              style={styles.imgMem(!index)}
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
      disabled={confirm}
      style={styles.container(width)}>
      <ImageBackground
        source={{uri: item?.background}}
        style={styles.background}>
        <LinearGradient
          colors={colors.blackGradientRevres}
          style={styles.gradient}>
          {isLeader && (
            <Octicons
              name="bookmark"
              size={scale(50)}
              color={colors.yellow}
              style={styles.iconLead}
            />
          )}
          <Text type={headline3} style={styles.txtTeamName(isLeader)}>
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
        {confirm && (
          <PrimaryButton
            onPress={navigateToScreen(TEAM_DETAIL_SCREEN, {
              teamDetail: item,
              flag: 1,
            })}
            style={styles.btn}
            title="Phản hồi lời mời"
          />
        )}
      </ImageBackground>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  txtMem: {
    color: '#48dbfb',
    marginBottom: spacing.small,
  },
  container: (width) => ({
    height: scale(200),
    width: '100%',
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
    justifyContent: 'flex-end',
    paddingHorizontal: scale(10),
    paddingBottom: scale(10),
  },
  iconLead: {
    position: 'absolute',
    top: scale(-2),
    left: scale(10),
  },
  warpperListMem: (bottom) => ({
    flex: 1,
    position: 'absolute',
    left: scale(10),
    bottom,
  }),
  warpperList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.small,
  },
  imgMem: (isLeader) => ({
    ...Styles.borderRadiusCircle(scale(50)),
    // ...Styles.borderView(
    //   isLeader ? colors.yellow : colors.white,
    //   2,
    //   scale(50) / 2,
    // ),
    ...Styles.borderView(colors.white, 2, scale(50) / 2),
    marginLeft: -spacing.small,
  }),
  imgBgTeam: {
    ...Styles.borderRadiusCircle(60),
    position: 'absolute',
    top: 10,
    right: 10,
  },
  txtTeamName: (isLeader) => ({
    color: colors.white,
    position: 'absolute',
    top: scale(10),
    left: isLeader ? scale(50) : scale(10),
  }),
  btn: {
    backgroundColor: colors.greenDark,
  },
});

const mapDispatchToProps = {};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CardMyTeam);
