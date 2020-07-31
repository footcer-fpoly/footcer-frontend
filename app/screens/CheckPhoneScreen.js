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
    Image
} from 'react-native';
import TopTitle from '../components/SignInSignUp/TopTitle';
import Button from '../components/SignInSignUp/Button';
import styles from '../theme/StyleLogin-Regis';
import LoginMore from '../components/SignInSignUp/LoginMore';
import Loading from '../components/Loading'
import LoginFb from '../components/SignInSignUp/LoginFb';
import DialogSendOTP from '../components/DialogSendOTP'

import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    Permissions,
    LoginButton, ShareDialog
} from 'react-native-fbsdk';

import { validatePhoneNumber, checkValidPhone, checkUUID } from '../server/SignInSignUp/sever'

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
    _gotoSignUpFbGg = () => {
        this.props.navigation.navigate('SignUpFbGgScreen')
    }
    _gotoDashboard = () => {
        this.props.navigation.navigate('Dashboard')
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

    async LoginFb() {
        try {
            LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const accessToken = data.accessToken;
                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log(error);
                                console.log('Error fetching data=', error.toString());
                                return false;
                            } else {
                                console.log('Success fetching data=', result.toString());
                            }
                        };
                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken,
                                parameters: {
                                    fields: {
                                        string: 'id,email,name,picture.height(10000)',
                                    },
                                },
                            }, (error, result) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    const { id } = result;
                                    const status = checkUUID(id);
                                    if (status === 200) {
                                        this.props.navigation.navigate('SignUpFbGgScreen', { data: result })
                                    } else {
                                        this.props.navigation.navigate('Dashboard')
                                    }
                                }
                                responseInfoCallback
                            }
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                    });
                }
            });
        } catch (error) {
            alert('Login failed: ' + error)
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
                {/* <Button text='Tiếp theo' onPressBtn={() => this.checkPhoneNumber(phone)} /> */}
                <Button text='Tiếp theo' onPressBtn={() => this._gotoLoginScreen(phone)} />
                <LoginMore />
                <LoginFb onPress={() => this.LoginFb()} />
            </ImageBackground>

        );
    }
}
