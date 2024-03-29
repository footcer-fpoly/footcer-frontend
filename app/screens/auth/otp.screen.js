import firebase from '@react-native-firebase/app';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth'; //don't remove
import {connect} from 'react-redux';
import {signUpFbGgService} from '../../api/auth.api';
import {backgroundImage, iPhoneImage} from '../../assets/Images';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import styles from '../../theme/StylesAuth';
import AlertError from '../../utils/alerts/AlertError';
import AlertSuccessful from '../../utils/alerts/AlertSuccessful';
import {login, register} from '../../redux/actions/auth.action';
import StatusCode from '../../api/status-code';
import {SIGN_UP_SCREEN, UPDATE_PASS_SCREEN} from '../../navigations/route-name';
import {
  body1,
  body2,
  headline2,
  headline3,
  headline4,
  Text,
} from '../../components/common/Text';
import colors from '../../theme/colors';
const OTPScreen = ({route, navigation, showLoading, hideLoading, register}) => {
  var countDownTime;
  const {phone, data, flag} = route.params;
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');
  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);
  const pin5ref = useRef(null);
  const pin6ref = useRef(null);

  let [timer, setTimer] = useState(60);
  const [confirmResult, setConfirmResult] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState({
    visible: false,
    text: '',
  });
  const [alertError, setAlertError] = useState({
    visible: false,
    text: '',
  });

  const focusInput = (changePin, pin, next, prev) => {
    changePin;
    if (!pin.length) {
      if (next) {
        next.current.focus();
      }
    } else {
      if (prev) {
        prev.current.focus();
      }
    }
  };
  const sendOTP = (phone, timer) => {
    const phone84 = '+84' + phone;
    try {
      showLoading();
      firebase
        .auth()
        .signInWithPhoneNumber(phone84)
        .then(confirmResult => {
          setConfirmResult(confirmResult);
          countDownTime = setInterval(() => {
            setTimer(--timer);
            if (timer === 0) {
              clearInterval(countDownTime);
            }
          }, 1000);
          hideLoading();
        })
        .catch(error => {
          hideLoading();
          console.log(error);
        });
    } catch (err) {
      hideLoading();
      console.log(err);
    }
  };

  const handleVerifyCode = confirmResult => {
    if (pin1 && pin2 && pin3 && pin4 && pin5 && pin6) {
      const pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
      console.log(pin);
      showLoading();
      confirmResult
        .confirm(pin)
        .then(async () => {
          hideLoading();
          _goToNext(flag, data, phone);
        })
        .catch(error => {
          setAlertError({visible: true, text: 'Mã xác thực không đúng'});
          hideLoading();
        });
    } else {
      setAlertError({visible: true, text: 'Mã xác thực có 6 kí tự'});
      hideLoading();
    }
  };

  const _goToNext = async (flag, data, phone) => {
    console.log('OTPScreen => flag: ', flag);
    if (flag === 0 || flag === 1) {
      try {
        const res = await signUpFbGgService(data);
        console.log('signUpFbGgService => res: ', res);
        if (res && res.code === StatusCode.SUCCESS) {
          setAlertSuccess({
            visible: true,
            text: 'Đăng kí tại khoản thành công',
          });
          setTimeout(() => {
            register(res.data);
          }, 2000);
        } else {
          setAlertError({visible: true, text: 'Đăng kí thất bại'});
        }
      } catch (error) {
        console.log('signUpFbGg => err: ', error);
      }
    } else if (flag === 2) {
      setAlertSuccess({visible: true, text: 'Xác thực thành công'});
      setTimeout(() => {
        navigation.replace(UPDATE_PASS_SCREEN, {phone: phone});
      }, 2000);
    } else {
      setAlertSuccess({visible: true, text: 'Xác thực thành công'});
      setTimeout(() => {
        navigation.replace(SIGN_UP_SCREEN, {phone: phone});
      }, 2000);
    }
  };

  useEffect(() => {
    sendOTP(phone, 60);
    return () => {
      clearInterval(countDownTime);
    };
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <SafeAreaView style={{flex: 1}}>
        <AlertSuccessful
          visible={alertSuccess.visible}
          text={alertSuccess.text}
        />
        <AlertError
          visible={alertError.visible}
          text={alertError.text}
          dismiss={() => setAlertError({...alertError, visible: false})}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnGoBack}>
          <AntDesign name="left" size={22} color="white" />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <Image
                source={iPhoneImage}
                style={{width: 100, height: 120, marginBottom: 10}}
              />
              <Text type={headline2} style={{color: 'white', marginBottom: 20}}>
                Xác thực OTP
              </Text>
              <Text type={body1} style={{color: 'white', textAlign: 'center'}}>
                Một mã xác thực đã được gữi đến số {'\n'} {phone}
              </Text>
            </View>
            <View style={styles.footer}>
              <View style={styles.warpperInputOTP}>
                <TextInput
                  ref={pin1ref}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={val =>
                    focusInput(setPin1(val), pin1, pin2ref, null)
                  }
                  value={pin1}
                  style={styles.inputOTP}
                />
                <TextInput
                  ref={pin2ref}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={val =>
                    focusInput(setPin2(val), pin2, pin3ref, pin1ref)
                  }
                  value={pin2}
                  style={styles.inputOTP}
                />
                <TextInput
                  ref={pin3ref}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={val =>
                    focusInput(setPin3(val), pin3, pin4ref, pin2ref)
                  }
                  value={pin3}
                  style={styles.inputOTP}
                />
                <TextInput
                  ref={pin4ref}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={val =>
                    focusInput(setPin4(val), pin4, pin5ref, pin3ref)
                  }
                  value={pin4}
                  style={styles.inputOTP}
                />
                <TextInput
                  ref={pin5ref}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={val =>
                    focusInput(setPin5(val), pin5, pin6ref, pin4ref)
                  }
                  value={pin5}
                  style={styles.inputOTP}
                />
                <TextInput
                  ref={pin6ref}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={val =>
                    focusInput(setPin6(val), pin6, null, pin5ref)
                  }
                  value={pin6}
                  style={styles.inputOTP}
                />
              </View>
              {timer !== 0 ? (
                <Animatable.Text
                  animation="fadeIn"
                  style={{color: '#676767', fontWeight: 'bold', fontSize: 18}}>
                  ({timer})
                </Animatable.Text>
              ) : (
                <Animatable.View animation="fadeIn">
                  <TouchableOpacity
                    onPress={() => sendOTP(phone, 60)}
                    style={{justifyContent: 'center'}}>
                    <Text
                      type={headline3}
                      style={{
                        color: colors.gray,
                      }}>
                      Gữi lại mã xác thực
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              )}
              <TouchableOpacity
                onPress={() => handleVerifyCode(confirmResult)}
                style={styles.button}>
                <Text
                  type={headline4}
                  style={{
                    flex: 1,
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Tiếp theo
                </Text>
                <AntDesign name="arrowright" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
};
const mapDispatchToProps = {
  showLoading,
  hideLoading,
  login,
  register,
};

export default connect(
  null,
  mapDispatchToProps,
)(OTPScreen);
