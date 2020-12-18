import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Octicons';
import {
  deleteGameService,
  getGameDetailService,
  joinGameService,
} from '../../api/game.api';
import {StatusCode} from '../../api/status-code';
import ListLoadingComponent from '../../components/common/ListLoadingComponent';
import PrimaryButton from '../../components/common/PrimaryButton';
import {body2, body3, headline5, Text} from '../../components/common/Text';
import ToolBar from '../../components/common/Toolbar';
import ModalPickerTeams from '../../components/game/ModalPickerTeams';
import ItemTeamMember from '../../components/team/ItemTeamMember';
import {scale} from '../../helpers/size.helper';
import rootNavigator from '../../navigations/root.navigator';
import {HOME_SCREEN, TEAM_DETAIL_SCREEN} from '../../navigations/route-name';
import colors from '../../theme/colors';
import CardMyTeam from '../../components/team/CardMyTeam';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {showLoading, hideLoading} from '../../redux/actions/loading.action';
import {ToastHelper} from '../../helpers/ToastHelper';
import Styles from '../../helpers/styles.helper';
import spacing from '../../theme/spacing';
import {converSecondsToTime, formatToDate} from '../../helpers/format.helper';
import RowProflie from '../../components/account/RowProflie';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import RowInfo from '../../components/common/RowInfo';
import ButtonOutline from '../../components/common/ButtonOutline';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const GameDetailScreen = ({route, showLoading, hideLoading, profile}) => {
  const {gameId} = route.params;
  const modalizeTeamsRef = useRef();
  const [state, setState] = useState({
    data: {},
    onReady: false,
    team: null,
    isLeader: false,
    editable: false,
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getGameDetailService(gameId);
      if (res && res.code === StatusCode.SUCCESS) {
        const isLeader = profile?.userId === res?.data?.leaderIdHost;
        setState({
          ...state,
          data: res?.data,
          onReady: true,
          isLeader,
        });
      }
    } catch (error) {
      console.log(
        'LOG -> file: game-detail.screen.js -> line 20 -> getData -> error',
        error,
      );
    }
  };

  const toggleEdit = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setState({...state, editable: !state.editable});
  };

  const navigateToScreen = (name, params) => () => {
    rootNavigator.navigate(name, params);
  };
  const joinGame = async () => {
    try {
      showLoading();
      const res = await joinGameService({
        gameId: state?.data?.gameId,
        teamId: state?.team?.teamId,
        userNotifyId: state?.data?.leaderIdHost,
        nameHost: state?.data?.teamHost?.teamNameHost,
        nameInvite: state?.team?.name,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        rootNavigator.back();
      }
      hideLoading();
    } catch (error) {
      console.log(
        'LOG -> file: game-detail.screen.js -> line 113 -> joinGame -> error',
        error,
        hideLoading(),
        ToastHelper.showToast('Lỗi', colors.red),
      );
    }
  };
  const showDialogTeams = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (modalizeTeamsRef.current) {
      modalizeTeamsRef.current.openModal();
    }
  };
  const onSelectItemTeam = (itemData) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const hasInvite = state?.data?.teamInvite?.filter(
      (item) => item?.teamIdTemp === itemData.item?.teamId,
    );
    if (!hasInvite) {
      setState({...state, team: itemData.item});
    } else {
      ToastHelper.showToast('Đội bóng đã tham gia trận đấu', colors.yellowDark);
    }
  };

  const changeTeam = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setState({...state, team: null});
  };

  const deleteGame = async () => {
    try {
      showLoading();
      const res = await deleteGameService(gameId);
      console.log('LOG -> deleteGame -> res', res);
      if (res && res.code === StatusCode.SUCCESS) {
        rootNavigator.back();
        ToastHelper.showToast('Hủy trận đấu thành công', colors.greenDark);
      } else {
        ToastHelper.showToast('Lỗi', colors.red);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      ToastHelper.showToast('Lỗi', colors.red);
      console.log(
        'LOG -> file: game-detail.screen.js -> line 136 -> deleteGame -> error',
        error,
      );
    }
  };

  const onPressDirection = (
    latitude = 0,
    longitude = 0,
    label = 'Footcer',
  ) => async () => {
    const url = Platform.select({
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });
    const isLinkingSupport = await Linking.canOpenURL(url);
    if (isLinkingSupport) {
      Linking.openURL(url);
    } else {
      const urlGoogleMap = `https://www.google.com/maps/dir/Current+Location/${latitude},${longitude}`;
      Linking.openURL(urlGoogleMap);
    }
  };

  const renderButtonJoin = () => {
    if (state.team) {
      return <PrimaryButton onPress={joinGame} title="Tham gia trận đấu" />;
    } else {
      return (
        <PrimaryButton
          onPress={showDialogTeams}
          title="Chọn đội bóng của bạn để tham gia trận đấu"
        />
      );
    }
  };

  const renderButtonFooter = () => {
    if (
      state?.isLeader &&
      !state?.data?.teamInvite?.length &&
      !state?.data?.teamIdGuest
    ) {
      return (
        <View style={styles.warpperButtonEdit}>
          <PrimaryButton
            style={[styles.flex49, {backgroundColor: colors.red}]}
            title="Hủy trận đấu"
            onPress={deleteGame}
          />
          <PrimaryButton
            onPress={toggleEdit}
            style={[styles.flex49, {backgroundColor: colors.greenDark}]}
            title="chỉnh sửa"
          />
        </View>
      );
    } else {
      return <View style={styles.warpperButtonEdit}>{renderButtonJoin()}</View>;
    }
  };

  const renderToolBar = () => {
    return (
      <ToolBar
        left={true}
        title="Chi tiết trận đấu"
        backgroundColor={colors.main}
        right={
          <TouchableOpacity onPress={navigateToScreen(HOME_SCREEN)}>
            <Icon name="home" size={scale(25)} color={colors.white} />
          </TouchableOpacity>
        }
      />
    );
  };
  const keyExtractor = (item, index) => index.toString();
  const renderItemMember = ({item, index}) => {
    return (
      <ItemTeamMember
        image={item?.teamAvatarTemp}
        size={scale(80)}
        name={item?.teamNameTemp}
        status={0}
        onPressImage={navigateToScreen(TEAM_DETAIL_SCREEN, {
          teamID: item?.teamIdTemp,
          flag: 2,
          dataGame: state.data,
        })}
        position={true}
        me={false}
      />
    );
  };
  if (!state.onReady) {
    return (
      <>
        {renderToolBar()}
        <Text />
        <ListLoadingComponent onReady={state.onReady} />
      </>
    );
  }

  return (
    <Host>
      <View style={styles.flex1}>
        {renderToolBar()}
        <ScrollView
          contentContainerStyle={{paddingBottom: scale(50)}}
          style={styles.container}>
          <View style={styles.wrapperSection}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.titleSection} type={headline5}>
                THÔNG TIN TRẬN ĐẤU
              </Text>
              {state.editable && (
                <TouchableOpacity
                  hitSlop={styles.hitSlop}
                  // onPress={onPress}
                  style={{
                    backgroundColor: colors.gray,
                    ...Styles.borderRadiusCircle(30),
                    ...Styles.columnCenter,
                  }}>
                  <MaterialIcons color={colors.white} name="edit" size={18} />
                </TouchableOpacity>
              )}
            </View>
            <RowProflie
              label="Cụm sân"
              value={state?.data?.stadium?.stadiumName}
              iconType={IconType.MaterialCommunityIcons}
              iconName="stadium"
              editable={false}
              otherTextInputProps={{
                multiline: true,
              }}
            />
            <RowProflie
              label="Sân con"
              // value={data?.category}
              iconType={IconType.MaterialCommunityIcons}
              iconName="camera-metering-partial"
              editable={false}
            />
            <RowProflie
              label="Địa chỉ"
              value={state?.data?.stadium?.address}
              iconType={IconType.MaterialIcons}
              iconName="location-on"
              editable={false}
              otherTextInputProps={{
                multiline: true,
              }}
            />
            <RowProflie
              label="Ngày"
              value={formatToDate(state?.data?.date)}
              iconType={IconType.MaterialIcons}
              iconName="date-range"
              editable={false}
            />
            <RowProflie
              label="Thời gian"
              value={`${converSecondsToTime(
                state?.data?.stadiumDetails?.startTimeDetail,
              )} -${converSecondsToTime(
                state?.data?.stadiumDetails?.endTimeDetail,
              )}`}
              iconType={IconType.MaterialCommunityIcons}
              iconName="timelapse"
              editable={false}
            />
          </View>
          <ButtonOutline
            style={{backgroundColor: colors.white}}
            title="Chỉ đường"
            colorOutline={colors.blue}
            titleColor={colors.blue}
            onPress={onPressDirection(
              state?.data?.stadium?.latitude,
              state?.data?.stadium?.longitude,
              state?.data?.stadium?.address,
            )}
            left={
              <MaterialCommunityIcons
                size={scale(20)}
                color={colors.blue}
                name="map-search-outline"
              />
            }
          />
          <View style={styles.warppeMatch}>
            <View style={styles.warpperTeam}>
              <Text type={headline5} style={styles.txtTitleTeam}>
                Đội chủ nhà
              </Text>
              <ItemTeamMember
                image={state.data?.teamHost?.teamAvatarHost}
                size={scale(80)}
                name={state.data?.teamHost?.teamNameHost}
                status={0}
                onPressImage={navigateToScreen(TEAM_DETAIL_SCREEN, {
                  teamID: state.data?.teamIdHost,
                })}
                me={false}
                style={styles.mr0}
                position={0}
              />
            </View>
            <View style={{...Styles.columnCenter}}>
              {state.editable && (
                <TouchableOpacity
                  hitSlop={styles.hitSlop}
                  // onPress={onPress}
                  style={{
                    backgroundColor: colors.gray,
                    ...Styles.borderRadiusCircle(30),
                    ...Styles.columnCenter,
                    marginBottom: scale(20),
                  }}>
                  <MaterialIcons color={colors.white} name="edit" size={18} />
                </TouchableOpacity>
              )}
              <Text type={body3} style={styles.txtType}>
                {state?.data?.type}
              </Text>
            </View>
            <View style={styles.warpperTeam}>
              <Text type={headline5} style={styles.txtTitleTeam}>
                Đội khách
              </Text>
              {state.data?.teamIdGuest ? (
                <ItemTeamMember
                  image={state.data?.teamGuest?.teamAvatarGuest}
                  size={scale(80)}
                  name={state.data?.teamGuest?.teamNameGuest}
                  status={0}
                  onPressImage={navigateToScreen(TEAM_DETAIL_SCREEN, {
                    teamID: state.data?.teamIdHost,
                  })}
                  me={false}
                  style={styles.mr0}
                  position={0}
                />
              ) : (
                <View style={styles.warppeNoData}>
                  <Icon name="question" size={scale(80)} color={colors.gray} />
                  <Text
                    type={headline5}
                    numberOfLines={2}
                    style={[styles.txtNameTeam, {color: colors.gray}]}>
                    Chưa có đối thủ
                  </Text>
                </View>
              )}
            </View>
          </View>
          {!state?.data?.teamIdGuest && (
            <View style={styles.wrapperListTeamInvite}>
              <View style={styles.warppeTitleList}>
                <Text type={headline5} style={styles.flex1}>
                  Danh sách đội bóng đang chờ xác nhận tham gia trận đấu
                </Text>
                <View style={styles.warppeCountList}>
                  <Text type={headline5} style={{marginRight: scale(5)}}>
                    {state?.data?.teamInvite?.length || 0}
                  </Text>
                  <MaterialCommunityIcons
                    size={scale(20)}
                    color={colors.green}
                    name="account-group"
                  />
                </View>
              </View>
              <FlatList
                data={state?.data?.teamInvite}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.listTeam}
                keyExtractor={keyExtractor}
                renderItem={renderItemMember}
              />
            </View>
          )}

          {state.team && (
            <View style={styles.warppeTeam}>
              <TouchableOpacity onPress={changeTeam} style={styles.iconRemove}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={30}
                  color={colors.red}
                />
              </TouchableOpacity>
              <CardMyTeam item={state.team} />
            </View>
          )}

          {renderButtonFooter()}
          {state.isLeader && (
            <Text type={body3} style={styles.txtNote}>
              * Bạn chỉ có thể chỉnh sửa / xóa trận đấu khi chưa có team tham
              gia
            </Text>
          )}
          <ModalPickerTeams
            ref={modalizeTeamsRef}
            onSelectItem={onSelectItemTeam}
          />
        </ScrollView>
      </View>
    </Host>
  );
};

