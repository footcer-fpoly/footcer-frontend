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


export default class SignUpPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
                <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>

                    <TopTitle
                        title='Cập nhật thông tin'
                        sub1Title='Cập nhật thông tin cá nhân và'
                        sub2Title='mật khẩu' />
                    <TextInput style={styles.input}
                        placeholder='Nhập họ và tên'
                        placeholderTextColor='#778ca3'
                        keyboardType='default'
                        returnKeyType='next'
                        autoCorrect={false}
                    />
                    <TextInput style={styles.input}
                        placeholder='Nhập email'
                        placeholderTextColor='#778ca3'
                        keyboardType='email-address'
                        returnKeyType='next'
                        autoCorrect={false}
                    />
                    <TextInput style={styles.input}
                        placeholder='Nhập mật khẩu'
                        placeholderTextColor='#778ca3'
                        keyboardType='default'
                        returnKeyType='next'
                        autoCorrect={false}
                    />
                    <TextInput style={styles.input}
                        placeholder='Nhập lại mật khẩu'
                        placeholderTextColor='#778ca3'
                        keyboardType='default'
                        returnKeyType='go'
                        autoCorrect={false}
                    />

                    <Button text='Tiếp tục' />
                </ImageBackground>

        );
    }
}
