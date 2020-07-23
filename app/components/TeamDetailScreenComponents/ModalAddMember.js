import React, {Component} from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

export default class ModalAddMember extends Component {
  render() {
    const urlQRCode =
      'https://icon-library.com/images/qr-code-icon/qr-code-icon-24.jpg';
    return (
      <View style={{backgroundColor: '#FFF', borderRadius: 10}}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}>
          <TextInput
            style={{
              textAlign: 'center',
              width: '80%',
              fontSize: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#0AB134',
              fontSize: 20,
            }}
            placeholder="Số điện thoại"
          />
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              marginTop: 10,
              color: '#AAAAAA',
            }}>
            Nhập số điện thoại của cầu thủ bạn muốn mời vào đội bóng
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              marginTop: 10,
              color: '#AAAAAA',
            }}>
            Quét QR code để tham gia đội bóng
          </Text>
          <Image
            style={{
              height: 120,
              width: 120,
              alignItems: 'center',
              marginTop: 20,
            }}
            source={{uri: urlQRCode}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#AAAAAA',
              alignItems: 'center',
              marginTop: 15,
              padding: 15,
              borderRadius: 10,
              width: '49%',
            }}>
            <Text style={{color: '#fff', fontSize: 16}}>QUAY LẠI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#0AB134',
              alignItems: 'center',
              marginTop: 15,
              padding: 15,
              borderRadius: 10,
              width: '49%',
            }}>
            <Text style={{color: '#fff', fontSize: 16}}>GỬI LỜI MỜIt</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
