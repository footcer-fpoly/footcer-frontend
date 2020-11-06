import React from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import Avatar from '../common/Avatar';
import PrimaryButton from '../common/PrimaryButton';
import {body2, headline4, headline5, Text} from '../common/Text';

const ModalAddMember = ({
  visible,
  dismiss,
  status,
  onChangeText,
  member,
  onPressSearchPhone,
  onPresSendInvitation,
  onPressInvitationToJoin,
  onPressChangePhone,
  phone,
}) => {
  const searchPhone = () => {
    return (
      <>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại ..."
          onChangeText={onChangeText}
          keyboardType="numeric"
        />
        <Text style={styles.subText}>
          Nhập số điện thoại của cầu thủ bạn muốn mời vào đội bóng
        </Text>
        <PrimaryButton
          title="Tiếp tục"
          onPress={onPressSearchPhone}
          textStyle={styles.txtBtn}
          style={styles.btn}
        />
      </>
    );
  };
  const sendInvitation = () => {
    return (
      <>
        <Avatar image={member?.avatar} size={scale(120)} disabledImage={true} />
        <Text style={styles.subText}>Lời mời gia nhập đội của bạn tới</Text>
        <Text type={headline4}>{member?.displayName}</Text>
        <PrimaryButton
          title="Gữi lời mời"
          onPress={onPresSendInvitation}
          textStyle={styles.txtBtn}
          style={styles.btn}
        />
      </>
    );
  };
  function joinApp() {
    return (
      <>
        <View style={styles.warpperIcon}>
          <Icon
            name="cellphone-sound"
            color={colors.greenLight}
            size={scale(50)}
          />
        </View>
        <Text type={body2} style={[styles.subText, styles.maxWidth]}>
          Số điện thoại <Text type={headline5}>{phone}</Text> chưa có tài khoản
          trên Footcer
        </Text>
        <PrimaryButton
          title="Mời tham gia"
          onPress={onPressInvitationToJoin}
          textStyle={styles.txtBtn}
          style={styles.btn}
        />
      </>
    );
  }
  function renderContent(status) {
    switch (status) {
      case 1:
        return sendInvitation();
      case 2:
        return joinApp();
      default:
        return searchPhone();
    }
  }

  return (
    <Modal
      onBackButtonPress={dismiss}
      statusBarTranslucent={true}
      useNativeDriver={true}
      isVisible={visible}>
      <View style={styles.container}>
        {!!status && (
          <TouchableOpacity
            onPress={onPressChangePhone}
            style={styles.iconBack}>
            <Icon
              color={colors.grayDark}
              name="keyboard-backspace"
              size={scale(30)}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={dismiss} style={styles.iconClose}>
          <Icon name="close-circle" size={scale(30)} />
        </TouchableOpacity>
        {renderContent(status)}
      </View>
    </Modal>
  );
};

export default ModalAddMember;

const styles = StyleSheet.create({
  maxWidth: {
    maxWidth: scale(280),
  },
  container: {
    ...Styles.columnCenter,
    backgroundColor: colors.white,
    borderRadius: scale(5),
    paddingHorizontal: scale(20),
    paddingVertical: scale(30),
  },
  warpperIcon: {
    ...Styles.borderRadiusCircle(90),
    ...Styles.columnCenter,
    borderWidth: scale(1),
    borderColor: colors.main,
  },
  btn: {
    marginTop: 25,
    backgroundColor: colors.greenLight,
  },
  txtBtn: {
    color: colors.white,
    textTransform: 'uppercase',
    fontWeight: 'normal',
  },
  input: {
    backgroundColor: colors.white,
    textAlign: 'center',
    borderBottomWidth: 2,
    width: '100%',
    borderBottomColor: colors.greenLight,
    fontSize: 18,
  },
  subText: {
    color: colors.placeHolder,
    textAlign: 'center',
    marginTop: 20,
  },
  iconClose: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconBack: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
