import React, {useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Host} from 'react-native-portalize';
import {connect} from 'react-redux';
import {StatusCode} from '../../api/status-code';
import {
  deleteTeamService,
  updateAvatarTeamService,
  updateBackgroundTeamService,
  updateInfoTeamService,
} from '../../api/team.api';
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
import {ListLevel, ListProvince} from '../../helpers/data-local.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import {getListTeam} from '../../redux/actions/auth.action';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import colors from '../../theme/colors';
import dimens from '../../theme/dimens';
import spacing from '../../theme/spacing';

const TeamDetailScreen = ({route, showLoading, hideLoading, getListTeam}) => {
  const {teamDetail} = route.params;
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
  });
  const [editable, setEditable] = useState(false);
  const [visibleModalDele, setVisibleModalDele] = useState(false);
  const toogleEditable = () => {
    setEditable(!editable);
  };

  const toggleModalDelete = () => {
    setVisibleModalDele(!visibleModalDele);
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
    console.log('itemData: ', itemData);
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
  const updateInfo = async () => {
    try {
      showLoading();
      const res = await updateInfoTeamService(data);
      console.log('updateInfoTeamService -->res:', res);
      if (res && res.code === StatusCode.SUCCESS) {
        getListTeam();
        rootNavigator.back();
      } else {
        alert('thất bại');
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
        getListTeam();
        rootNavigator.back();
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
        image={item?.user?.avatar}
        size={80}
        name={item?.user?.displayName}
        onPressImage={() => alert('item')}
        status={item?.accept}
        position={item?.user?.position}
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
          onPress={onPressPickImage('background')}
          children={
            <>
              <Avatar
                image={data?.avatar}
                size={90}
                iconEdit={true}
                disabledImage={true}
                onPress={onPressPickImage('avatar')}
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
              <SecondaryButton
                title="Thêm thành viên"
                style={{width: scale(160)}}
              />
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
      </ScrollView>
    </Host>
  );
};
const styles = StyleSheet.create({
  listMember: {flex: 1, marginTop: spacing.medium},
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

const mapDispatchToProps = {showLoading, hideLoading, getListTeam};

export default connect(
  null,
  mapDispatchToProps,
)(TeamDetailScreen);
