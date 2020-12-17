import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StatusCode} from '../../api/status-code';
import {addMemberTeamService} from '../../api/team.api';
import {searchPhoneUserService} from '../../api/user.api';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import {ToastHelper} from '../../helpers/ToastHelper';
import {validatePhoneNumber} from '../../helpers/validate.helper';
import colors from '../../theme/colors';
import Avatar from '../common/Avatar';
import PrimaryButton from '../common/PrimaryButton';
import {body2, headline4, headline5, Text} from '../common/Text';
import TextError from '../common/TextError';

const initialState = {
  status: 0,
  phoneNumber: '',
  data: null,
  visible: false,
  onReady: true,
  error: null,
};
const ModalAddMember = forwardRef(
  ({onPresSendInvitation, listMember, teamId, nameTeam, create}, ref) => {
    const [state, setState] = useState(initialState);

    const onChangeText = value => {
      setState({...state, phoneNumber: value, error: null});
    };

    const scanQR = () => {
      ToastHelper.showToast('Tính năng đang phát triển', colors.yellowDark);
    };

    useImperativeHandle(ref, () => ({
      showDialog,
    }));

    const onPressSend = user => async () => {
      try {
        if (onPresSendInvitation) {
          setState({
            ...state,
            onReady: false,
          });
          if (!create) {
            const res = await addMemberTeamService({
              userId: state?.data?.userId,
              teamId,
              nameTeam,
            });
            console.log('addMemberTeamService -->res: ', res);
            if (res && res.code === StatusCode.SUCCESS) {
              hideDialog();
              onPresSendInvitation({user});
              ToastHelper.showToast('Gửi lời mời thành công', colors.greenDark);
            } else {
              ToastHelper.showToast('Lỗi hệ thống', colors.red);
              hideDialog();
            }
          } else {
            hideDialog();
            onPresSendInvitation({user});
          }
        }
      } catch (error) {
        console.log(
          'LOG -> file: ModalAddMember.js -> line 87 -> onPressSend -> error',
          error,
        );
        hideDialog();
        ToastHelper.showToast('Lỗi hệ thống', colors.red);
      }
    };

    const showDialog = () => {
      setState({...state, visible: true, error: null});
    };
    const hideDialog = () => {
      setState(initialState);
    };
    const onPressPrevious = () => {
      setState({
        ...state,
        status: 0,
      });
    };
    const onPressInvitationToJoin = () => {
      hideDialog();
      scanQR();
    };
    const searchPhone = async () => {
      try {
        const err = validatePhoneNumber(state.phoneNumber);
        if (err) {
          setState({
            ...state,
            error: err,
          });
        } else {
          const checkPhone = listMember.find(
            item => item?.user?.phone === state.phoneNumber,
          );
          if (!checkPhone) {
            setState({
              ...state,
              onReady: false,
            });
            const res = await searchPhoneUserService(state.phoneNumber);
            if (res && res.code === StatusCode.SUCCESS) {
              setState({
                ...state,
                data: res.data,
                status: 1,
                onReady: true,
                error: null,
              });
            } else {
              setState({
                ...state,
                data: null,
                status: 2,
                onReady: true,
                error: null,
              });
            }
          } else {
            setState({
              ...state,
              error: 'Thành viên đã có trong team',
            });
          }
        }
      } catch (error) {
        console.log(
          'LOG -> file: ModalAddMember.js -> line 95 -> searchPhone -> error',
          error,
        );
      }
    };

    const renderSearchPhone = () => {
      return (
        <>
          {!state.onReady ? (
            <ActivityIndicator size="large" color={colors.main} />
          ) : (
            <View
              style={styles.warpperInput(
                state.error ? colors.red : colors.greenLight,
              )}>
              <TextInput
                style={styles.input}
                value={state.phoneNumber}
                placeholder="Nhập số điện thoại"
                onChangeText={value => onChangeText(value)}
                keyboardType="numeric"
                maxLength={10}
              />
              <TouchableOpacity onPress={scanQR}>
                <Icon name="qrcode" size={scale(20)} color={colors.gray} />
              </TouchableOpacity>
            </View>
          )}
          {state.error && <TextError text={state.error} />}
          <Text style={styles.subText}>
            Nhập số điện thoại của cầu thủ bạn muốn mời vào đội bóng
          </Text>
          <PrimaryButton
            disabled={state.status}
            title="Tiếp tục"
            onPress={searchPhone}
            textStyle={styles.txtBtn}
            style={styles.btn}
          />
        </>
      );
    };
    const sendInvitation = () => {
      return (
        <>
          <Avatar
            image={state?.data?.avatar}
            size={scale(120)}
            disabledImage={true}
          />
          <Text style={styles.subText}>Lời mời gia nhập đội của bạn tới</Text>
          <Text type={headline4}>{state?.data?.displayName}</Text>
          <PrimaryButton
            title="Gửi lời mời"
            onPress={onPressSend(state.data)}
            textStyle={styles.txtBtn}
            style={styles.btn}
            disabled={!state.status}
            right={
              !state.onReady && (
                <ActivityIndicator size="small" color={colors.white} />
              )
            }
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
            Số điện thoại <Text type={headline5}>{state.phoneNumber}</Text> chưa
            có tài khoản trên Footcer
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
          return renderSearchPhone();
      }
    }

    return (
      <Modal
        onBackButtonPress={hideDialog}
        statusBarTranslucent={true}
        useNativeDriver={true}
        isVisible={state.visible}>
        <View style={styles.container}>
          {!!state.status && (
            <TouchableOpacity onPress={onPressPrevious} style={styles.iconBack}>
              <Icon
                color={colors.grayDark}
                name="keyboard-backspace"
                size={scale(30)}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={hideDialog} style={styles.iconClose}>
            <Icon name="close-circle" size={scale(30)} />
          </TouchableOpacity>
          {renderContent(state.status)}
        </View>
      </Modal>
    );
  },
);

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
    paddingHorizontal: scale(15),
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
