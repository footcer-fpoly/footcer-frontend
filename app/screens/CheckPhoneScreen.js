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
import Loading from '../components/Loading'
import DialogSendOTP from '../components/DialogSendOTP'

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

    toggleDialog = () => {
        const { dialogVisible } = this.state
        dialogVisible ? this.setState({ dialogVisible: false }) : this.setState({ dialogVisible: true })

    }
    toggleLoading = () => {
        const { flagLoading } = this.state
        flagLoading ? this.setState({ flagLoading: 0 }) : this.setState({ flagLoading: 1 })
    }
    _gotoOTPScreen = (phone) => {
        this.toggleDialog();
        this.props.navigation.navigate('OTPScreen', { phone: phone })
    }

    _gotoLoginScreen = (phone) => {
        this.props.navigation.navigate('LoginScreen', { phone: phone })
    }



    checkPhoneNumber = async (phone) => {
        if (validatePhoneNumber(phone)) {
            this.toggleLoading();
            const statusCode = await checkValidPhone(phone);
            if (statusCode === 200) {
                this.toggleLoading();
                this.toggleDialog()
            } else {
                this.toggleLoading();
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
                <DialogSendOTP
                    phone={phone}
                    visible={dialogVisible}
                    handleCancel={() => this.toggleDialog()}
                    handleNext={() => this._gotoOTPScreen(phone)}
                />
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
            </ImageBackground>

        );
    }
}
