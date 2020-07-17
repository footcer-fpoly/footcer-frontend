import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export default class TabProfile extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#EDEDED'}}>
        <View style={{margin: 15}}>
          <View
            style={{padding: 15, backgroundColor: '#fff', borderRadius: 10}}>
            <Text style={{color: '#000', fontSize: 15}}>Thông tin</Text>
            <View style={styles.item}>
              <Text style={{fontSize: 14, color: '#676767'}}>Ngày sinh</Text>
              <Text style={{fontSize: 14}}>Ngày sinh</Text>
            </View>
            <View style={styles.item}>
              <Text style={{fontSize: 14, color: '#676767'}}>
                Số điện thoại
              </Text>
              <Text style={{fontSize: 14}}>Ngày sinh</Text>
            </View>
            <View style={styles.item}>
              <Text style={{fontSize: 14, color: '#676767'}}>Vị trí</Text>
              <Text style={{fontSize: 14}}>Ngày sinh</Text>
            </View>
            <View style={styles.lastItem}>
              <Text style={{fontSize: 14, color: '#676767'}}>Trình độ</Text>
              <Text style={{fontSize: 14}}>Ngày sinh</Text>
            </View>
          </View>
          <View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                marginTop: 15,
                borderRadius: 10,
              }}>
              <View style={styles.item2}>
                <Text style={{fontSize: 14, color: '#676767'}}>Địa chỉ</Text>
                <TextInput
                  style={{fontSize: 14, maxWidth: 250, direction: 'rtl'}}
                  placeholder="71 Cộng Hoà, P4, Q.Tân Bình"
                  numberOfLines={1}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.btnUpdate}>
                <Text style={{color: '#fff', fontSize:16}}>Cập Nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    paddingVertical: 15,
  },
  lastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  item2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  btnUpdate: {
    backgroundColor: '#0AB134',
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
  },
});
