import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ItemHeader from '../components/ItemHeader';
import ProfileViewPager from '../navigation/ProfileTabView';

export default class ProfileDetailScreen extends Component {
  render() {
    const {nameUser} = 'Fpoly HCM';
    const urlImgAvatar =
      'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/99138497_2590351154572109_7512864550597689344_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=b6MnE2cwBrUAX_jkIId&_nc_ht=scontent.fsgn5-4.fna&oh=7199aec63fa5f92293d68c09eb63dc22&oe=5F332A48';
    return (
      <View style={styles.container}>
        <ItemHeader titleHeader={'Chỉnh sửa tài khoản'} />
        <View style={styles.headerContainer}>
          <View style={styles.viewRow}>
            <View>
              <Image style={styles.imgAvatar} source={{uri: urlImgAvatar}} />
              <TouchableOpacity style={styles.edit}>
                <Icon name={'pen'} size={12} color={'#fff'} />
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 15}}>
              <View style={styles.viewRow}>
                <Text style={{color: '#fff', fontSize: 18}}>
                  {nameUser}Huỳnh Xuân Bình
                </Text>
                <View style={styles.editName}>
                  <Icon name={'pen'} size={12} color={'#fff'} />
                </View>
              </View>

              <TouchableOpacity style={styles.btnChangePassword}>
                <Text style={{color: '#fff', fontSize: 14}}>Đổi mật khẩu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <ProfileViewPager />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#0AB134',
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  imgAvatar: {
    height: 85,
    width: 85,
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  edit: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#707070',
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editName: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  btnChangePassword: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5E0B',
    marginTop: 5,
    justifyContent: 'center',
    width: 120,
    height: 30,
    borderRadius: 5,
  },
  body: {
    flex: 1,
  },
});
