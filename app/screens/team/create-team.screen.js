import React, {useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Host} from 'react-native-portalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {StatusCode} from '../../api/status-code';
import {createTeamService} from '../../api/team.api';
import {searchPhoneUserService} from '../../api/user.api';
import Avatar from '../../components/common/Avatar';
import BackgroudImage from '../../components/common/BackgroudImage';
import BackIcon from '../../components/common/BackIcon';
import ConfirmDialog from '../../components/common/dialog/ConfirmDialog';
import {IconType} from '../../components/common/IconMaterialOrSvg';
import ModalPicker from '../../components/common/ModalPicker';
import PrimaryButton from '../../components/common/PrimaryButton';
import TitleTextInputField from '../../components/common/TitleTextInputField';
import ItemTeamMember from '../../components/team/ItemTeamMember';
import ModalAddMember from '../../components/team/ModalAddMember';
import {ListLevel, ListProvince} from '../../helpers/data-local.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import {validatePhoneNumber} from '../../helpers/validate.helper';
import rootNavigation from '../../navigations/root.navigator';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import {getListTeam} from '../../redux/actions/teams.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';

const CreateTeamScreen = ({profile, showLoading, hideLoading, getListTeam}) => {
  const modalizeRef = useRef();
  const [visibleModal, setVisibleModal] = useState(false);
  const [listMember, setListMember] = useState([profile]);
  const [member, setMember] = useState({
    phone: '',
    status: 0,
    phoneError: null,
    onReady: true,
  });
  const [dataTeam, setDataTeam] = useState({
    background: null,
    avatar: null,
    name: '',
    description: '',
    place: '',
    member: '',
    level: '',
    errorYup: null,
  });
  const [modalDeleteMember, setModalDeleteMember] = useState({
    visible: false,
    member: {},
  });
  const showModalDeleteMember = member => () => {
    clearError();
    setModalDeleteMember({
      visible: true,
      member: member,
    });
  };
  const hideModalDeleteMember = () => {
    setModalDeleteMember({
      visible: false,
      member: {},
    });
  };
  const toggleModal = () => {
    clearError();
    setVisibleModal(!visibleModal);
    setMember({...member, status: 0});
  };
  const showProvince = () => {
    showDialog({
      type: 'place',
      titleModal: 'Chọn khu vực',
      listItems: ListProvince,
    });
  };

  const showLevel = () => {
    showDialog({
      type: 'level',
      titleModal: 'Chọn trình độ đội bóng',
      listItems: ListLevel,
    });
  };

  const showDialog = ({type, titleModal, listItems}) => {
    clearError();
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
      case 'place':
        keyState = 'place';
        break;
      case 'level':
        keyState = 'level';
        break;
      default:
        break;
    }
    if (keyState) {
      setDataTeam({
        ...dataTeam,
        [keyState]: itemData?.item?.name,
      });
    }
  };
  const onPressPickImage = type => async () => {
    clearError();
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
      });
      const imageState = type === 'background' ? 'background' : 'avatar';
      setDataTeam({...dataTeam, [imageState]: {...image, imageType: 'local'}});
    } catch (error) {}
  };

  const changeFormData = (key, value) => {
    setDataTeam({...dataTeam, [key]: value});
    clearError();
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
        const checkPhone = listMember.find(item => item.phone === member.phone);
        if (!checkPhone) {
          setMember({
            ...member,
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
          });
        }
      }
    } catch (error) {}
  };

  const addMember = () => {
    const newListmember = listMember.concat(member);
    ToastHelper.showToast('Gữi lời mời thành công!');
    setListMember(newListmember);
    setMember({...member, status: 0});
    let strMember = '';
    strMember += member.userId + ',';
    setDataTeam({...dataTeam, member: strMember});
  };

  const clearError = () => {
    if (dataTeam.errorYup) {
      setDataTeam({...dataTeam, errorYup: null});
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Họ và tên không được để trống'),
    place: Yup.string().required('Vui lòng chọn khu vực thi đấu'),
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
      name: dataTeam.name,
      place: dataTeam.place,
    };
  };
  const createTeam = async () => {
    try {
      clearError();
      const value = getValue();
      const errorValidate = await generatorMessageError(value);
      if (!!errorValidate) {
        setDataTeam({...dataTeam, errorYup: errorValidate});
      } else {
        showLoading();
        let str = '';
        listMember.slice(1).map(item => {
          return (str += item.userId + ',');
        });
        const members = str.slice(0, str.lastIndexOf(','));
        const res = await createTeamService({
          avatar: dataTeam.avatar,
          background: dataTeam.background,
          members: members,
          data: dataTeam,
        });
        console.log('createTeamService --> res: ', res);
        if (res && res.code === StatusCode.SUCCESS) {
          getListTeam();
          rootNavigation.back();
          ToastHelper.showToast('Tạo đội bóng thành công');
        } else {
          alert('Tạo đội thất bại');
        }
      }
      hideLoading();
    } catch (error) {
      console.log('createTeamService -->error: ', error);
      hideLoading();
    }
  };
  const removeMember = id => () => {
    const newList = listMember.filter(item => item.userId !== id);
    setListMember(newList);
    hideModalDeleteMember();
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item, index}) => {
    return (
      <ItemTeamMember
        image={item?.avatar}
        size={70}
        name={item?.displayName}
        onPress={index ? showModalDeleteMember(item) : false}
        status={index ? false : true}
        position={!index ? 'Đội trưởng' : null}
        disabledImage={true}
      />
    );
  };
  const renderCreateMember = () => {
    return (
      <View style={styles.warpperCreateMember}>
        <TouchableOpacity onPress={toggleModal} style={styles.btnCreate}>
          <Icon name="plus" size={40} color={colors.white} />
        </TouchableOpacity>
        <FlatList
          data={listMember}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.listMember}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    );
  };
  return (
    <Host>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <BackIcon />
        <BackgroudImage
          height={scale(220)}
          image={dataTeam.background}
          onPress={onPressPickImage('background')}
          disabledImage={true}
        />
        <View style={styles.body}>
          <View style={styles.warpperAvatar}>
            <Avatar
              style={{marginTop: scale(-65)}}
              image={dataTeam.avatar}
              size={130}
              iconEdit={true}
              disabledImage={true}
              onPress={onPressPickImage('avatar')}
              borderWidth={2}
              borderColor={colors.black}
            />
          </View>
          <TitleTextInputField
            style={styles.inputField}
            lable="Tên đội bóng của bạn (*)"
            typeLeft={IconType.MaterialCommunityIcons}
            iconNameLeft="account-group"
            onChangeText={value => changeFormData('name', value)}
            otherTextInputProps={{
              placeholder: 'Nhập tên đội bóng của bạn',
            }}
            sizeIcon={scale(22)}
            textError={dataTeam.errorYup?.name}
          />
          <TitleTextInputField
            style={styles.inputField}
            lable="Khu vực thi đấu của bạn (*)"
            typeLeft={IconType.MaterialIcons}
            iconNameLeft="location-pin"
            otherTextInputProps={{
              placeholder: 'Chọn khu vưc thi đấu',
            }}
            value={dataTeam.place}
            typeRigth={IconType.MaterialIcons}
            iconNameRigth="keyboard-arrow-down"
            sizeIcon={scale(22)}
            onPress={showProvince}
            textError={dataTeam.errorYup?.place}
          />
          <TitleTextInputField
            style={styles.inputField}
            lable="Trình độ"
            typeLeft={IconType.MaterialCommunityIcons}
            iconNameLeft="chess-queen"
            otherTextInputProps={{
              placeholder: 'Chọn trình độ đội bóng',
            }}
            value={dataTeam.level}
            typeRigth={IconType.MaterialIcons}
            iconNameRigth="keyboard-arrow-down"
            sizeIcon={scale(22)}
            onPress={showLevel}
          />
          <TitleTextInputField
            style={styles.inputField}
            lable="Mô tả đội bóng"
            sizeIcon={scale(22)}
            onChangeText={text => changeFormData('description', text)}
            otherTextInputProps={{
              multiline: true,
              placeholder: 'Mô tả',
            }}
          />
          <TitleTextInputField
            style={styles.inputField}
            lable="Thêm thành viên"
            sizeIcon={scale(22)}
            customelement={renderCreateMember()}
          />
          <PrimaryButton
            onPress={createTeam}
            style={styles.button}
            title="Tạo đội"
          />
        </View>
        <ModalPicker ref={modalizeRef} onSelectItem={onSelectItem} />
        <ModalAddMember
          dismiss={toggleModal}
          visible={visibleModal}
          status={member.status}
          onChangeText={text => {
            setMember({...member, phone: text, phoneError: null});
          }}
          member={member}
          onPressSearchPhone={searchPhone}
          onPresSendInvitation={addMember}
          onPressInvitationToJoin={toggleModal}
          onPressChangePhone={() =>
            setMember({...member, phoneError: null, status: 0})
          }
          phone={member.phone}
          phoneError={member.phoneError}
          onReady={member?.onReady}
        />
        <ConfirmDialog
          visible={modalDeleteMember.visible}
          confirmText="Xác nhận"
          cancelText="Hủy"
          colorsCancel={colors.grayDark}
          colorsConfirm={colors.red}
          title="Bạn muốn xóa:"
          subTitle={modalDeleteMember.member?.displayName}
          onCancelClick={hideModalDeleteMember}
          onConfirmClick={removeMember(modalDeleteMember.member?.userId)}
        />
      </ScrollView>
    </Host>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Styles.flex1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingBottom: spacing.extraLarge,
  },
  warpperAvatar: {
    ...Styles.columnCenter,
    width: '100%',
  },
  body: {
    ...Styles.flex1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.medium,
  },
  inputField: {
    marginTop: spacing.large,
  },
  warpperCreateMember: {
    ...Styles.rowAlignCenter,
    padding: spacing.small,
  },
  btnCreate: {
    ...Styles.borderRadiusCircle(40),
    backgroundColor: colors.grayOpacity,
    marginRight: spacing.medium,
  },
  listMember: {
    zIndex: 9,
  },
  button: {
    backgroundColor: colors.green,
    marginTop: spacing.extraLarge,
    paddingVertical: scale(25),
  },
});

const mapDispatchToProps = {showLoading, hideLoading, getListTeam};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTeamScreen);
