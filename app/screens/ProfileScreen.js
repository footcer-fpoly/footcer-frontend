import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ItemProfile from '../components/ProfileScreenComponents/ItemProfile';

export default class ProfileSreen extends Component {
  render() {
    const {nameUser} = this.props;
    const urlImgAvatar =
      'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/99138497_2590351154572109_7512864550597689344_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=b6MnE2cwBrUAX_jkIId&_nc_ht=scontent.fsgn5-4.fna&oh=7199aec63fa5f92293d68c09eb63dc22&oe=5F332A48';
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.imgAvatarContainer}>
              <Image style={styles.imgAvatar} source={{uri: urlImgAvatar}} />
            </View>
            <View style={{paddingHorizontal: 15}}>
              <Text style={{color: '#fff', fontSize: 18}}>
                {nameUser}Huỳnh Xuân Bình
              </Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', fontSize: 14}}>
                    Chỉnh sửa tài khoản
                  </Text>
                  <Icon
                    style={{marginLeft: 5, color: '#fff'}}
                    name="chevron-right"
                    size={10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
            {[
              {
                name: 'search',
                title: 'Tìm kiếm đội bóng',
              },
              {
                name: 'users',
                title: 'Tạo đội bóng',
              },
              {
                name: 'share-alt',
                title: 'Mời bạn bè sử dụng app',
              },
              {
                name: 'cog',
                title: 'Thiết lập ứng dụng',
              },
              {
                name: 'sign-out-alt',
                title: 'Đăng xuất',
              },
              {
                name: 'qrcode',
                title: 'Quét QR Code',
              },
            ].map((e, index) => (
              <View key={index.toString()}>
                <ItemProfile name={e.name} title={e.title} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#0AB134',
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  imgAvatarContainer: {
    height: 95,
    width: 95,
    borderRadius: 95 / 2,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgAvatar: {
    height: 85,
    width: 85,
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: 'white',
  },
});
