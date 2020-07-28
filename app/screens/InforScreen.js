import React, {Component} from 'react';
import {Text, SafeAreaView, Button, View, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default class InforScreen extends Component {
  render() {
    return (
      <View style={{backgroundColor: 'white', height: '100%'}}>
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
                height: 65,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  name="search"
                  color="#0AB134"
                  size={25}
                  style={{marginHorizontal: 20}}
                />
                <Text style={{marginLeft: 40, fontSize: 16}}>
                  Tìm kiếm đội bóng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 65,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CreateTeam')}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  name="user-plus"
                  color="#0AB134"
                  size={25}
                  style={{marginHorizontal: 20}}
                />
                <Text style={{marginLeft: 40, fontSize: 16}}>
                  Tạo đội bóng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 65,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  name="share-2"
                  color="#0AB134"
                  size={25}
                  style={{marginHorizontal: 20}}
                />
                <Text style={{marginLeft: 40, fontSize: 16}}>
                  Mời bạn bè sử dụng app
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 65,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  name="settings"
                  color="#0AB134"
                  size={25}
                  style={{marginHorizontal: 20}}
                />
                <Text style={{marginLeft: 40, fontSize: 16}}>
                  Thiết lập ứng dụng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 65,
                borderBottomColor: 'grey',
                borderBottomWidth: 0.3,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  name="log-out"
                  color="#0AB134"
                  size={25}
                  style={{marginHorizontal: 20}}
                />
                <Text style={{marginLeft: 40, fontSize: 16}}>
                  Đăng xuất
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 414,
                height: 65,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Feather
                  name="codesandbox"
                  color="#0AB134"
                  size={25}
                  style={{marginHorizontal: 20}}
                />
                <Text style={{marginLeft: 40, fontSize: 16}}>
                  Quét QR Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
