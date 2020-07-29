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

import { signInPhone } from '../server/SignInSignUp/sever'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            flagLoading:0
        };
    }
    checkLogin = async (phone, pass) => {
        await this.setState({
            flagLoading:1
        })
        const status = await signInPhone(phone, pass);
        if (status === 200) {
            this._gotoHomeScreen();
            this.setState({
                flagLoading:0
            })
        } else {
            this.setState({
                flagLoading:0
            })
            alert('Sai mật khẩu')
        }
    }

    _gotoHomeScreen = () => {
        this.props.navigation.navigation('Dashboard');
    }
    onChangePass = pass => {
        this.setState({
            pass: pass
        })
    }

    render() {
        const { phone } = this.props.route.params;
        const { pass,flagLoading } = this.state;
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <Loading flag={flagLoading} />
                <TopTitle
                    title='Đăng nhập'
                    sub1Title={phone}
                    sub2Title='' />
                <TextInput style={styles.input}
                    placeholderTextColor='#778ca3'
                    placeholder='_ _ _ _ _ _'
                    keyboardType='numeric'
                    autoFocus={true}
                    returnKeyType='go'
                    onChangeText={this.onChangePass}
                    maxLength={6}
                    autoCorrect={false}
                />
                <Button text='Đăng nhập' onPressBtn={() => this.checkLogin(phone, pass)} />
            </ImageBackground>
        );
    }
}