import React, {useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Host} from 'react-native-portalize';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {StatusCode} from '../../api/status-code';
import {
  acceptInviteTeamService,
  addMemberTeamService,
  deleteMemberService,
  deleteTeamService,
  updateAvatarTeamService,
  updateBackgroundTeamService,
  updateInfoTeamService,
} from '../../api/team.api';
import {searchPhoneUserService} from '../../api/user.api';
import imageDelete from '../../assets/svg/img_delete.svg';
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
import ItemTeamMember from '../../components/team/ItemTeamMember';
import ModalAddMember from '../../components/team/ModalAddMember';
import ModalShowInfoMember from '../../components/team/ModalShowInfoMember';
import {ListLevel, ListProvince} from '../../helpers/data-local.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import {validatePhoneNumber} from '../../helpers/validate.helper';
import rootNavigator from '../../navigations/root.navigator';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import {getListTeam} from '../../redux/actions/teams.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const TeamDetailScreen = ({route, showLoading, hideLoading, profile}) => {
  const {teamDetail} = route.params;
  const flag = route?.params?.flag;
  const listMember = [...teamDetail?.member];
  const leader = listMember.shift();
  const isLeader = leader?.user?.userId === profile.userId;

  const modalizeRef = useRef();
  const modalAddMemberRef = useRef();
  const [data, setData] = useState({
    teamId: teamDetail.teamId,
    avatar: teamDetail.avatar,
    background: teamDetail.background,
    place: teamDetail.place,
    description: teamDetail.description,
    level: teamDetail.level,
    member: teamDetail.member,
    name: teamDetail.name,
    errorYup: null,
  });
  const [editable, setEditable] = useState(false);
  const [visibleModalDele, setVisibleModalDele] = useState(false);
  const [modalInfoMember, setModalInfoMember] = useState({
    visible: false,
    data: null,
    index: 0,
  });

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
    setVisibleModalDele(!visibleModalDele);
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

  const addMember = dataMember => {
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
        teamId: teamDetail?.teamId,
        nameUser: profile?.displayName,
        nameTeam: teamDetail?.name,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        ToastHelper.showToast(
          `Bạn đã là thành viên của đội bóng ${teamDetail?.name}`,
        );
        rootNavigator.back();
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
  const onSelectItem = itemData => {
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
  const onPressPickImage = type => async () => {
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
      name: teamDetail?.name,
      level: teamDetail?.level,
      place: teamDetail?.place,
      description: teamDetail?.description,
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
  const generatorMessageError = async data => {
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
      if (!!errorValidate) {
        setData({...data, errorYup: errorValidate});
      } else {
        showLoading();
        const res = await updateInfoTeamService(data);
        console.log('updateInfoTeamService -->res:', res);
        if (res && res.code === StatusCode.SUCCESS) {
          getListTeam();
          rootNavigator.back();
          ToastHelper.showToast('Cập nhật thông tin đội bóng thành công');
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
        ToastHelper.showToast('Xóa đội bóng thành công');
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
        teamId: teamDetail.teamId,
        nameTeam: teamDetail.name,
      });
      if (res && res.code === StatusCode.SUCCESS) {
        const newListMembers = data?.member.filter(
          el => el?.user?.userId !== userId,
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

  const renderButtonConfirm = () => {
    if (flag === 1) {
      return (
        <>
          <Text type={headline5} style={styles.txtConfirm}>
            Phản hồi lời mời
          </Text>
          <View style={styles.warpperButtonEdit}>
            <PrimaryButton
              title="Từ chối"
              style={[styles.flex49, {backgroundColor: colors.grayOpacity}]}
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
  return (
    <Host>
      <ScrollView style={styles.container}>
        <BackIcon />
        <BackgroudImage
          height={scale(220)}
          image={data?.background}
          onPress={isLeader ? onPressPickImage('background') : false}
          children={
            <>
              <Avatar
                image={data?.avatar}
                size={90}
                onPress={isLeader ? onPressPickImage('avatar') : false}
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
              {isLeader && (
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
              onChangeText={text => changeFormData('name', text)}
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
              iconName="location-pin"
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
              onChangeText={text => changeFormData('description', text)}
            />
          </View>
          {isLeader && (
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
        <ModalAddMember
          ref={modalAddMemberRef}
          onPresSendInvitation={addMember}
          listMember={data?.member}
          teamId={data?.teamId}
          nameTeam={data?.name}
        />
        <ModalShowInfoMember
          dismiss={hideModalInfoMember}
          visible={modalInfoMember.visible}
          data={modalInfoMember.data}
          index={modalInfoMember.index}
          isLeader={isLeader}
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
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamDetailScreen);
