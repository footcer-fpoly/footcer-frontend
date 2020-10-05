import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Button, View, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import { AuthContext } from '../navigations/AuthContext'
import { getInforUser } from '../server/User/server'


import RowItem from '../components/ProfileScreenComponents/RowItem'

const InforScreen = ({ navigation }) => {

  const [dataUser, setDataUser] = useState({});
  const getInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const res = await getInforUser(token);
    if (res.code === 200) {
      setDataUser(res.data);
    } else {
      alert('huhu');
    }
  }

  useEffect(() => {
    getInfo();
    console.log(dataUser)
  }, [])


  const { signOut } = React.useContext(AuthContext)

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View
        style={{
          backgroundColor: '#0AB134',
          width: 414,
          height: 220,
        }}>
        <View
          style={{
            width: 105,
            height: 105,
            borderRadius: 90,
            borderWidth: 1,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 80,
          }}>
          <Image
            source={{
              uri: dataUser.avatar ? dataUser.avatar : null,
            }}
            style={{ width: 90, height: 90, borderRadius: 80 }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{ position: 'absolute', marginLeft: 145, marginTop: 110 }}>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>
            {dataUser.displayName}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 14 }}>
              Chỉnh sửa tài khoản
              </Text>
            <Feather
              name="chevron-right"
              color="white"
              size={15}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: 'white' }}>
        <RowItem icon='search' text='Tìm kiếm đội bóng' />
        <RowItem icon='user-plus' text='Tạo đội bóng' onPress={() => navigation.navigate('CreateTeam', { dataUser })} />
        <RowItem icon='share-2' text='Mời bạn bè sử dụng app' />
        <RowItem icon='settings' text='Thiết lập ứng dụng' />
        <RowItem icon='log-out' text='Đăng xuất' onPress={() => signOut()} />
        <RowItem icon='codesandbox' text='Quét QR Code' />
      </View>
    </View >
  );
}
export default InforScreen;
