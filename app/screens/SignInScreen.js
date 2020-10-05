import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../theme/StylesAuth';
import COLOR from '../theme/color';
import LoginFb from '../components/SignInSignUp/LoginFb';
import LoginGg from '../components/SignInSignUp/LoginGg';
import Loading from '../components/Loading'
import AlertSuccessful from '../utils/alerts/AlertSuccessful'
import DialogConfirmSendOPT from '../utils/dialogs/DialogConfirmSendOPT'
import { AuthContext } from '../navigations/AuthContext'

import {
  validatePhoneNumber,
  checkValidPhone,
  signInPhone,
  validatePassword,
  checkUUID,
} from '../server/SignInSignUp/sever';

const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    phone: '',
    password: '',
  });
  const [validError, setValidError] = useState({
    visible: false,
    text: '',
  });
  const [alertSuccess, setAlertSuccess] = useState({
    visible: false,
    text: '',
  });

  const [phoneSuccess, setPhoneSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flag, setFlag] = useState(null);

  const changeInputPhone = phone => {
    setData({
      ...data,
      phone,
    });
    setValidError({
      visible: false,
      text: '',
    });
  };
  const changeInputPassword = password => {
    setData({
      ...data,
      password,
    });
    setValidError({
      visible: false,
      text: '',
    });
  };

  const checkTxtPhone = phone => {
    const err = validatePhoneNumber(phone);
    if (err) {
      setValidError({
        visible: true,
        text: err,
      });
    } else {
      setValidError({
        ...validError,
        visible: false,
      });
      return true;
    }
  };
  const checkTxtPassword = password => {
    const err = validatePassword(password);
    if (err) {
      setValidError({
        visible: true,
        text: err,
      });
    } else {
      setValidError({
        ...validError,
        visible: false,
      });
      return true;
    }
  };

  const checkExistPhone = async phone => {
    try {
      if (checkTxtPhone(phone)) {
        setIsLoading(true);
        const resPhone = await checkValidPhone(phone);
        if (resPhone.code === 200) {
          setIsLoading(false);
          setIsModalVisible(true);
        } else if (resPhone.code === 409) {
          if (resPhone.data.password === '') {
            setIsLoading(false);
            updatePassword();
          } else {
            setIsLoading(false);
            setPhoneSuccess(true);
          }
        } else {
          setIsLoading(false);
          setValidError({
            visible: true,
            text: 'Số điện thoại đã được đăng ký làm chủ sân',
          });
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  const updatePassword = () => {
    setFlag(2);
    setIsModalVisible(true);
  };

  const {signIn} = React.useContext(AuthContext);
  const login = async (phone, password) => {
    if (checkTxtPassword(password)) {
      setIsLoading(true);
      const res = await signInPhone(phone, password);
      if (res.code === 200) {
        setIsLoading(false);
        setAlertSuccess({
          visible: true,
          text: 'Đăng nhập thành công',
        });
        setTimeout(() => {
          signIn(res.data);
        }, 2000);
        Keyboard.dismiss();
      } else {
        setIsLoading(false);
        setValidError({
          visible: true,
          text: 'Mật khẩu không chính xác',
        });
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{flex: 1}}>
      <StatusBar
        backgroundColor={COLOR.STATUSBAR_COLOR}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.container}>
        <Loading visible={isLoading} />
        <AlertSuccessful
          visible={alertSuccess.visible}
          text={alertSuccess.text}
        />
        <DialogConfirmSendOPT
          phone={data.phone}
          flag={flag}
          visible={isModalVisible}
          navigation={navigation}
          data={data}
          dismiss={() => setIsModalVisible(false)}
        />
        <Animatable.View animation="zoomIn" style={styles.header}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </Animatable.View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animatable.View animation="slideInUp" style={styles.footer}>
            {!phoneSuccess ? (
              <Animatable.View animation="fadeInLeft" style={styles.action}>
                <Feather name="phone" color={'#7f8c8d'} size={22} />
                <TextInput
                  placeholder="Nhập số điện thoại"
                  placeholderTextColor="#95a5a6"
                  autoCapitalize="none"
                  maxLength={10}
                  keyboardType="numeric"
                  returnKeyType="next"
                  value={data.phone}
                  onChangeText={val => changeInputPhone(val)}
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={() => checkExistPhone(data.phone)}
                  style={styles.btnNext}>
                  <AntDesign name="arrowright" size={25} color="white" />
                </TouchableOpacity>
              </Animatable.View>
            ) : (
              <Animatable.View animation="fadeInRight">
                <TouchableOpacity
                  style={{
                    marginBottom: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setPhoneSuccess(false);
                    setValidError({
                      visible: false,
                      text: '',
                    });
                  }}>
                  <AntDesign name="left" size={25} color="#16a085" />
                  <Text
                    style={{fontSize: 16, marginLeft: 10, color: '#676767'}}>
                    Đổi số điện thoại
                  </Text>
                </TouchableOpacity>
                <View style={styles.action}>
                  <Feather name="phone" color={'#7f8c8d'} size={22} />
                  <TextInput
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#95a5a6"
                    autoCapitalize="none"
                    maxLength={6}
                    keyboardType="numeric"
                    returnKeyType="next"
                    secureTextEntry={true}
                    // autoFocus={true}
                    onChangeText={val => changeInputPassword(val)}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => login(data.phone, data.password)}
                    style={styles.btnNext}>
                    <AntDesign name="right" size={25} color="#fff" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => updatePassword()}
                  style={{
                    marginBottom: 10,
                    alignItems: 'flex-end',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, marginLeft: 10, color: '#676767'}}>
                    Quên mật khẩu
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
            {validError.visible && (
              <Animatable.Text animation="fadeInLeft" style={{color: 'red'}}>
                {validError.text}
              </Animatable.Text>
            )}
            <Text style={{color: '#95a5a6'}}>
              * Nhập số điện thoại dùng để đăng nhập hoặc đăng kí
            </Text>
            <View style={styles.more}>
              <Text style={styles.txtMore}>Hoặc</Text>
            </View>
            <LoginFb navigation={navigation} />
            <LoginGg navigation={navigation} />
          </Animatable.View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignInScreen;
