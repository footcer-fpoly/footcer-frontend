import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Dialog from 'react-native-dialog';

export default class DialogSendOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {
    const {phone, handleCancel, handleNext, visible} = this.props;
    return (
      <Dialog.Container visible={visible}>
        <Text>Đăng ký tài khoản</Text>
        <Text>
          Chúng tôi sẽ gữi một mã xác thực đến số {phone}. Bạn có muốn tiếp tục?
        </Text>
        <Dialog.Button label="Đổi SĐT" onPress={handleCancel} />
        <Dialog.Button label="Tiếp tục" onPress={handleNext} />
      </Dialog.Container>
    );
  }
}
