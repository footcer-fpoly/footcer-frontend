import AsyncStorage from '@react-native-community/async-storage';
import {Avatar} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {searchPhoneUser} from '../../server/User/server';

const ModalAddMember = ({visible, dismiss, member}) => {
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [token, setToken] = useState(null);
  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    return setToken(token);
  };
  useEffect(() => {
    getToken();
  });

  const searchPhone = async (phone, token) => {
    const res = await searchPhoneUser(token, phone);
    console.log(res);
    if (res) {
      if (res.code === 200) {
        setUser(res.data);
        return setStatus(1);
      } else if (res.code === 409) {
        return setStatus(0);
      }
    } else {
      ToastAndroid.showWithGravity(
        'Lỗi',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return setStatus(0);
    }
  };

  function checkLayout() {
    if (status === null) {
      return next();
    } else if (status === 1) {
      return haveUser();
    } else return noneUser();
  }

  function next() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại ..."
          onChangeText={val => setPhone(val)}
          keyboardType="numeric"
          value={phone}
        />
        <Text style={styles.subText}>
          Nhập số điện thoại của cầu thủ bạn muốn mời vào đội bóng
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => searchPhone(phone, token)}>
          <Text style={styles.txtBtn}>TIẾP TỤC</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function haveUser() {
    return (
      <View style={styles.warpper}>
        <TouchableOpacity onPress={() => setStatus(null)}>
          <SimpleLineIcons
            name="screen-smartphone"
            color={'#27ae60'}
            size={50}
          />
        </TouchableOpacity>
        <Avatar style={{width: 120, height: 120}} source={{uri: user.avatar}} />
        <Text style={styles.subText}>Lời mời gia nhập đội của bạn tới</Text>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {user.displayName}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          // onPress={() => searchPhone(txtInput, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI3NzVkN2FhNS1lNjg4LTExZWEtYjRmYi0wMjQyYWMxMjAwMDIiLCJSb2xlIjowLCJleHAiOjE2MTEyODkxMzF9.Z0fQGLafgBHASwM8j5WLOg9wtxJx5pZkaSEvurkjS6U')}
        >
          <Text style={styles.txtBtn}>GỬI LỜI MỜI</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function noneUser() {
    return (
      <View style={styles.warpper}>
        <View
          style={{
            borderColor: '#27ae60',
            width: 90,
            height: 90,
            borderRadius: 45,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SimpleLineIcons
            name="screen-smartphone"
            color={'#27ae60'}
            size={50}
          />
        </View>
        <Text style={[styles.subText, {maxWidth: 280}]}>
          Số điện thoại <Text style={{fontWeight: 'bold'}}>09036363</Text> chưa
          có tài khoản trên Footcer
        </Text>
        <TouchableOpacity
          style={styles.btn}
          // onPress={() => searchPhone(txtInput, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI3NzVkN2FhNS1lNjg4LTExZWEtYjRmYi0wMjQyYWMxMjAwMDIiLCJSb2xlIjowLCJleHAiOjE2MTEyODkxMzF9.Z0fQGLafgBHASwM8j5WLOg9wtxJx5pZkaSEvurkjS6U')}
        >
          <Text style={styles.txtBtn}>MỜI THAM GIA</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const addMember = () => {};

  return (
    <Modal isVisible={visible}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
        {checkLayout()}
      </View>
    </Modal>
  );
};

export default ModalAddMember;

const styles = StyleSheet.create({
  btn: {
    marginTop: 25,
    backgroundColor: '#27ae60',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
  },
  txtBtn: {
    fontSize: 16,
    color: '#fff',
  },
  input: {
    backgroundColor: 'white',
    textAlign: 'center',
    borderBottomWidth: 2,
    width: '100%',
    borderBottomColor: '#27ae60',
    fontSize: 18,
  },
  subText: {
    color: '#95a5a6',
    marginTop: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  warpper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
