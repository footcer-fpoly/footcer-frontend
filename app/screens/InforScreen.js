import React, {Component} from 'react';
import {Text, SafeAreaView, Button, View, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default class InforScreen extends Component {
  render() {
    return (
      <View style={{backgroundColor: 'white',height:'100%'}}>
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
              source={require('../assets/images/avatar.jpg')}
              style={{width: 90, height: 90, borderRadius: 80}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{position: 'absolute', marginLeft: 145, marginTop: 110}}>
            <Text style={{color: 'white', fontSize: 18, marginBottom: 10}}>
              Huỳnh Xuân Bình
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'white', fontSize: 14}}>
                Chỉnh sửa tài khoản
              </Text>
              <Feather
                name="chevron-right"
                color="white"
                size={15}
                style={{marginLeft: 10}}
              />
            </View>
          </View>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 75,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <Feather
                name="search"
                color="#0AB134"
                size={25}
                style={{marginHorizontal: 20}}
              />
              <Text style={{marginLeft: 40, fontSize: 16}}>
                Tìm kiếm đội bóng
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 75,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <Feather
                name="user-plus"
                color="#0AB134"
                size={25}
                style={{marginHorizontal: 20}}
              />
              <Text style={{marginLeft: 40, fontSize: 16}}>
                Tạo đội bóng
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 75,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <Feather
                name="share-2"
                color="#0AB134"
                size={25}
                style={{marginHorizontal: 20}}
              />
              <Text style={{marginLeft: 40, fontSize: 16}}>
                Mời bạn bè sử dụng app
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 75,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <Feather
                name="settings"
                color="#0AB134"
                size={25}
                style={{marginHorizontal: 20}}
              />
              <Text style={{marginLeft: 40, fontSize: 16}}>
                Thiết lập ứng dụng
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 75,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <Feather
                name="log-out"
                color="#0AB134"
                size={25}
                style={{marginHorizontal: 20}}
              />
              <Text style={{marginLeft: 40, fontSize: 16}}>Đăng xuất</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 75,
              }}>
              <Feather
                name="codesandbox"
                color="#0AB134"
                size={25}
                style={{marginHorizontal: 20}}
              />
              <Text style={{marginLeft: 40, fontSize: 16}}>
                Quét QR Code
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
