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
import Loading from '../components/Loading'
import { signUpPhone, checkValidEmail } from '../server/SignInSignUp/sever'

export default class SignUpPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            displayName: '',
            email: '',
            password: '',
            rePassword: '',
            checkEmail: 0,
            statusEmail: 0,
            flagLoading: 0
        };
    }
    onChangeTxtName = displayName => {
        this.setState({
            displayName
        })
    }
    onChangeTxtEmail = email => {
        this.setState({
            email
        })
    }
    onChangeTxtPass = password => {
        this.setState({
            password
        })
    }
    onChangeTxtRePass = rePassword => {
        this.setState({
            rePassword
        })
    }
    toggleLoading = () => {
        const { flagLoading } = this.state
        flagLoading ? this.setState({ flagLoading: 0 }) : this.setState({ flagLoading: 1 })
    }

    checkValidForm = () => {
        const { displayName, email, password, rePassword } = this.state;
        if (displayName === '' || email === '' || password === '', rePassword === '') {
            alert('Hãy nhập đầy đủ các form')
            return false;
        } else {
            if (password != rePassword || password.length < 6) {
                alert('Mật khẩu không trùng nhau')
                return false
            } else return true
        }
    }
    signUp = async (phone, password, email, displayName) => {
        if (this.checkValidForm()) {
            this.toggleLoading();
            const statusEmail = await checkValidEmail(email);
            if (statusEmail === 200) {
                const statusSignUp = await signUpPhone(phone, password, email, displayName);
                if (statusSignUp === 200) {
                    this.toggleLoading();
                    this.props.navigation.navigate('Dashboard');
                } else {
                    this.toggleLoading();
                    alert('Đăng kí thất bại')
                }
            } else {
                this.toggleLoading();
                alert('Email đã được đăng kí')
            }
        } else {
            this.toggleLoading();
        }
    }

    render() {
        const { phone } = this.props.route.params;
        const { email, password, displayName, flagLoading } = this.state
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <Loading flag={flagLoading} />
                <TopTitle
                    title='Cập nhật thông tin'
                    sub1Title='Cập nhật thông tin cá nhân và'
                    sub2Title='mật khẩu' />
                <TextInput style={styles.input}
                    placeholder='Nhập họ và tên'
                    placeholderTextColor='#778ca3'
                    keyboardType='default'
                    onChangeText={this.onChangeTxtName}
                    returnKeyType='next'
                    autoCorrect={false}
                />
                <TextInput style={styles.input}
                    placeholder='Nhập email'
                    placeholderTextColor='#778ca3'
                    keyboardType='email-address'
                    onChangeText={this.onChangeTxtEmail}
                    returnKeyType='next'
                    autoCorrect={false}
                />
                <TextInput style={styles.input}
                    placeholder='Nhập mật khẩu'
                    placeholderTextColor='#778ca3'
                    onChangeText={this.onChangeTxtPass}
                    keyboardType='numeric'
                    returnKeyType='next'
                    maxLength={6}
                    autoCorrect={false}
                />
                <TextInput style={styles.input}
                    placeholder='Nhập lại mật khẩu'
                    placeholderTextColor='#778ca3'
                    onChangeText={this.onChangeTxtRePass}
                    keyboardType='numeric'
                    maxLength={6}
                    autoCorrect={false}
                />
                <Button text='Tiếp tục' onPressBtn={() => this.signUp(phone, password, email, displayName)} />
            </ImageBackground>


        );
    }
}
