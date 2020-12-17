import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import AccountBlock from '../../components/account/AccountBlock';
import BlockCount from '../../components/account/BlockCount';
import RowButton from '../../components/account/RowButton';
import Avatar from '../../components/common/Avatar';
import ConfirmDialog from '../../components/common/dialog/ConfirmDialog';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import {headline4, headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigation from '../../navigations/root.navigator';
import {
  DETAIL_PROFILE_SCREEN,
  LIST_GAME_SCREEN,
  LIST_ORDER_SCREEN,
  NOTIFICATION_SCREEN,
  TEAM_SCREEN,
} from '../../navigations/route-name';
import {logout} from '../../redux/actions/auth.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const AccountScreen = ({profile, listTeam, listOrder, logout, domain}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const navigateToScreen = (routeName, params) => () => {
    rootNavigation.navigate(routeName, params);
  };
  const commingSoon = () => {
    ToastHelper.showToast('Tính năng đang phát triển', colors.orange);
  };
  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  return (
    <View style={styles.container}>
      <ToolBar
        title="Tài khoản"
        left={true}
        right={
          <TouchableOpacity onPress={navigateToScreen(NOTIFICATION_SCREEN)}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={scale(25)}
              color={colors.white}
            />
          </TouchableOpacity>
        }
        backgroundColor={colors.main}
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
              onPress={navigateToScreen(LIST_ORDER_SCREEN)}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.block}>
            <AccountBlock
              type={IconType.MaterialCommunityIcons}
              iconName="account-outline"
              text="Thông tin cá nhân"
              style={styles.flex47}
              onPress={navigateToScreen(DETAIL_PROFILE_SCREEN)}
            />
            <AccountBlock
              type={IconType.MaterialCommunityIcons}
              iconName="clipboard-list-outline"
              text="Lịch đặt sân"
              style={styles.flex47}
              onPress={navigateToScreen(LIST_ORDER_SCREEN)}
            />
            <AccountBlock
              type={IconType.MaterialCommunityIcons}
              iconName="account-group-outline"
              text="Quản lý đội bóng"
              style={styles.flex47}
              onPress={navigateToScreen(TEAM_SCREEN)}
            />
          </View>
        </View>
        <View style={styles.warpperOption}>
          <View style={styles.warpperSectionOption}>
            <Text type={headline5} style={styles.titleOption}>
              Tài khoản
            </Text>
            <RowButton
              iconType={IconType.MaterialCommunityIcons}
              iconName="sword-cross"
              text="Trận đấu của bạn"
              onPress={navigateToScreen(LIST_GAME_SCREEN)}
            />
            <RowButton
              iconType={IconType.MaterialCommunityIcons}
              iconName="gift-outline"
              text="Khuyến mãi dành cho bạn"
              onPress={commingSoon}
            />
            <RowButton
              iconType={IconType.MaterialCommunityIcons}
              iconName="feature-search-outline"
              text="Lịch sử tìm kiếm"
              onPress={commingSoon}
            />
            <RowButton
              iconType={IconType.MaterialCommunityIcons}
              iconName="star-circle-outline"
              text="Sân yêu thích"
              onPress={commingSoon}
            />
          </View>
          <View style={styles.warpperSectionOption}>
            <Text type={headline5} style={styles.titleOption}>
              Khác
            </Text>
            <RowButton
              iconType={IconType.MaterialCommunityIcons}
              iconName="help-circle-outline"
              text="Liên hệ trợ giúp"
              onPress={commingSoon}
            />
            <RowButton
              iconType={IconType.MaterialCommunityIcons}
              iconName="alert-circle-outline"
              text="Về chúng tôi"
              onPress={commingSoon}
            />
            <RowButton
              iconType={IconType.MaterialCommunityIcons}
              iconName="logout"
              text="Đăng xuất"
              onPress={toggleModal}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.txtfooter}>Copyright ©2020 by Footer Team</Text>
          <Text style={[styles.txtfooter, {marginTop: spacing.tiny}]}>
            Thiết kế và phát triển bởi Footcer Team
          </Text>
        </View>
      </ScrollView>
      <ConfirmDialog
        visible={visibleModal}
        confirmText="Đăng xuất"
        cancelText="Hủy"
        colorsCancel={colors.grayDark}
        colorsConfirm={colors.orange}
        title="Đăng xuất tài khoản"
        subTitle="Bạn có chắc muốn đăng xuất tài khoản?"
        onCancelClick={toggleModal}
        onConfirmClick={logout}
      />
      <Text>{domain}</Text>
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
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
    paddingBottom: scale(40),
  },
  container: {
    ...Styles.flex1,
    backgroundColor: colors.viewBackground,
  },
  section: {
    marginTop: scale(10),
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
  warpperOption: {
    backgroundColor: colors.white,
    marginTop: scale(10),
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
    paddingTop: scale(20),
  },
  titleOption: {
    color: '#16a085',
    borderBottomWidth: scale(0.5),
    borderBottomColor: colors.gray,
    paddingBottom: scale(5),
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(30),
  },
  warpperSectionOption: {
    marginBottom: scale(10),
  },
  txtfooter: {
    fontSize: scale(12),
    color: '#a4b0be',
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
    domain: state.appState.domain,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreen);
