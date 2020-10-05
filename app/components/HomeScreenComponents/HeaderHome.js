import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Match from '../Match';

export default class HeaderHome extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            color="white"
            size={30}
            style={{paddingLeft: 10}}
          />
          <Text style={styles.textInput}>Nhập sân bóng cần tìm</Text>
        </View>
        <Text style={styles.textHeader}>Trận sắp tới</Text>
        <View>
          {/* <Match
            nameStadium="Sân Bóng Chảo Lửa"
            addressStadium="30 Phan Thúc Duyệt, Tân Bình"
            nameUser="Dương Hải Đăng"
            status="Đã có sân"
            time="20:30"
            date="26/06/2020"
            size="7"
          /> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    // flex: 1,
    // position: 'absolute',
    paddingBottom: 90,
    backgroundColor: '#0AB134',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    // height: '30%',
    marginTop: 60,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  textInput: {
    color: '#FFF',
    fontSize: 15,
    marginLeft: 8,
    padding: 8,
  },
  textHeader: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff',
    marginLeft: 10,
  },
});
