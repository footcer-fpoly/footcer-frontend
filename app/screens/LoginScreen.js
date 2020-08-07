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
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import TopTitle from '../components/SignInSignUp/TopTitle';
import Button from '../components/SignInSignUp/Button';
import styles from '../theme/StyleLogin-Regis';
import Loading from '../components/Loading'
import DialogSendOTP from '../components/DialogSendOTP'

import { signInPhone } from '../server/SignInSignUp/sever'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            flagLoading: 0,
            dialogVisible: false,
        };
    }

    toggleDialog = () => {
        const { dialogVisible } = this.state
        dialogVisible ? this.setState({ dialogVisible: false }) : this.setState({ dialogVisible: true })

    }
    toggleLoading = () => {
        const { flagLoading } = this.state
        flagLoading ? this.setState({ flagLoading: 0 }) : this.setState({ flagLoading: 1 })
    }
    _gotoOTPScreen = (phone, data, flag) => {
        this.toggleDialog();
        this.props.navigation.navigate('OTPScreen', { phone: phone, data: data, flag: flag })
    }
    checkLogin = async (phone, pass) => {
        this.toggleLoading();
        const status = await signInPhone(phone, pass);
        if (status === 200) {
            this._gotoHomeScreen();
            await this.toggleLoading();
        } else {
            await this.toggleLoading();
            alert('Sai mật khẩu')
        }
    }

    forgetPass = () => {
        this.toggleDialog()
    }

    _gotoHomeScreen = () => {
        this.props.navigation.navigate('Dashboard');
    }
    onChangePass = pass => {
        this.setState({
            pass: pass
        })
    }

    render() {
        const { phone, data } = this.props.route.params;
        const { pass, flagLoading, dialogVisible } = this.state;
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <Loading flag={flagLoading} />
                <DialogSendOTP
                    phone={phone}
                    visible={dialogVisible}
                    handleCancel={() => this.toggleDialog()}
                    handleNext={() => this._gotoOTPScreen(phone, data, 2)}
                />
                <TopTitle
                    title='Đăng nhập'
                    sub1Title={phone}
                    sub2Title='' />
                <TextInput style={styles.input}
                    placeholderTextColor='#778ca3'
                    placeholder='Nhập mật khẩu'
                    keyboardType='numeric'
                    secureTextEntry={true}
                    autoFocus={true}
                    returnKeyType='go'
                    onChangeText={this.onChangePass}
                    maxLength={6}
                    autoCorrect={false}
                />
                <Button text='Đăng nhập' onPressBtn={() => this.checkLogin(phone, pass)} />
                <TouchableOpacity onPress={()=>this.toggleDialog()}>
                    <Text>quên mật khẩu</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}