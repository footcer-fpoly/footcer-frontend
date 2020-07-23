import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Member from './Member';
import ModalLevel from './ModalLevel';
import ModalAddMember from './ModalAddMember';

export default class TabProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibleAddMember: false,
      modalVisibleLevel: false,
    };
  }
  _showDialogAddMember = () => {
    this.setState({modalVisibleAddMember: true});
  };
  _hideDialogAddMember = () => {
    this.setState({modalVisibleAddMember: false});
  };
  _showDialogLevel = () => {
    this.setState({modalVisibleLevel: true});
  };
  _hideDialogLevel = () => {
    this.setState({modalVisibleLevel: false});
  };
  render() {
    const phone = '0789301100';
    const nameTeam = 'Fpoly HCM';
    return (
      <View style={{flex: 1, backgroundColor: '#EDEDED'}}>
        <ScrollView>
          <Modal
            isVisible={this.state.modalVisibleAddMember}
            onBackdropPress={this._hideDialogAddMember}>
            <ModalAddMember />
          </Modal>
          <Modal
            isVisible={this.state.modalVisibleLevel}
            onBackdropPress={this._hideDialogLevel}>
            <ModalLevel />
          </Modal>
          <View style={styles.item}>
            <View style={styles.topItem}>
              <Text style={{fontSize: 18, color: '#676767'}}>Thành viên</Text>
              <Text style={{fontSize: 18, marginLeft: -80}}>1</Text>
              <TouchableOpacity
                onPress={() => {
                  this._showDialogAddMember();
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    backgroundColor: '#0AB134',
                    padding: 10,
                    borderRadius: 5,
                    color: '#fff',
                  }}>
                  Thêm thành viên
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}>
              {[
                {
                  urlImgAvatar:
                    'https://nguoinoitieng.tv/images/nnt/96/0/bbcu.jpg',
                  name: 'Huỳnh Bình',
                },
                {
                  urlImgAvatar:
                    'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/99138497_2590351154572109_7512864550597689344_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=b6MnE2cwBrUAX_jkIId&_nc_ht=scontent.fsgn5-4.fna&oh=7199aec63fa5f92293d68c09eb63dc22&oe=5F332A48',
                  name: 'Huỳnh Bình',
                },
                {
                  urlImgAvatar:
                    'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/99138497_2590351154572109_7512864550597689344_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=b6MnE2cwBrUAX_jkIId&_nc_ht=scontent.fsgn5-4.fna&oh=7199aec63fa5f92293d68c09eb63dc22&oe=5F332A48',
                  name: 'Huỳnh Bình',
                },
                {
                  urlImgAvatar:
                    'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/99138497_2590351154572109_7512864550597689344_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=b6MnE2cwBrUAX_jkIId&_nc_ht=scontent.fsgn5-4.fna&oh=7199aec63fa5f92293d68c09eb63dc22&oe=5F332A48',
                  name: 'Huỳnh Bình',
                },
                {
                  urlImgAvatar:
                    'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/99138497_2590351154572109_7512864550597689344_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=b6MnE2cwBrUAX_jkIId&_nc_ht=scontent.fsgn5-4.fna&oh=7199aec63fa5f92293d68c09eb63dc22&oe=5F332A48',
                  name: 'Huỳnh Bình',
                },
              ].map((e, index) => (
                <View key={index.toString()}>
                  <Member urlImgAvatar={e.urlImgAvatar} name={e.name} />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{margin: 15}}>
            <View
              style={{
                paddingHorizontal: 15,
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingVertical: 5,
              }}>
              <View style={styles.item2}>
                <Text style={{fontSize: 14, color: '#676767'}}>
                  Tên đội bóng
                </Text>
                <Text style={{fontSize: 14}}>{nameTeam}</Text>
              </View>
              <View style={styles.item2}>
                <Text style={{fontSize: 14, color: '#676767'}}>Đội trưởng</Text>
                <Text style={{fontSize: 14}}>Huỳnh Bình</Text>
              </View>
              <View style={styles.item2}>
                <Text style={{fontSize: 14, color: '#676767'}}>
                  Số điện thoại
                </Text>
                <Text style={{fontSize: 14}}>{phone}</Text>
              </View>
              <View style={styles.lastItem}>
                <Text style={{fontSize: 14, color: '#676767'}}>Trình độ</Text>
                <TouchableOpacity
                  onPress={() => {
                    this._showDialogLevel();
                  }}>
                  <Text style={{fontSize: 14}}>Chưa cập nhật</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  marginTop: 15,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity style={styles.btnDelete}>
                  <Text style={{color: '#fff', fontSize: 16}}>Xoá đội</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnUpdate}>
                  <Text style={{color: '#fff', fontSize: 16}}>Cập Nhật</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070',
    paddingVertical: 15,
  },
  lastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  item: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnUpdate: {
    backgroundColor: '#0AB134',
    alignItems: 'center',
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    width: '49%',
  },
  btnDelete: {
    backgroundColor: '#FF0000',
    alignItems: 'center',
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    width: '49%',
  },
  txt: {
    fontSize: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#707070',
    padding: 15,
  },
});
