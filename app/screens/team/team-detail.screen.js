import React, {useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Host} from 'react-native-portalize';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {StatusCode} from '../../api/status-code';
import {
  addMemberTeamService,
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
import {getListTeam} from '../../redux/actions/teams.action';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const TeamDetailScreen = ({route, showLoading, hideLoading, profile}) => {
  const {teamDetail} = route.params;
  const listMember = [...teamDetail?.member];
  const leader = listMember.shift();
  const isLeader = leader?.user.userId === profile.userId;
  console.log('isLeader: ', isLeader);
  console.log('profile: ', profile);
  console.log('teamDetail: ', teamDetail);
  const modalizeRef = useRef();
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
  const [visibleModal, setVisibleModal] = useState(false);
  const [member, setMember] = useState({
    phone: '',
    status: 0,
    phoneError: null,
    onReady: true,
  });
  const [modalInfoMember, setModalInfoMember] = useState({
    visible: false,
    data: null,
  });

  const showModalInfoMember = data => () => {
    setModalInfoMember({
      visible: true,
      data,
    });
  };
  const hideModalInfoMember = () => {
    setModalInfoMember({
      visible: false,
      data: null,
    });
  };
  const toogleEditable = () => {
    setEditable(!editable);
  };

  const toggleModalDelete = () => {
    setVisibleModalDele(!visibleModalDele);
  };

  const toggleModalAddMember = () => {
    setVisibleModal(!visibleModal);
    setMember({...member, status: 0});
  };
  const searchPhone = async () => {
    try {
      const err = validatePhoneNumber(member.phone);
      if (err) {
        setMember({
          ...member,
          phoneError: err,
        });
      } else {
        const checkPhone = data?.member.find(
          item => item?.user?.phone === member.phone,
        );
        if (!checkPhone) {
          setMember({
            ...member,
            phoneError: null,
            onReady: false,
          });
          const res = await searchPhoneUserService(member.phone);
          if (res && res.code === StatusCode.SUCCESS) {
            setMember({
              ...res.data,
              status: 1,
              onReady: true,
            });
          } else {
            setMember({
              ...member,
              status: 2,
              onReady: true,
            });
          }
        } else {
          setMember({
            ...member,
            phoneError: 'Số điện thoại đã có trong team',
            onReady: true,
          });
        }
      }
    } catch (error) {
      console.log('searchPhoneUserService -->err: ', error);
    }
  };

  const addMember = async () => {
    try {
      const res = await addMemberTeamService({
        userId: member.userId,
        teamId: data.teamId,
      });
      console.log('addMemberTeamService -->res: ', res);
      if (res && res.code === StatusCode.SUCCESS) {
        console.log('member: ', member);
        const newListMemBer = data.member.concat(member);
        setData({
          ...data,
          member: newListMemBer,
        });
        setMember({...member, status: 0});
        getListTeam();
        ToastHelper.showToast('Gữi lời mời thành công');
      }
    } catch (error) {}
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

  const keyExtractor = (item, index) => index.toString();
  const renderItemMember = ({item, index}) => {
    return (
      <ItemTeamMember
        image={item?.user?.avatar || item?.avatar}
        size={scale(80)}
        name={item?.user?.displayName || item?.displayName}
        status={item?.accept}
        position={
          !index ? 'Đội trưởng' : item?.user?.position || item?.position
        }
        onPressImage={showModalInfoMember(item)}
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
            <View style={styles.rowBetween}>
              <Text type={headline5}>Thành viên</Text>
              {isLeader && (
                <SecondaryButton
                  title="Thêm thành viên"
                  style={{width: scale(160)}}
                  onPress={toggleModalAddMember}
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
              label="Trình độ"
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
          sizeImage={scale(200)}
          confirmText="Xác nhận"
          cancelText="Hủy"
          colorsCancel={colors.grayDark}
          colorsConfirm={colors.red}
          title="Xóa đội bóng"
          subTitle={data?.name}
          onCancelClick={toggleModalDelete}
          onConfirmClick={deleteTeam}
        />
        <ModalAddMember
          dismiss={toggleModalAddMember}
          visible={visibleModal}
          status={member.status}
          onChangeText={text => setMember({...member, phone: text})}
          member={member}
          onPressSearchPhone={searchPhone}
          onPresSendInvitation={addMember}
          onPressInvitationToJoin={toggleModalAddMember}
          onPressChangePhone={() =>
            setMember({...member, phoneError: null, status: 0})
          }
          phone={member.phone}
          phoneError={member.phoneError}
          onReady={member.onReady}
        />
        <ModalShowInfoMember
          dismiss={hideModalInfoMember}
          visible={modalInfoMember.visible}
          data={modalInfoMember.data}
          isLeader={isLeader}
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
