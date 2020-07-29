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
import TopTitle from '../components/SignInSignUp/TopTitle';
import Button from '../components/SignInSignUp/Button';
import styles from '../theme/StyleLogin-Regis';
import LoginMore from '../components/SignInSignUp/LoginMore';
import firebase from '@react-native-firebase/app';



export default class OTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCode: '',
        };
    }
    handleVerifyCode = () => {
        // Request for OTP verification
        const { confirmResult } = this.props.route.params;
        console.log(confirmResult);
        const { verificationCode } = this.state
        if (verificationCode.length == 6) {
            confirmResult
                .confirm(verificationCode)
                .then(() => {
                    alert('done!')
                    this.props.navigation.navigate('SignUpPhoneScreen')
                })
                .catch(error => {
                    alert(error.message)
                    console.log(error)
                })
        } else {
            alert('Please enter a 6 digit OTP code.')
        }
    }

    render() {
        const { phone } = this.props.route.params;
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <TopTitle
                    title='Xác thực OTP'
                    sub1Title='Một mã xác thực đã được gữi đến'
                    sub2Title={phone} />
                <TextInput style={styles.input}
                    placeholder='Mã xác thực'
                    placeholderTextColor='#778ca3'
                    keyboardType='phone-pad'
                    returnKeyType='go'
                    onChangeText={verificationCode => {
                        this.setState({ verificationCode })
                    }}
                    autoCorrect={false}
                />
                <Button text='Tiếp tục' onPressBtn={() => this.handleVerifyCode()} />
                <View style={styles.warpperResendAndChange}>
                    <TouchableOpacity ><Text style={styles.txtResendAndChange}>GỬI LẠI OTP</Text></TouchableOpacity>
                    <TouchableOpacity ><Text style={styles.txtResendAndChange}>ĐỔI SĐT</Text></TouchableOpacity>
                </View>
                <LoginMore />
            </ImageBackground>
        );
    }
}
