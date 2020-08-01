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
import LoginGg from '../components/SignInSignUp/LoginGg';
import DialogSendOTP from '../components/DialogSendOTP'

import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    Permissions,
    LoginButton, ShareDialog
} from 'react-native-fbsdk';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

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
            } else if(statusCode === 409) {
                this.toggleLoading();
                this._gotoLoginScreen(phone);
            }else {
                this.toggleLoading();
                alert ('Số điện thoại đã được đăng ký làm chủ sân')
            }
        } else {
            alert('SĐT không đúng định dạng');
        }
    }




    LoginFb = async () => {
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
                            }, async (error, result) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    const { id } = result;
                                    console.log(id)
                                    this.toggleLoading();
                                    const status = await checkUUID(id);
                                    console.log(status);
                                    if (status === 200) {
                                        this.toggleLoading();
                                        this.props.navigation.navigate('SignUpFbGgScreen', { data: result, flag: 0 })
                                    } else if (status === 409) {
                                        this.toggleLoading();
                                        this.props.navigation.navigate('Dashboard')
                                    }else {
                                        this.toggleLoading();
                                        alert('status: ', status);
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
    componentDidMount() {
        this.googleSignin();
    }
    googleSignin() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '574215655379-e3rdbh6ccmrkgchqfigqkk3s14npmo0f.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        });
    }
    LoginGg = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.user)
            const { id } = userInfo.user;
            console.log(id)
            this.toggleLoading();
            const status = await checkUUID(id);
            console.log('status:====', status);
            if (status === 200) {
                this.toggleLoading();
                this.props.navigation.navigate('SignUpFbGgScreen', { data: userInfo.user, flag: 1 })
            } else if (status === 409) {
                this.toggleLoading();
                this.props.navigation.navigate('Dashboard')
            } else {
                alert(statusCodes);
            }
            // this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
            console.log(error)
        }
    };
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
                <Button text='Tiếp theo' onPressBtn={() => this.checkPhoneNumber(phone)} />
                {/* <Button text='Tiếp theo' onPressBtn={() => this._gotoLoginScreen(phone)} /> */}
                <LoginMore />
                <LoginFb onPress={() => this.LoginFb()} />
                <LoginGg onPress={() => this.LoginGg()} />

            </ImageBackground>

        );
    }
}
