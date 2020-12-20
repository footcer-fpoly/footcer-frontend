import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Host} from 'react-native-portalize';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {
  acceptInviteGameService,
  refuseInviteGameService,
} from '../../api/game.api';
import {StatusCode} from '../../api/status-code';
import {
  acceptInviteTeamService,
  cancelInviteTeamService,
  deleteMemberService,
  deleteTeamService,
  getTeamDetailService,
  outTeamTeamService,
  updateAvatarTeamService,
  updateBackgroundTeamService,
  updateInfoTeamService,
} from '../../api/team.api';
import imageDelete from '../../assets/svg/img_delete.svg';
import imageOut from '../../assets/svg/img_out.svg';
import RowProflie from '../../components/account/RowProflie';
import Avatar from '../../components/common/Avatar';
import BackgroudImage from '../../components/common/BackgroudImage';
import BackIcon from '../../components/common/BackIcon';
import ConfirmDialog from '../../components/common/dialog/ConfirmDialog';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import ModalPicker from '../../components/common/ModalPicker';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';
import {headline4, headline5, Text} from '../../components/common/Text';
import ContentPlaceholder from '../../components/placeholder/ContentPlaceholder';
import ImagePlaceholder from '../../components/placeholder/ImagePlaceholder';
import ItemTeamMember from '../../components/team/ItemTeamMember';
import ModalAddMember from '../../components/team/ModalAddMember';
import ModalShowInfoMember from '../../components/team/ModalShowInfoMember';
import AlertHelper from '../../helpers/alert.helper';
import {ListLevel, ListProvince} from '../../helpers/data-local.helper';
import {formatToDate} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigator from '../../navigations/root.navigator';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import {getListTeam} from '../../redux/actions/teams.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const TeamDetailScreen = ({
  route,
  showLoading,
  hideLoading,
  profile,
  listGameUser,
}) => {
  const {teamID} = route.params;
  const flag = route?.params?.flag;
  console.log('LOG -> TeamDetailScreen -> flag', flag);
  const dataGame = route?.params?.dataGame;

  const modalizeRef = useRef();
  const modalAddMemberRef = useRef();
  const [data, setData] = useState({
    teamId: '',
    avatar: '',
    background: '',
    place: '',
    description: '',
    level: '',
    member: '',
    name: '',
    isLeader: false,
    onReady: false,
    isRefreshing: false,
    errorYup: null,
    hasInvite: false,
    leaderId: '',
  });
  const [editable, setEditable] = useState(false);
  const [visibleModalDele, setVisibleModalDele] = useState(false);
  const [modalInfoMember, setModalInfoMember] = useState({
    visible: false,
    data: null,
    index: 0,
  });
  const [visibleModalOut, setVisibleModalOut] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(true);
  const toggleModalOut = () => {
    setVisibleModalOut(!visibleModalOut);
  };
  useEffect(() => {
    getData();
  }, []);

  const onRefresh = () => {
    setData({...data, isRefreshing: true});
    getData();
  };

  const getData = async () => {
    try {
      const res = await getTeamDetailService(teamID);
      if (res && res.code === StatusCode.SUCCESS) {
        const listMember = [...res?.data?.member];
        const leader = listMember.shift();
        const isLeader = leader?.user?.userId === profile.userId;
        const hasInvite = listMember.find(
          (mem) => mem?.user?.userId === profile?.userId,
        );
        console.log('LOG ->  hasInvite', hasInvite);
        setData({
          ...data,
          teamId: res?.data?.teamId,
          avatar: res?.data?.avatar,
          background: res?.data?.background,
          place: res?.data?.place,
          description: res?.data?.description,
          level: res?.data?.level,
          member: res?.data?.member,
          name: res?.data?.name,
          isLeader,
          onReady: true,
          errorYup: null,
          isRefreshing: false,
          hasInvite,
          leaderId: res?.data?.leaderId,
        });
      }
    } catch (error) {
      console.log(
        'LOG -> file: team-detail.screen.js -> line 77 -> getData -> error',
        error,
      );
    }
  };

  const showModalInfoMember = (data, index) => () => {
    setModalInfoMember({
      visible: true,
      data,
      index,
    });
  };
  const hideModalInfoMember = () => {
    setModalInfoMember({
      visible: false,
      data: null,
      index: 0,
    });
  };
  const toogleEditable = () => {
    setEditable(!editable);
  };

  const toggleModalDelete = () => {
    const hasGame = listGameUser?.find(
      (game) => game?.teamIdHost === data?.teamId,
    );
    if (hasGame) {
      AlertHelper.alert(
        'warn',
        'Xóa đội bóng',
        'Bạn không thể xóa đội bóng khi đội bóng đang tham gia trận đấu',
        {},
        5000,
      );
    } else if (data?.member?.length > 1) {
      AlertHelper.alert(
        'warn',
        'Xóa đội bóng',
        'Bạn cần phải xóa thành tất cả thành viên ra khỏi đội bóng trước khi xóa đội',
        {},
        5000,
      );
    } else {
      setVisibleModalDele(!visibleModalDele);
    }
  };

  const showModalAddMember = () => {
    if (editable) {
      ToastHelper.showToast(
        'Hãy hoàn tất chỉnh sửa trước khi thêm thành viên',
        colors.orange,
      );
    } else {
      if (modalAddMemberRef.current) {
        modalAddMemberRef.current.showDialog();
      }
    }
  };

  const addMember = (dataMember) => {
    if (dataMember) {
      const newListMember = [...data.member];
      newListMember.push(dataMember);
      setData({
        ...data,
        member: newListMember,
      });
    }
  };

  const acceptInvite = async () => {
    try {
      showLoading();
      const res = await acceptInviteTeamService({
        userId: profile?.userId,
        teamId: data?.teamId,
        nameUser: profile?.displayName,
        nameTeam: data?.name,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        ToastHelper.showToast(
          `Bạn đã là thành viên của đội bóng ${data?.name}`,
          colors.greenDark,
        );
        setVisibleConfirm(false);
        getData();
      } else {
        ToastHelper.showToast('Lỗi', colors.red);
      }
      hideLoading();
    } catch (error) {
      console.log(
        'LOG -> file: team-detail.screen.js -> line 109 -> acceptInvite -> error',
        error,
      );
      ToastHelper.showToast('Lỗi', colors.red);
      hideLoading();
    }
  };
  const cancelInvite = async () => {
    try {
      showLoading();
      const res = await cancelInviteTeamService({
        userId: profile?.userId,
        teamId: data?.teamId,
        nameUser: profile?.displayName,
        nameTeam: data?.name,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        ToastHelper.showToast(
          `Bạn đã từ chối lời mời gia nhập của đội bóng ${data?.name} thành công`,
        );
        rootNavigator.back();
      } else {
        ToastHelper.showToast('Lỗi', colors.red);
      }
      hideLoading();
    } catch (error) {
      console.log('LOG -> cancelInvite -> error', error);
      ToastHelper.showToast('Lỗi', colors.red);
      hideLoading();
    }
  };
  const showLevel = () => {
    showDialog({
      type: 'level',
      titleModal: 'Trình độ đội bóng',
      listItems: ListLevel,
    });
  };
  const showPlace = () => {
    showDialog({
      type: 'place',
      titleModal: 'Khu vực thi đấu',
      listItems: ListProvince,
    });
  };
  const showDialog = ({type, titleModal, listItems}) => {
    if (modalizeRef.current) {
      modalizeRef.current.setDataAndOpenModal({
        type,
        title: titleModal,
        listItems: listItems,
      });
    }
  };
  const onSelectItem = (itemData) => {
    let keyState = null;
    switch (itemData.type) {
      case 'level':
        keyState = 'level';
        break;
      case 'place':
        keyState = 'place';
        break;
      default:
        break;
    }
    if (keyState) {
      setData({
        ...data,
        [keyState]: itemData?.item?.name,
      });
    }
  };
  const onPressPickImage = (type) => async () => {
    try {
      showLoading();
      const image = await ImagePicker.openPicker({
        multiple: false,
      });
      console.log('image: ', image);
      if (type === 'avatar') {
        const resUpdateAvatar = await updateAvatarTeamService({
          avatar: image,
          teamId: data?.teamId,
        });
        console.log('updateAvatarTeamService --> res', resUpdateAvatar);
        if (resUpdateAvatar && resUpdateAvatar.code === StatusCode.SUCCESS) {
          setData({
            ...data,
            avatar: {...image, imageType: 'local'},
          });
          getListTeam();
        } else {
          alert('thất bại');
        }
      } else {
        const resUpdateBackground = await updateBackgroundTeamService({
          background: image,
          teamId: data?.teamId,
        });
        if (
          resUpdateBackground &&
          resUpdateBackground.code === StatusCode.SUCCESS
        ) {
          setData({
            ...data,
            background: {...image, imageType: 'local'},
          });
          getListTeam();
        } else {
          alert('thất bại');
        }
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log('updateImageTeam -->err: ', error);
    }
  };
  const changeFormData = (key, value) => {
    setData({...data, [key]: value});
    clearError();
  };
  const cancelUpdate = () => {
    setEditable(false);
    setData({
      ...data,
      name: data?.name,
      level: data?.level,
      place: data?.place,
      description: data?.description,
    });
  };
  const clearError = () => {
    if (data.errorYup) {
      setData({...data, errorYup: null});
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên đội bóng không được để trống'),
  });
  const generatorMessageError = async (data) => {
    try {
      await validationSchema.validate(data, {abortEarly: false});
    } catch (error) {
      return error.inner.reduce((obj, item) => {
        obj[item.path] = item.message;
        return obj;
      }, {});
    }
  };
  const getValue = () => {
    return {
      name: data.name,
    };
  };
  const updateInfo = async () => {
    try {
      clearError();
      const value = getValue();
      const errorValidate = await generatorMessageError(value);
      if (errorValidate) {
        setData({...data, errorYup: errorValidate});
      } else {
        showLoading();
        const res = await updateInfoTeamService(data);
        console.log('updateInfoTeamService -->res:', res);
        if (res && res.code === StatusCode.SUCCESS) {
          getListTeam();
          rootNavigator.back();
          ToastHelper.showToast(
            'Cập nhật thông tin đội bóng thành công',
            colors.greenDark,
          );
        } else {
          alert('Cập nhât đội bống thất bại');
        }
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log('updateInfoTeamService -->error:', error);
    }
  };

  const deleteTeam = async () => {
    try {
      toggleModalDelete();
      showLoading();
      const res = await deleteTeamService(data?.teamId);
      console.log('deleteTeamService -->res: ', res);
      if (res && res.code === StatusCode.SUCCESS) {
        rootNavigator.back();
        ToastHelper.showToast('Xóa đội bóng thành công', colors.yellowDark);
      } else {
        alert('Xóa đội thất bại');
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log('deleteTeam -->err: ', error);
    }
  };
  const deleteMember = (userId, name) => async () => {
    try {
      const res = await deleteMemberService({
        userId,
        teamId: data.teamId,
        nameTeam: data.name,
        nameUser: profile?.displayName,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        const newListMembers = data?.member.filter(
          (el) => el?.user?.userId !== userId,
        );
        setData({
          ...data,
          member: newListMembers,
        });
        hideModalInfoMember();
        ToastHelper.showToast(
          `Bạn đã loại ${name} ra khỏi đội thành công`,
          colors.greenDark,
        );
      }
    } catch (error) {
      console.log(
        'LOG -> file: team-detail.screen.js -> line 370 -> deleteMember -> error',
        error,
      );
    }
  };

  const outTeam = async () => {
    try {
      showLoading();
      const res = await outTeamTeamService({
        userId: profile?.userId,
        teamId: teamID,
        nameUser: profile?.displayName,
        nameTeam: data?.name,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        rootNavigator.back();
        ToastHelper.showToast(
          'Bạn đã rời khỏi đội bóng thành công',
          colors.grayDark,
        );
      } else {
        ToastHelper.showToast('Lỗi', colors.red);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      ToastHelper.showToast('Lỗi', colors.red);
      console.log(
        'LOG -> file: team-detail.screen.js -> line 441 -> outTeam -> error',
        error,
      );
    }
  };

  const acceptTeamInviteGame = async () => {
    try {
      showLoading();
      const res = await acceptInviteGameService({
        gameId: dataGame?.gameId,
        teamId: data?.teamId,
        userNotifyId: dataGame?.teamIdHost,
        nameHost: dataGame?.teamHost?.teamNameHost,
        nameInvite: data?.name,
        dateGame: formatToDate(dataGame?.date),
      });
      if (res && res.code === StatusCode.SUCCESS) {
        rootNavigator.back();
        ToastHelper.showToast('Xác nhận đối thủ thành công', colors.greenDark);
        const newListInvite = dataGame?.teamInvite?.filter(
          (team) => team?.teamIdTemp !== data?.teamId,
        );
        if (newListInvite?.length) {
          newListInvite.forEach(
            async (element) =>
              await refuseInviteGameService({
                gameId: dataGame?.gameId,
                teamId: element?.teamIdTemp,
                userNotifyId: element?.leaderIdTemp,
                nameHost: dataGame?.teamHost?.teamNameHost,
                nameInvite: element?.teamNameTemp,
                dateGame: formatToDate(dataGame?.date),
              }),
          );
        }
      } else {
        ToastHelper.showToast('Lỗi', colors.red);
      }
      hideLoading();
    } catch (error) {
      console.log(
        'LOG -> file: team-detail.screen.js -> line 395 -> acceptTeamInviteGame -> error',
        error,
      );
      ToastHelper.showToast('Lỗi', colors.red);
      hideLoading();
    }
  };

  const refuseTeamInviteGame = async () => {
    try {
      showLoading();
      const res = await refuseInviteGameService({
        gameId: dataGame?.gameId,
        teamId: data?.teamId,
        userNotifyId: data?.leaderId,
        nameHost: dataGame?.teamHost?.teamNameHost,
        nameInvite: data?.name,
        dateGame: formatToDate(dataGame?.date),
      });
      console.log('LOG ->  refuseTeamInviteGame -> res', res);
      if (res && res.code === StatusCode.SUCCESS) {
        rootNavigator.back();
        ToastHelper.showToast('Từ chối đối thủ thành công', colors.greenDark);
      } else {
        ToastHelper.showToast('Lỗi', colors.red);
      }
      hideLoading();
    } catch (error) {
      console.log(
        'LOG -> file: team-detail.screen.js -> line 395 -> acceptTeamInviteGame -> error',
        error,
      );
      ToastHelper.showToast('Lỗi', colors.red);
      hideLoading();
    }
  };

  const renderButtonOutTeam = () => {
    if (!data.isLeader && data.hasInvite && !flag) {
      return (
        <View style={styles.section}>
          <PrimaryButton
            title="Rời đội bóng"
            style={{backgroundColor: colors.red}}
            onPress={toggleModalOut}
          />
        </View>
      );
    }
  };

  const renderButtonConfirm = () => {
    if (flag === 1 && visibleConfirm) {
      return (
        <>
          <Text type={headline5} style={styles.txtConfirm}>
            Phản hồi lời mời
          </Text>
          <View style={styles.warpperButtonEdit}>
            <PrimaryButton
              title="Từ chối"
              style={[styles.flex49, {backgroundColor: colors.grayOpacity}]}
              onPress={cancelInvite}
            />
            <PrimaryButton
              title="Xác nhận"
              style={[styles.flex49, {backgroundColor: colors.greenDark}]}
              onPress={acceptInvite}
            />
          </View>
        </>
      );
    }
    if (flag === 2) {
      return (
        <>
          <Text type={headline5} style={styles.txtConfirm}>
            {`Xác nhận đội bóng ${data.name} trở thành đối thủ cho trận đấu của bạn`}
          </Text>
          <View style={styles.warpperButtonEdit}>
            <PrimaryButton
              title="Từ chối"
              style={[styles.flex49, {backgroundColor: colors.grayOpacity}]}
              onPress={refuseTeamInviteGame}
            />
            <PrimaryButton
              title="Xác nhận"
              style={[styles.flex49, {backgroundColor: colors.greenDark}]}
              onPress={acceptTeamInviteGame}
            />
          </View>
        </>
      );
    }
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItemMember = ({item, index}) => {
    return (
      <ItemTeamMember
        image={item?.user?.avatar || item?.avatar}
        size={scale(80)}
        name={item?.user?.displayName || item?.displayName}
        status={Number(item?.accept)}
        position={
          !index ? 'Đội trưởng' : item?.user?.position || item?.position
        }
        onPressImage={showModalInfoMember(item, index)}
        me={item?.user?.userId === profile?.userId}
      />
    );
  };
  if (!data.onReady) {
    return (
      <View style={styles.flex1}>
        <ImagePlaceholder size={scale(50)} />
        <View style={styles.contentPlaceholder}>
          <ContentPlaceholder />
        </View>
      </View>
    );
  }
  return (
    <Host>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={data.isRefreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.container}>
        <BackIcon />
        <BackgroudImage
          height={scale(220)}
          image={data?.background}
          onPress={data.isLeader ? onPressPickImage('background') : false}
          children={
            <>
              <Avatar
                image={data?.avatar}
                size={90}
                onPress={data.isLeader ? onPressPickImage('avatar') : false}
              />
              <Text type={headline4} style={styles.txtName}>
                {data?.name}
              </Text>
            </>
          }
        />
        <View style={styles.body}>
          <View style={styles.section}>
            {renderButtonConfirm()}
            <View style={styles.rowBetween}>
              <Text type={headline5}>Thành viên</Text>
              {data.isLeader && (
                <SecondaryButton
                  title="Thêm thành viên"
                  style={{width: scale(160)}}
                  onPress={showModalAddMember}
                />
              )}
            </View>
            <FlatList
              data={data?.member}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.listMember}
              keyExtractor={keyExtractor}
              renderItem={renderItemMember}
            />
          </View>
          <View style={styles.section}>
            <RowProflie
              label="Tên đội bóng"
              value={data?.name}
              iconType={IconType.MaterialCommunityIcons}
              iconName="account-group"
              editable={editable}
              onChangeText={(text) => changeFormData('name', text)}
              textError={data.errorYup?.name}
            />
            <RowProflie
              label="Đội trưởng"
              value={data?.member[0]?.user?.displayName}
              iconType={IconType.MaterialCommunityIcons}
              iconName="book-account"
              editable={false}
            />
            <RowProflie
              label="Trình độ đội bóng"
              value={data?.level ? data?.level : 'Chọn trình độ của đội bóng'}
              iconType={IconType.MaterialCommunityIcons}
              iconName="chess-queen"
              onPress={showLevel}
              editable={editable}
            />
            <RowProflie
              label="Khu vực thi đấu"
              value={data?.place ? data?.place : 'Chọn khu vực'}
              iconType={IconType.MaterialIcons}
              iconName="location-on"
              onPress={showPlace}
              editable={editable}
            />
          </View>
          <View style={[styles.section, {minHeight: scale(80)}]}>
            <TextInput
              style={styles.txtAddress}
              multiline={true}
              value={data?.description}
              placeholder="Nhập lời giới thiệu đội bóng"
              editable={editable}
              onChangeText={(text) => changeFormData('description', text)}
            />
          </View>
          {data.isLeader && (
            <View style={styles.section}>
              {editable ? (
                <View style={styles.warpperButtonEdit}>
                  <PrimaryButton
                    style={[styles.flex49, {backgroundColor: colors.grayDark}]}
                    title="hủy"
                    onPress={cancelUpdate}
                  />
                  <PrimaryButton
                    onPress={updateInfo}
                    style={[styles.flex49, {backgroundColor: colors.green}]}
                    title="lưu"
                  />
                </View>
              ) : (
                <View style={styles.warpperButtonEdit}>
                  <PrimaryButton
                    style={[styles.flex49, {backgroundColor: colors.red}]}
                    title="Xóa đội"
                    onPress={toggleModalDelete}
                  />
                  <PrimaryButton
                    onPress={toogleEditable}
                    style={[styles.flex49, {backgroundColor: colors.greenDark}]}
                    title="chỉnh sửa"
                  />
                </View>
              )}
            </View>
          )}
          {renderButtonOutTeam()}
        </View>
        <ModalPicker ref={modalizeRef} onSelectItem={onSelectItem} />
        <ConfirmDialog
          visible={visibleModalDele}
          imageSVG={imageDelete}
          sizeImage={scale(150)}
          confirmText="Xác nhận"
          cancelText="Hủy"
          colorsCancel={colors.grayDark}
          colorsConfirm={colors.red}
          title="Bạn có chắc muốn xóa đội bóng?"
          subTitle={data?.name}
          onCancelClick={toggleModalDelete}
          onConfirmClick={deleteTeam}
          colorTitle={colors.red}
        />
        <ConfirmDialog
          visible={visibleModalOut}
          imageSVG={imageOut}
          sizeImage={scale(150)}
          confirmText="Xác nhận"
          cancelText="Hủy"
          colorsCancel={colors.grayDark}
          colorsConfirm={colors.red}
          title="Rời đội bóng"
          subTitle="Bạn có chắc muốn rời khỏi đội bóng?"
          onCancelClick={toggleModalOut}
          onConfirmClick={outTeam}
          colorTitle={colors.red}
        />
        <ModalAddMember
          ref={modalAddMemberRef}
          onPresSendInvitation={addMember}
          listMember={data?.member}
          teamId={data?.teamId}
          nameTeam={data?.name}
          nameLeader={profile?.displayName}
        />
        <ModalShowInfoMember
          dismiss={hideModalInfoMember}
          visible={modalInfoMember.visible}
          data={modalInfoMember.data}
          index={modalInfoMember.index}
          isLeader={data.isLeader}
          deleteMember={deleteMember(
            modalInfoMember.data?.user?.userId,
            modalInfoMember.data?.user?.displayName,
          )}
        />
      </ScrollView>
    </Host>
  );
};
const styles = StyleSheet.create({
  flex1: {flex: 1, backgroundColor: colors.white},
  contentPlaceholder: {width: scale(344), flex: 1, marginTop: scale(20)},
  listMember: {marginTop: spacing.medium},
  txtName: {
    color: colors.white,
    marginTop: spacing.small,
  },
  container: {
    flex: 1,
  },
  flex49: {flex: 0.49},
  rowBetween: {
    ...Styles.rowBetween,
  },
  body: {
    flex: 1,
    backgroundColor: colors.viewBackground,
  },
  section: {
    marginTop: spacing.tiny,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
    backgroundColor: colors.white,
  },
  warpperButtonEdit: {
    ...Styles.rowBetween,
    marginBottom: scale(10),
  },
  txtConfirm: {
    textAlign: 'center',
    marginBottom: scale(10),
    color: colors.orange,
  },
});

const mapDispatchToProps = {showLoading, hideLoading};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
    listGameUser: state.authState.listGame,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailScreen);
