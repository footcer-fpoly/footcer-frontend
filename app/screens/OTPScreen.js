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
import Loading from '../components/Loading'
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { signUpFbGg } from '../server/SignInSignUp/sever'



export default class OTPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationCode: '',
            timer: 10,
            disabledBtnReSend: true,
            visibleCountdown: 'flex',
            opacity: 0.7,
            confirmResult: null,
            flagLoading: 0,
        };
    }
    toggleLoading = () => {
        const { flagLoading } = this.state
        flagLoading ? this.setState({ flagLoading: 0 }) : this.setState({ flagLoading: 1 })
    }
    goToChangePhone = () => {
        this.props.navigation.replace('CheckPhoneScreen');
    }
    gotoDashboard = () => {
        this.props.navigation.replace('Dashboard');
    }
    gotoSignUpPhone = (phone) => {
        this.props.navigation.replace('SignUpPhoneScreen', { phone: phone })
    }
    handleVerifyCode = (confirmResult) => {
        const { phone, data, flag } = this.props.route.params;
        console.log(phone);
        console.log(data);
        console.log(flag);
        this.toggleLoading()
        const { verificationCode } = this.state
        if (verificationCode.length == 6) {
            confirmResult
                .confirm(verificationCode)
                .then(async () => {
                    await this._goToNext(flag, data, phone);
                    await this.toggleLoading();
                })
                .catch(error => {
                    this.toggleLoading();
                    alert(error.message)
                    return false
                })
        } else {
            this.toggleLoading();
            alert('Please enter a 6 digit OTP code.')
            return false
        }
    }

    countdownOverOTP = (phone) => {
        var { timer } = this.state
        this.sendOTP(phone)
        this.setState({
            opacity: 0.7,
            disabledBtnReSend: true,
            visibleCountdown: 'flex',
        })
        const countdown = setInterval(() => {
            this.setState({ timer: --timer })
            if (timer === 0) {
                clearInterval(countdown)
                this.setState({
                    disabledBtnReSend: false,
                    visibleCountdown: 'none',
                    opacity: 1,
                    timer: 10,
                })
            }
        }, 1000)
    }

    sendOTP = (phone) => {
        const phone84 = '+84' + phone;
        try {
            firebase
                .auth()
                .signInWithPhoneNumber(phone84)
                .then(confirmResult => {
                    this.setState({ confirmResult })
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (err) {
            console.log(err)
        }
    }
    _goToNext = async (flag, data, phone) => {
        console.log(phone);
        console.log(data);
        console.log(flag);
        if (flag === 0) {
            const statusCode = await signUpFbGg(phone, data.picture.data.url, data.email, data.name, data.id);
            if (statusCode === 200) {
                this.gotoDashboard();
                alert('Vừa Sign Up Fb')
            } else {
                alert(statusCode);
            }
        } else if (flag === 1) {
            const statusCode = await signUpFbGg(phone, data.photo, data.email, data.name, data.id);
            console.log(statusCode);
            if (statusCode === 200) {
                this.gotoDashboard();
                alert('Vừa Sign Up GG')
            } else {
                alert(statusCode);
            }
        } else {
            this.gotoSignUpPhone(phone)
        }
    }

    componentDidMount() {
        const { phone } = this.props.route.params;
        this.countdownOverOTP(phone)
    }

    render() {
        const { phone } = this.props.route.params;
        const { confirmResult, opacity, timer, visibleCountdown, disabledBtnReSend } = this.state
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <Loading flag={this.state.flagLoading} />
                <TopTitle
                    title='Xác thực OTP'
                    sub1Title='Một mã xác thực đã được gữi đến'
                    sub2Title={phone} />
                <TextInput style={styles.input}
                    placeholder='Mã xác thực'
                    placeholderTextColor='#778ca3'
                    keyboardType='numeric'
                    returnKeyType='go'
                    maxLength={6}
                    onChangeText={verificationCode => {
                        this.setState({ verificationCode })
                    }}
                    autoCorrect={false}
                />
                <Button text='Tiếp tục' onPressBtn={() => this.handleVerifyCode(confirmResult)} />
                <View style={styles.warpperResendAndChange}>
                    <TouchableOpacity onPress={() => this.goToChangePhone()}><Text style={styles.txtResendAndChange}>ĐỔI SĐT</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.countdownOverOTP(phone)}
                        disabled={disabledBtnReSend} style={{ flexDirection: 'row', opacity: opacity }}  >
                        <Text style={styles.txtResendAndChange}>
                            GỬI LẠI OTP
                    </Text>
                        <Text style={[styles.txtResendAndChange, { display: visibleCountdown }]}>
                            ({timer}s)</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        );
    }
}
