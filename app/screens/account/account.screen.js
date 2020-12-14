import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import AccountBlock from '../../components/account/AccountBlock';
import BlockCount from '../../components/account/BlockCount';
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
  LIST_ORDER_SCREEN,
  TEAM_SCREEN,
} from '../../navigations/route-name';
import {logout} from '../../redux/actions/auth.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountScreen = ({profile, listTeam, listOrder, logout}) => {
  const navigateToScreen = (routeName, params) => () => {
    rootNavigation.navigate(routeName, params);
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return <CardMyTeam width={scale(320)} item={item} />;
  };
  return (
    <View style={styles.container}>
      <ToolBar
        title="Tài khoản"
        left={true}
        right={
          <TouchableOpacity>
            <Ionicons name="settings" size={scale(25)} color={colors.black} />
          </TouchableOpacity>
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
          <View style={styles.warpperCount}>
            <BlockCount
              style={styles.mrRight}
              lable="Đội bóng"
              count={listTeam?.length ? `${listTeam?.length} đội` : '0 đội'}
              colorCount={colors.orange}
              onPress={navigateToScreen(TEAM_SCREEN)}
            />
            <BlockCount
              style={styles.mrLeft}
              lable="Tổng số lịch đặt sân"
              count={listOrder?.length ? `${listOrder?.length} đơn` : '0 đơn'}
              colorCount={colors.blue}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.block}>
            <AccountBlock
              type={IconType.MaterialCommunityIcons}
              iconName="clipboard-list-outline"
              text="Lịch đặt sân"
              style={styles.flex47}
              onPress={navigateToScreen(LIST_ORDER_SCREEN)}
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
  mrRight: {marginRight: scale(10)},
  mrLeft: {marginLeft: scale(10)},
  scrollContainer: {
    paddingVertical: spacing.large,
    paddingHorizontal: scale(10),
  },
  container: {
    ...Styles.flex1,
    backgroundColor: colors.viewBackground,
  },
  section: {
    marginTop: spacing.large,
  },
  block: {
    width: '100%',
    ...Styles.rowBetween,
  },
  warpperAvatar: {
    ...Styles.columnCenter,
    backgroundColor: colors.blueDark,
    borderRadius: scale(5),
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
  },
  welcomeUserText: {
    color: colors.white,
    marginLeft: scale(12),
  },
  warpperCount: {
    ...Styles.rowBetween,
    width: '100%',
    marginTop: scale(30),
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
};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
    listTeam: state.teamsState.listTeam,
    listOrder: state.authState.listOrder,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreen);
