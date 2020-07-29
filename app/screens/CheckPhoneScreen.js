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
import Loading from '../components/Loading'

import { validatePhoneNumber, checkValidPhone } from '../server/SignInSignUp/sever'
export default class CheckPhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            phone: '',
            confirmResult: null,
            flagLoading: 0
        };
    }
    onChangePhone = phone => {
        this.setState({
            phone
        })
    }

    showDialogSendOTP = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    _gotoLoginScreen = (phone) => {
        this.props.navigation.navigate('LoginScreen', { phone: phone })
    }

    _gotoOTPScreen = (phone) => {
        this.handleCancel();
        this.props.navigation.replace('OTPScreen', { phone: phone })
    }

    checkPhoneNumber = async (phone) => {
        if (validatePhoneNumber(phone)) {
            await this.setState({
                flagLoading:1
            })
            const statusCode = await checkValidPhone(phone);
            if (statusCode === 200) {
                this.setState({
                    flagLoading:0
                })
                this.showDialogSendOTP();
            } else {
                this.setState({
                    flagLoading:0
                })
                this._gotoLoginScreen(phone);
            }
        } else {
            alert('SĐT không đúng định dạng');
        }
    }
    render() {
        const { phone, dialogVisible } = this.state;
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <Loading flag={this.state.flagLoading} />
                <TopTitle
                    title='Nhập số điện thoại'
                    sub1Title='Dùng số điện thoại để đăng ký hoặc'
                    sub2Title='đăng nhập' />

                <TextInput style={styles.input}
                    placeholderTextColor='#778ca3'
                    placeholder='Nhập số điện thoại'
                    keyboardType='phone-pad'
                    returnKeyType='go'
                    onChangeText={this.onChangePhone}
                    maxLength={10}
                    autoCorrect={false}
                />
                <Button text='Tiếp theo' onPressBtn={() => this.checkPhoneNumber(phone)} />
                <LoginMore />

                <Dialog.Container visible={dialogVisible}>
                    <Text>Đăng ký tài khoản</Text>
                    <Text>
                        Chúng tôi sẽ gữi một mã xác thực đến số {phone}. Bạn có muốn tiếp tục?
                    </Text>
                    <Dialog.Button label="Đổi SĐT" onPress={this.handleCancel} />
                    <Dialog.Button label="Tiếp tục" onPress={() => this._gotoOTPScreen(phone)} />
                </Dialog.Container>



            </ImageBackground>

        );
    }
}
