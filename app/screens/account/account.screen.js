import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import AccountBlock from '../../components/account/AccountBlock';
import CardMyTeam from '../../components/account/CardMyTeam';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import NoDataComponent from '../../components/common/NoDataComponent';
import {headline4, headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
// import Avatar from '../../components/account/avatar';
import rootNavigation from '../../navigations/root.navigator';
import {
  CREATE_TEAM_SCREEN,
  DETAIL_PROFILE_SCREEN,
} from '../../navigations/route-name';
import {logout} from '../../redux/actions/auth.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const AccountScreen = ({profile, logout}) => {
  const [listMyTeam, setListMyTeam] = useState([1, 2, 3, 4, 5]);
  const navigateToScreen = (routeName, params) => () => {
    rootNavigation.navigate(routeName, params);
  };
  const renderItem = item => {
    return <CardMyTeam />;
  };
  return (
    <View style={styles.container}>
      <ToolBar
        style={{backgroundColor: colors.main}}
        center={
          <Text type={headline4} style={styles.titleContent}>
            Tài khoản
          </Text>
        }
      />
      <ScrollView
        style={styles.flex1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.warpperAvatar}>
          <TouchableOpacity onPress={navigateToScreen(DETAIL_PROFILE_SCREEN)}>
            <Image source={{uri: profile.avatar}} style={styles.avatar} />
          </TouchableOpacity>
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
          <Text type={headline5} style={styles.txtMyTeam}>
            Đội bóng của bạn
          </Text>
          <FlatList
            data={listMyTeam}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.listMember}
            keyExtractor={item => item}
            renderItem={renderItem}
          />
          {/* <NoDataComponent text="Bạn chư tham gia đội bóng nào click vào tạo đội bóng để tạo đội ngay!" /> */}
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
  avatar: {
    ...Styles.borderRadiusCircle(100),
    borderWidth: 2,
    borderColor: colors.gray,
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
});
const mapDispatchToProps = {
  logout,
};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreen);
