import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {checkValidPhoneService, updatePassService} from '../../api/auth.api';
import {StatusCode} from '../../api/status-code';
import {backgroundImage} from '../../assets/Images';
import Loading from '../../components/common/loadings/Loading';
import {confirmPassword, validatePassword} from '../../helpers/validate.helper';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import colors from '../../theme/colors';
import styles from '../../theme/StylesAuth';
import AlertSuccessful from '../../utils/alerts/AlertSuccessful';
import {logout} from '../../redux/actions/auth.action';
import rootNavigator from '../../navigations/root.navigator';
import {SIGN_IN_SCREEN} from '../../navigations/route-name';

const UpdatePassScreen = ({
  navigation,
  route,
  showLoading,
  hideLoading,
  logout,
}) => {
  const {phone} = route.params;
  const [user, setUser] = useState({
    phone: '',
    name: '',
    password: '',
    rePassword: '',
    avatar: null,
  });

  const [alertSuccess, setAlertSuccess] = useState({
    visible: false,
    text: '',
  });
  const [error, setError] = useState({
    password: false,
    rePassword: false,
    text: 'haha',
  });
  const getData = async () => {
    try {
      const res = await checkValidPhoneService(phone);
      console.log(phone);
      console.log(res);
      setUser({
        ...user,
        phone: res.data.phone,
        name: res.data.displayName,
        avatar: res.data.avatar,
      });
    } catch (error) {
      console.log('getData updatePass => err: ', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const changeTxtPass = (val) => {
    setUser({
      ...user,
      password: val,
    });
    setError({
      ...error,
      password: false,
    });
  };
  const changeTxtRePass = (val) => {
    setUser({
      ...user,
      rePassword: val,
    });
    setError({
      ...error,
      rePassword: false,
    });
  };

  const checkForm = () => {
    const err = validatePassword(user.password);
    if (err) {
      setError({
        ...error,
        password: true,
        text: err,
      });
      return false;
    } else {
      const error = confirmPassword(user.password, user.rePassword);
      if (error) {
        setError({
          ...error,
          rePassword: true,
          text: error,
        });
        return false;
      } else {
        setError({
          password: false,
          rePassword: false,
          text: '',
        });
        return true;
      }
    }
  };

  const updatePass = async () => {
    try {
      if (checkForm()) {
        showLoading();
        const res = await updatePassService(user.phone, user.password);
        console.log('updatePass => res: ', res);
        if (res.code === StatusCode.SUCCESS) {
          setAlertSuccess({
            visible: true,
            text: 'Cập nhật mật khẩu thành công',
          });
          setTimeout(() => {
            logout();
            setAlertSuccess({
              ...alertSuccess,
              visible: false,
            });
            rootNavigator.replace(SIGN_IN_SCREEN);
          }, 2000);
        } else {
          console.log('updatePass => res.code: ', res.code);
        }
        hideLoading();
      }
    } catch (error) {
      hideLoading();
      console.log('updatePass => err: ', error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <StatusBar backgroundColor={colors.mainks} barStyle="light-content" />
      <SafeAreaView style={{flex: 1}}>
        <Loading />
        <AlertSuccessful
          visible={alertSuccess.visible}
          text={alertSuccess.text}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnGoBack}>
          <AntDesign name="left" size={22} color="white" />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.titleScreen}>Cập nhật mật khẩu</Text>
            </View>
            <View
              style={{
                flex: 2,
                backgroundColor: 'white',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                paddingHorizontal: 30,
              }}>
              <View
                style={{
                  marginTop: -100,
                  zIndex: 1,
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    borderWidth: 4,
                    borderColor: '#fff',
                    borderRadius: 80,
                    width: 160,
                    height: 160,
                  }}
                  source={{
                    uri: user.avatar,
                  }}
                />
                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: 20,
                  }}>
                  {user.name}
                </Text>
              </View>

              <View
                style={{
                  zIndex: 1,
                }}>
                <TextInput
                  placeholder="Nhập mật khẩu mới"
                  placeholderTextColor="#bdc3c7"
                  autoCapitalize="none"
                  maxLength={6}
                  keyboardType="numeric"
                  returnKeyType="next"
                  autoCorrect={false}
                  secureTextEntry={true}
                  onChangeText={(val) => changeTxtPass(val)}
                  style={styles.inputBorder}
                />
                {error.password && (
                  <Animatable.Text
                    animation="fadeInLeft"
                    style={{color: 'red', textAlign: 'center'}}>
                    {error.text}
                  </Animatable.Text>
                )}
                <TextInput
                  placeholder="Nhập lại mật khẩu mới"
                  placeholderTextColor="#bdc3c7"
                  autoCapitalize="none"
                  maxLength={6}
                  keyboardType="numeric"
                  returnKeyType="next"
                  autoCorrect={false}
                  secureTextEntry={true}
                  onChangeText={(val) => changeTxtRePass(val)}
                  style={styles.inputBorder}
                />
                {error.rePassword && (
                  <Animatable.Text
                    animation="fadeInLeft"
                    style={{color: 'red', textAlign: 'center'}}>
                    {error.text}
                  </Animatable.Text>
                )}
                <TouchableOpacity
                  onPress={() => updatePass()}
                  style={styles.button}>
                  <Text style={styles.textButton}>Tiếp theo</Text>
                  <AntDesign name="arrowright" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
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
  logout,
};

export default connect(null, mapDispatchToProps)(UpdatePassScreen);
