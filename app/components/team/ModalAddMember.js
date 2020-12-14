import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import colors from '../../theme/colors';
import Avatar from '../common/Avatar';
import PrimaryButton from '../common/PrimaryButton';
import {body2, body3, headline4, headline5, Text} from '../common/Text';

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
  phoneError,
  errorStyle,
  onReady,
}) => {
  const scanQR = () => {
    ToastHelper.showToast('Tính năng đang phát triển', colors.orange);
  };
  const searchPhone = () => {
    return (
      <>
        {!onReady ? (
          <ActivityIndicator size="large" color={colors.main} />
        ) : (
          <View
            style={styles.warpperInput(
              phoneError ? colors.red : colors.greenLight,
            )}>
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại ..."
              onChangeText={onChangeText}
              keyboardType="numeric"
              maxLength={10}
            />
            <TouchableOpacity onPress={scanQR}>
              <Icon name="qrcode" size={scale(20)} color={colors.gray} />
            </TouchableOpacity>
          </View>
        )}
        {phoneError && (
          <Animatable.Text
            animation="fadeInLeft"
            type={body3}
            style={[styles.txtErr, errorStyle]}>
            {phoneError}
          </Animatable.Text>
        )}
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
  warpperInput: color => ({
    ...Styles.rowAlignCenter,
    borderBottomWidth: 2,
    borderBottomColor: color,
    marginTop: scale(10),
  }),
  input: {
    backgroundColor: colors.white,
    textAlign: 'center',
    width: '100%',
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
  txtErr: {
    paddingLeft: scale(15),
    color: colors.red,
  },
});
