import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {checkValidPhoneService, signInPhoneService} from '../../api/auth.api';
import {StatusCode} from '../../api/status-code';
import {backgroundImage, logoImage} from '../../assets/Images';
import LoginFb from '../../components/auth/LoginFb';
import LoginGg from '../../components/auth/LoginGg';
import {getDomain} from '../../helpers/storage.helper';
import {
  validatePassword,
  validatePhoneNumber,
} from '../../helpers/validate.helper';
import {login} from '../../redux/actions/auth.action';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import styles from '../../theme/StylesAuth';
import AlertSuccessful from '../../utils/alerts/AlertSuccessful';
import DialogConfirmSendOPT from '../../utils/dialogs/DialogConfirmSendOPT';

const SignInScreen = ({navigation, showLoading, hideLoading, login}) => {
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
  const [domain, setdomain] = useState('');
  const [phoneSuccess, setPhoneSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    getDomainStorage();
  }, []);
  const openAboutUs = () => {
    Linking.openURL(domain);
  };
  const getDomainStorage = async () => {
    const res = await getDomain();
    setdomain(res);
  };
  const changeInputPhone = (phone) => {
    setData({
      ...data,
      phone,
    });
    setValidError({
      visible: false,
      text: '',
    });
  };
  const changeInputPassword = (password) => {
    setData({
      ...data,
      password,
    });
    setValidError({
      visible: false,
      text: '',
    });
  };

  const checkTxtPhone = (phone) => {
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
  const checkTxtPassword = (password) => {
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

  const checkExistPhone = async (phone) => {
    try {
      if (checkTxtPhone(phone)) {
        showLoading();
        const resPhone = await checkValidPhoneService(phone);
        console.log('resPhone: ', resPhone);
        console.log('resPhone.code: ', resPhone.code);
        if (resPhone.code === StatusCode.SUCCESS) {
          setIsModalVisible(true);
        } else if (resPhone.code === StatusCode.validPhone.USER_EXISTS) {
          if (resPhone.data.password === '') {
            updatePassword();
          } else {
            setPhoneSuccess(true);
          }
        } else {
          setValidError({
            visible: true,
            text: 'Số điện thoại đã được đăng ký làm chủ sân',
          });
        }
        hideLoading();
      }
    } catch (error) {
      console.log('checkValidPhoneService => err: ', error);
      hideLoading();
    }
  };
  const updatePassword = () => {
    setFlag(2);
    setIsModalVisible(true);
  };

  const loginPhone = async (phone, password) => {
    try {
      if (checkTxtPassword(password)) {
        showLoading();
        const res = await signInPhoneService(phone, password);
        console.log('res', res);
        if (res.code === 200) {
          hideLoading();
          setAlertSuccess({
            visible: true,
            text: 'Đăng nhập thành công',
          });
          setTimeout(() => {
            login(res.data);
          }, 2000);
          Keyboard.dismiss();
        } else {
          hideLoading();
          setValidError({
            visible: true,
            text: 'Mật khẩu không chính xác',
          });
        }
      }
    } catch (error) {
      hideLoading();
      alert(error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <SafeAreaView style={styles.container}>
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
          <TouchableOpacity onPress={openAboutUs}>
            <Image source={logoImage} style={styles.logo} />
          </TouchableOpacity>
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
                  onChangeText={(val) => changeInputPhone(val)}
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
                    value={data.password}
                    // autoFocus={true}
                    onChangeText={(val) => changeInputPassword(val)}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => loginPhone(data.phone, data.password)}
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
              <Animatable.Text
                animation="fadeInLeft"
                style={{color: '#F01F0E'}}>
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

const mapDispatchToProps = {
  showLoading,
  hideLoading,
  login,
};

export default connect(null, mapDispatchToProps)(SignInScreen);
