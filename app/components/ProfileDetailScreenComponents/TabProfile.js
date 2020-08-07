import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import ModalLevel from './ModalLevel';
import ModalPosition from './ModalPosition';
export default class TabProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisiblePosition: false,
      modalVisibleLevel: false,
    };
  }
  _showDialogPosition = () => {
    this.setState({modalVisiblePosition: true});
  };
  _hideDialogPosition = () => {
    this.setState({modalVisiblePosition: false});
  };
  _showDialogLevel = () => {
    this.setState({modalVisibleLevel: true});
  };
  _hideDialogLevel = () => {
    this.setState({modalVisibleLevel: false});
  };
  render() {
    const phone = '0789301100';
    const birthday = '30/2/2000';
    return (
      <View style={{flex: 1, backgroundColor: '#EDEDED'}}>
        <Modal
          isVisible={this.state.modalVisiblePosition}
          onBackdropPress={this._hideDialogPosition}>
          <ModalPosition />
        </Modal>
        <Modal
          isVisible={this.state.modalVisibleLevel}
          onBackdropPress={this._hideDialogLevel}>
          <ModalLevel />
        </Modal>
        <View style={{margin: 15}}>
          <View
            style={{padding: 15, backgroundColor: '#fff', borderRadius: 10}}>
            <Text style={{color: '#000', fontSize: 15}}>Thông tin</Text>
            <View style={styles.item}>
              <Text style={{fontSize: 14, color: '#676767'}}>Ngày sinh</Text>
              <Text style={{fontSize: 14}}>{birthday}</Text>
            </View>
            <View style={styles.item}>
              <Text style={{fontSize: 14, color: '#676767'}}>
                {' '}
                Số điện thoại
              </Text>
              <Text style={{fontSize: 14}}>{phone}</Text>
            </View>
            <View style={styles.item}>
              <Text style={{fontSize: 14, color: '#676767'}}>Vị trí</Text>
              <TouchableOpacity
                onPress={() => {
                  this._showDialogPosition();
                }}>
                <Text style={{fontSize: 14}}>Chưa cập nhật</Text>
              </TouchableOpacity>
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
                <Text style={{color: '#fff', fontSize: 16}}>Cập Nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View />
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
  txtPosition: {
    fontSize: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#707070',
    padding: 15,
  },
});
