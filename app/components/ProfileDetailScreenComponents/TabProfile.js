import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

export default class TabProfile extends React.Component {
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

export class ModalPosition extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#FFF', borderRadius: 10, flex: 0.5}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}>
          <View />
          <Text style={{fontSize: 20}}>Chọn vị trí</Text>
          <Icon
            name={'close'}
            size={20}
            color="#fff"
            style={{
              backgroundColor: 'red',
              borderRadius: 10,
            }}
            onPress={() => {
              this._hideDialogPosition;
            }}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Thủ môn</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Hậu vệ</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Tiền vệ</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Tiền đạo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class ModalLevel extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#FFF', borderRadius: 10, flex: 0.5}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}>
          <View />
          <Text style={{fontSize: 20}}>Trình độ cầu thủ</Text>
          <Icon
            name={'close'}
            size={20}
            color="#fff"
            style={{
              backgroundColor: 'red',
              borderRadius: 10,
            }}
            onPress={() => {
              this._hideDialogPosition;
            }}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Nghiệp dư</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Bán chuyên</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.txtPosition}>Chuyên nghiệp</Text>
          </TouchableOpacity>
        </View>
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
