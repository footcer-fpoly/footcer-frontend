import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import TopTitle from '../components/SignInSignUp/TopTitle';
import Button from '../components/SignInSignUp/Button';
import styles from '../theme/StyleLogin-Regis';
import LoginMore from '../components/SignInSignUp/LoginMore';
import Dialog from "react-native-dialog";
import firebase from '@react-native-firebase/app';
export default class CheckPhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            phone: '',
            confirmResult: null
        };
    }
    showDialogSendOTP = () => {
        this.setState({ dialogVisible: true });
    };
    onChangePhone = phone => {
        this.setState({
            phone: phone
        })
    }
    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        console.log(this.state.phone)
        return regexp.test(this.state.phone)
    }

    handleSendCodeRegister = (phone) => {
        console.log(phone)
        // Request to send OTP
        if (this.validatePhoneNumber()) {
            firebase
                .auth()
                .signInWithPhoneNumber(this.state.phone)
                .then(confirmResult => {
                    this.setState({ confirmResult })
                    this.props.navigation.navigate('OTPScreen', { phone: phone, confirmResult: this.state.confirmResult })
                    // this.setState({ dialogVisible: false });
                    alert('Phone Number')
                })
                .catch(error => {
                    alert(error.message)

                    console.log(error)
                })
        } else {
            // alert('Invalid Phone Number')
            this.setState({
                dialogVisible: true
            })
        }
    }
    dialog() {

    }
    render() {
        const { phone } = this.state;
        return (
          <ImageBackground
            source={require('../assets/images/bg.png')}
            style={styles.container}>
            <TopTitle
              title="Nhập số điện thoại"
              sub1Title="Dùng số điện thoại để đăng ký hoặc"
              sub2Title="đăng nhập"
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#778ca3"
              keyboardType="phone-pad"
              returnKeyType="go"
              onChangeText={this.onChangePhone}
              maxLength={15}
              autoCorrect={false}
            />
            <Button
              text="Đăng nhập"
              onPressBtn={() => this.props.navigation.navigate("Dashboard") }
            //   this.handleSendCodeRegister(phone)
            />
            <LoginMore />
            <Dialog.Container visible={this.state.dialogVisible}>
                <Text>Đăng ký tài khoản</Text>
                <Text>
                  Chúng tôi sẽ gữi một mã xác thực đến số {phone}. Bạn
                  có muốn tiếp tục?
                </Text>
              <Dialog.Button
                label="Đổi SĐT"
                onPress={this.handleCancel}
              />
              <Dialog.Button
                label="Tiếp tục"
                onPress={() => this.handleSendCodeRegister(phone)}
              />
            </Dialog.Container>

            {/* <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Lỗi</Dialog.Title>
                    <Dialog.Description>
                        Hãy nhập số điện thoại trước khi đăng nhập.
                                </Dialog.Description>
                    <Dialog.Button label="Đã hiểu" onPress={this.handleCancel} />
                </Dialog.Container> */}
          </ImageBackground>
        );
    }
}
