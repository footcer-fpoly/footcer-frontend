import React, {useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import AccountBlock from '../../components/account/AccountBlock';
import CardMyTeam from '../../components/account/CardMyTeam';
import Avatar from '../../components/common/Avatar';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import {headline4, headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigation from '../../navigations/root.navigator';
import {
  CREATE_TEAM_SCREEN,
  DETAIL_PROFILE_SCREEN,
  TEST_SCREEN,
} from '../../navigations/route-name';
import {logout} from '../../redux/actions/auth.action';
import {getListTeam} from '../../redux/actions/teams.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const AccountScreen = ({profile, listTeam, logout, getListTeam}) => {
  useEffect(() => {
    getListTeam();
  }, []);
  const navigateToScreen = (routeName, params) => () => {
    rootNavigation.navigate(routeName, params);
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return <CardMyTeam item={item} />;
  };
  return (
    <View style={styles.container}>
      <ToolBar
        style={{backgroundColor: colors.main}}
        center={
          <Text type={headline5} style={styles.titleContent}>
            Tài khoản
          </Text>
        }
      />
      <ScrollView
        style={styles.flex1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.warpperAvatar}>
          <Avatar
            image={profile.avatar}
            size={90}
            onPressImage={navigateToScreen(DETAIL_PROFILE_SCREEN)}
          />
          <Text
            type={headline4}
            style={styles.welcomeUserText}
            numberOfLines={1}>
            Xin chào, {profile.displayName}
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.block}>
            <AccountBlock
              type={IconType.MaterialIcons}
              iconName="person-search"
              text="Tìm đội bóng"
              style={styles.flex47}
              onPress={navigateToScreen(TEST_SCREEN)}
            />
            <AccountBlock
              type={IconType.MaterialIcons}
              iconName="group-add"
              text="Tạo đội bóng"
              style={styles.flex47}
              onPress={navigateToScreen(CREATE_TEAM_SCREEN)}
            />
            <AccountBlock
              type={IconType.MaterialIcons}
              iconName="share"
              text="Mời bạn bè"
              style={styles.flex47}
              onPress={() => ToastHelper.showToast('haha')}
            />
          </View>
          <View style={[styles.block, {marginTop: spacing.small}]}>
            <AccountBlock
              type={IconType.MaterialIcons}
              iconName="settings"
              text="Cài đặt"
              style={styles.flex47}
            />
            <AccountBlock
              type={IconType.MaterialIcons}
              iconName="qr-code"
              text="QR Code"
              style={styles.flex47}
            />
            <AccountBlock
              onPress={logout}
              type={IconType.MaterialIcons}
              iconName="logout"
              text="Đăng xuất"
              style={styles.flex47}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.warpperTeam}>
            <Text type={headline5} style={styles.txtMyTeam}>
              Danh sách đội bóng của bạn
            </Text>
            <View style={styles.warpperTeam}>
              <Text type={headline5} style={styles.txtCountTeam}>
                {listTeam?.length}
              </Text>
              <Icon
                size={scale(20)}
                color={colors.green}
                name="account-group"
              />
            </View>
          </View>
          <FlatList
            data={listTeam}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.listMember}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={
              <ListLoadingComponent
                onReady={listTeam !== null}
                numberOfPlaceholder={1}
                text={
                  'Bạn chưa tham gia đội bóng nào click vào tạo đội bóng để tạo đội ngay!'
                }
              />
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  flex47: {
    ...Styles.flex32,
  },
  scrollContainer: {
    paddingVertical: spacing.large,
    paddingHorizontal: scale(10),
  },
  container: {
    ...Styles.flex1,
    backgroundColor: colors.white,
  },
  titleContent: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  section: {
    marginTop: spacing.large,
  },
  block: {
    width: '100%',
    ...Styles.rowBetween,
  },
  warpperAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeUserText: {
    color: colors.black,
    marginLeft: scale(12),
  },
  txtMyTeam: {
    color: colors.blueDark,
    marginBottom: spacing.medium,
  },
  warpperTeam: {
    ...Styles.rowBetween,
  },
  txtCountTeam: {
    color: colors.green,
    marginRight: spacing.tiny,
  },
});
const mapDispatchToProps = {
  logout,
  getListTeam,
};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
    listTeam: state.teamsState.listTeam,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreen);
