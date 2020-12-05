import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Host} from 'react-native-portalize';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {StatusCode} from '../../api/status-code';
import {updateInfoUserService} from '../../api/user.api';
import {body2, Text} from '../../components/common/Text';
import {ListLevel, ListPosition} from '../../helpers/data-local.helper';
import {formatDateTime} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import rootNavigator from '../../navigations/root.navigator';
import {updateInfoUser} from '../../redux/actions/auth.action';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import {IconType} from '../common/IconMaterialOrSvg';
import ModalPicker from '../common/ModalPicker';
import PrimaryButton from '../common/PrimaryButton';
import RowProflie from './RowProflie';

const TabProfile = ({profile, showLoading, hideLoading, updateInfoUser}) => {
  const modalizeRef = useRef();
  const [editable, setEditable] = useState(false);
  const toogleEditable = () => {
    setEditable(!editable);
  };
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [data, setData] = useState({
    displayName: profile?.displayName,
    phone: profile?.phone,
    birthday: profile?.birthday,
    level: profile?.level,
    position: profile?.position,
    errorYup: null,
  });

  const goback = () => {
    rootNavigator.back();
  };

  const showLevel = () => {
    showDialog({
      type: 'level',
      titleModal: 'Trình độ cầu thủ',
      listItems: ListLevel,
    });
  };
  const showPosition = () => {
    showDialog({
      type: 'position',
      titleModal: 'Vị trí cầu thủ',
      listItems: ListPosition,
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
      case 'position':
        keyState = 'position';
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

  const handleConfirm = date => {
    setData({
      ...data,
      birthday: formatDateTime(date),
    });
    toogleDatePicker();
  };
  const toogleDatePicker = () => {
    setVisibleDatePicker(!visibleDatePicker);
  };
  const clearError = () => {
    if (data.errorYup) {
      setData({...data, errorYup: null});
    }
  };
  const changeFormData = (key, value) => {
    setData({...data, [key]: value});
    clearError();
  };
  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required('Họ và tên không được để trống'),
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
      displayName: data.displayName,
    };
  };
  const updateUser = async () => {
    try {
      clearError();
      const value = getValue();
      const errorValidate = await generatorMessageError(value);
      if (!!errorValidate) {
        setData({...data, errorYup: errorValidate});
      } else {
        showLoading();
        const res = await updateInfoUserService({
          displayName: data.displayName,
          position: data.position,
          level: data.level,
          birthday: data.birthday,
          phone: data.phone,
        });
        if (!!res && res.code === StatusCode.SUCCESS) {
          setEditable(false);
          updateInfoUser(data);
          ToastHelper.showToast('Cập nhật thành công');
        } else {
          alert('update user thất bại');
        }
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log('updateUser -->err: ', error);
    }
  };
  return (
    <Host>
      <ScrollView style={styles.container}>
        <DateTimePickerModal
          isVisible={visibleDatePicker}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={toogleDatePicker}
        />
        <View style={styles.section}>
          <Text type={body2}>Thông tin chi tiết</Text>
          <View style={styles.warpperInfo}>
            <RowProflie
              label="Họ và tên"
              value={data.displayName}
              iconType={IconType.MaterialIcons}
              iconName="account-circle"
              editable={editable}
              onChangeText={value => changeFormData('displayName', value)}
              textError={data.errorYup?.displayName}
            />
            <RowProflie
              label="Số điện thoai"
              value={data.phone}
              iconType={IconType.MaterialCommunityIcons}
              iconName="cellphone-android"
              editable={false}
            />
            <RowProflie
              label="Mật khẩu"
              value="Đổi mật khẩu"
              iconType={IconType.MaterialCommunityIcons}
              iconName="key"
              editable={false}
              stylesTxt={styles.txtRowProfile}
              onPress={toogleDatePicker}
            />
            <RowProflie
              label="Ngày sinh"
              value={data.birthday ? data.birthday : 'Chọn ngày sinh'}
              iconType={IconType.MaterialCommunityIcons}
              iconName="calendar-month-outline"
              onPress={toogleDatePicker}
              editable={editable}
            />
            <RowProflie
              label="Ví trí"
              value={data?.position ? data?.position : 'Chọn vị trí'}
              iconType={IconType.MaterialCommunityIcons}
              iconName="checkerboard"
              onPress={showPosition}
              editable={editable}
            />
            <RowProflie
              label="Trình độ"
              value={data?.level ? data?.level : 'Chọn trình độ của bạn'}
              iconType={IconType.MaterialCommunityIcons}
              iconName="chess-queen"
              onPress={showLevel}
              editable={editable}
            />
          </View>
        </View>
        <View style={styles.address}>
          <TextInput
            editable={editable}
            style={styles.txtAddress}
            multiline={true}
            placeholder="Địa chỉ"
          />
        </View>
        <View style={styles.warpperButton}>
          {editable ? (
            <View style={styles.warpperButtonEdit}>
              <PrimaryButton
                onPress={goback}
                style={[styles.flex49, {backgroundColor: colors.grayDark}]}
                title="hủy"
              />
              <PrimaryButton
                onPress={updateUser}
                style={[styles.flex49, {backgroundColor: colors.green}]}
                title="lưu"
              />
            </View>
          ) : (
            <PrimaryButton
              onPress={toogleEditable}
              style={{backgroundColor: colors.greenDark}}
              title="chỉnh sửa"
            />
          )}
        </View>
        <ModalPicker ref={modalizeRef} onSelectItem={onSelectItem} />
      </ScrollView>
    </Host>
  );
};

const styles = StyleSheet.create({
  flex49: {
    ...Styles.flex49,
  },
  txtRowProfile: {color: colors.blue, fontWeight: 'bold'},
  container: {
    ...Styles.flex1,
    backgroundColor: colors.viewBackground,
    marginTop: spacing.tiny,
  },
  section: {
    backgroundColor: colors.white,
    padding: spacing.small,
  },
  warpperInfo: {
    paddingHorizontal: spacing.small,
  },
  address: {
    marginTop: spacing.tiny,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.small,
    minHeight: scale(70),
  },
  txtAddress: {
    fontSize: scale(14),
    color: colors.black,
  },
  warpperButton: {
    marginTop: spacing.tiny,
    backgroundColor: colors.white,
    padding: spacing.small,
  },
  warpperButtonEdit: {
    ...Styles.rowBetween,
  },
});

const mapDispatchToProps = {
  showLoading,
  hideLoading,
  updateInfoUser,
};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabProfile);
