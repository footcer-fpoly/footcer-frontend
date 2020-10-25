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
import {checkValidPhoneService} from '../../api/auth.api';
import {StatusCode} from '../../api/status-code';
import {backgroundImage} from '../../assets/Images';
import {validatePhoneNumber} from '../../helpers/validate.helper';
import {hideLoading, showLoading} from '../../redux/actions/loading.action';
import styles from '../../theme/StylesAuth';
import DialogConfirmSendOPT from '../../utils/dialogs/DialogConfirmSendOPT';

const SignUpFbGgScreen = ({navigation, route, showLoading, hideLoading}) => {
  const {data, flag} = route.params;
  const [dataUser, setDataUser] = useState({
    id: '',
    phone: '',
    name: '',
    image: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validError, setValidError] = useState({
    visible: false,
    text: '',
  });
  const setData = () => {
    if (!flag) {
      setDataUser({
        ...dataUser,
        id: data.id,
        name: data.name,
        image: data.picture.data.url,
      });
    } else {
      setDataUser({
        ...dataUser,
        id: data.id,
        name: data.name,
        image: data.photo,
      });
    }
  };
  useEffect(() => {
    setData();
  }, []);

  const checkPhone = async phone => {
    const err = validatePhoneNumber(phone);
    if (err) {
      setValidError({visible: true, text: err});
    } else {
      showLoading();
      const res = await checkValidPhoneService(phone);
      console.log('checkValidPhoneService => res: ', res);
      if (res.code === StatusCode.SUCCESS) {
        setIsModalVisible(true);
      } else if (res.code === StatusCode.validPhone.USER_EXISTS) {
        setValidError({visible: true, text: 'Số điện thoại đã được đăng ký'});
      } else if (res.code === StatusCode.validPhone.USER_IS_ADMIN) {
        setValidError({
          visible: true,
          text: 'Số điện thoại đã được đăng ký làm chủ sân',
        });
      } else {
        alert('Lỗi :', res.code);
      }
      hideLoading();
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <SafeAreaView style={{flex: 1}}>
        <DialogConfirmSendOPT
          data={dataUser}
          phone={dataUser.phone}
          flag={flag}
          visible={isModalVisible}
          navigation={navigation}
          dismiss={() => setIsModalVisible(false)}
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
              <Text style={styles.titleScreen}>Cập nhật thông tin</Text>
              <Text style={styles.subTitleScreen}> Cập nhật số điện thoại</Text>
            </View>
            <View
              style={{
                flex: 1.5,
                position: 'relative',
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
                    uri: dataUser.image ? dataUser.image : null,
                  }}
                />
                <Text
                  style={{
                    marginTop: 10,
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: 20,
                  }}>
                  {dataUser.name}
                </Text>
              </View>

              <View
                style={{
                  zIndex: 1,
                }}>
                <TextInput
                  placeholder="Nhập số điện thoại"
                  placeholderTextColor="#bdc3c7"
                  autoCapitalize="none"
                  maxLength={10}
                  keyboardType="numeric"
                  returnKeyType="next"
                  autoCorrect={false}
                  style={styles.inputBorder}
                  onChangeText={val => {
                    setDataUser({
                      ...dataUser,
                      phone: val,
                    });
                    setValidError({
                      visible: false,
                      text: '',
                    });
                  }}
                  value={dataUser.phone}
                />
                {validError.visible && (
                  <Animatable.Text
                    animation="fadeInLeft"
                    style={{color: 'red', textAlign: 'center'}}>
                    {validError.text}
                  </Animatable.Text>
                )}
                <TouchableOpacity
                  onPress={() => checkPhone(dataUser.phone)}
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
};

export default connect(
  null,
  mapDispatchToProps,
)(SignUpFbGgScreen);