const styles = StyleSheet.create({
  flex49: {flex: 0.49},
  flex1: {flex: 1},
  mr0: {marginRight: 0},
  container: {
    ...Styles.flex1,
    backgroundColor: colors.viewBackground,
  },
  wrapperSection: {
    paddingHorizontal: scale(10),
    backgroundColor: colors.white,
    paddingTop: scale(10),
  },
  wrapperListTeamInvite: {
    marginTop: scale(5),
    backgroundColor: colors.white,
    paddingVertical: scale(10),
  },
  listTeam: {
    paddingHorizontal: scale(10),
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  warppeTitleList: {
    paddingHorizontal: scale(10),
    flexDirection: 'row',
  },
  warppeCountList: {
    flexDirection: 'row',
    marginLeft: scale(10),
  },
  warppeMatch: {
    ...Styles.rowBetween,
    marginTop: scale(10),
    backgroundColor: colors.white,
    paddingHorizontal: scale(10),
    paddingTop: scale(15),
  },
  warppeNoData: {
    flex: 1,
    alignItems: 'center',
    marginTop: scale(-5),
  },
  txtTitleTeam: {
    marginBottom: scale(15),
    color: colors.greenDark,
  },
  warpperTeam: {
    ...Styles.columnCenter,
    flex: 1,
    paddingHorizontal: scale(10),
  },
  txtType: {
    ...Styles.borderView(colors.main, 1, scale(5)),
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
    marginTop: scale(5),
  },
  warppeTeam: {
    alignItems: 'flex-end',
  },
  iconRemove: {
    paddingHorizontal: scale(10),
  },
  warpperButtonEdit: {
    ...Styles.rowBetween,
    marginBottom: scale(10),
    marginTop: scale(20),
    paddingHorizontal: scale(10),
  },
  txtNote: {
    paddingHorizontal: scale(10),
    marginTop: scale(20),
    color: colors.gray,
    textAlign: 'center',
  },
  txtNameTeam: {
    marginTop: spacing.small,
    maxWidth: scale(100),
    textAlign: 'center',
  },
});

const mapDispatchToProps = {showLoading, hideLoading};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GameDetailScreen);
