import React, {useRef, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Host} from 'react-native-portalize';
import {connect} from 'react-redux';
import {body2, Text} from '../../components/common/Text';
import {ListLevel, ListPosition} from '../../helpers/data-local.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import rootNavigator from '../../navigations/root.navigator';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import {IconType} from '../common/IconMaterialOrSvg';
import ModalPicker from '../common/ModalPicker';
import PrimaryButton from '../common/PrimaryButton';
import RowProflie from './RowProflie';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatCouponDateDisplay} from '../../helpers/format.helper';

const TabProfile = ({profile}) => {
  const modalizeRef = useRef();
  const [editable, setEditable] = useState(false);
  const toogleEditable = () => {
    setEditable(!editable);
  };
  const [data, setData] = useState({
    displayName: profile?.displayName,
    phone: profile?.phone,
    birthday: profile?.birthday,
    level: profile?.level,
    position: profile?.position,
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
    console.log('itemData: ', itemData);
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
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);

  const handleConfirm = date => {
    setData({
      ...data,
      birthday: formatCouponDateDisplay(date),
    });
    toogleDatePicker();
  };
  const toogleDatePicker = () => {
    setVisibleDatePicker(!visibleDatePicker);
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
          <Text type={body2}>Thông tin</Text>
          <View style={styles.warpperInfo}>
            <RowProflie
              label="Họ và tên"
              value={data.displayName}
              iconType={IconType.MaterialIcons}
              iconName="account-circle"
              editable={editable}
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
              value={data?.level ? data?.level : 'Chọn vị trí'}
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
                onPress={toogleEditable}
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

const mapDispatchToProps = {};
function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabProfile);
