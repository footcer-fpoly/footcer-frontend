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
import TopTitle from '../components/TopTitle';
import Button from '../components/Button';
import styles from '../theme/StyleLogin-Regis';
import LoginMore from '../components/LoginMore';
import Dialog from "react-native-dialog";


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <TopTitle
                    title='Nhập số điện thoại'
                    sub1Title='Dùng số điện thoại để đăng ký hoặc'
                    sub2Title='đăng nhập' />
                <TextInput style={styles.input}
                    placeholder='Nhập số điện thoại'
                    placeholderTextColor='#778ca3'
                    keyboardType='phone-pad'
                    returnKeyType='go'
                    autoCorrect={false}
                />
                <Button text='Đăng nhập' />
                <LoginMore/>

            </ImageBackground>
        );
    }
}
