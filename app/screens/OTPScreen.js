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
    TouchableHighlight
} from 'react-native';
import TopTitle from '../components/TopTitle';
import Button from '../components/Button';
import styles from '../theme/StyleLogin-Regis';
import LoginMore from '../components/LoginMore';
// import Dialog from "react-native-dialog";


export default class OTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <TopTitle
                    title='Xác thực OTP'
                    sub1Title='Một mã xác thực đã được gữi đến'
                    sub2Title='0903585173' />
                <TextInput style={styles.input}
                    placeholder='Mã xác thực'
                    placeholderTextColor='#778ca3'
                    keyboardType='phone-pad'
                    returnKeyType='go'
                    autoCorrect={false}
                />
                <Button text='Tiếp tục' />
                <View style={styles.warpperResendAndChange}>
                    <TouchableOpacity ><Text style={styles.txtResendAndChange}>GỬI LẠI OTP</Text></TouchableOpacity>
                    <TouchableOpacity ><Text style={styles.txtResendAndChange}>ĐỔI SĐT</Text></TouchableOpacity>
                </View>
                <LoginMore/>
            </ImageBackground>
        );
    }
}
