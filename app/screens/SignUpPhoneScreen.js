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
import styles from '../theme/StylesAuth';
import Loading from '../components/Loading'
import { signUpPhone } from '../server/SignInSignUp/sever'

export default class SignUpPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            displayName: '',
            password: '',
            rePassword: '',
            flagLoading: 0
        };
    }
    onChangeTxtName = displayName => {
        this.setState({
            displayName
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
        const { displayName, password, rePassword } = this.state;
        if (displayName === '' || password === '', rePassword === '') {
            alert('Hãy nhập đầy đủ các form')
            return false;
        } else {
            if (password.length < 6) {
                alert('Mật khẩu gồm 6 số')
                return false
            } else if (password !== rePassword) {
                alert('Mật khẩu không trùng khớp')
                return false
            } else return true
        }
    }
    signUp = async (phone, password, displayName) => {
        if (this.checkValidForm()) {
            this.toggleLoading();
            const statusSignUp = await signUpPhone(phone, password, displayName);
            if (statusSignUp === 200) {
                this.toggleLoading();
                this.props.navigation.navigate('Dashboard');
            } else {
                this.toggleLoading();
                alert('Đăng kí thất bại')
            }
        }
    }

    render() {
        const { phone } = this.props.route.params;
        const { password, displayName, flagLoading } = this.state
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
                    placeholder='Nhập mật khẩu'
                    placeholderTextColor='#778ca3'
                    onChangeText={this.onChangeTxtPass}
                    secureTextEntry={true}
                    returnKeyType='next'
                    keyboardType='numeric'
                    type='password'
                    maxLength={6}
                    autoCorrect={false}
                />
                <TextInput style={styles.input}
                    placeholder='Nhập lại mật khẩu'
                    placeholderTextColor='#778ca3'
                    onChangeText={this.onChangeTxtRePass}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    returnKeyType='go'
                    maxLength={6}
                    autoCorrect={false}
                />
                <Button text='Tiếp tục' onPressBtn={() => this.signUp(phone, password, displayName)} />
            </ImageBackground>
        );
    }
}
