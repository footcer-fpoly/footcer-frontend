// import React, { Component } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ImageBackground,
//     TouchableOpacity,
//     TextInput,
//     KeyboardAvoidingView,
//     Keyboard,
//     TouchableWithoutFeedback,
//     Image
// } from 'react-native';
// import TopTitle from '../components/SignInSignUp/TopTitle';
// import Button from '../components/SignInSignUp/Button';
// import styles from '../theme/StyleLogin-Regis';
// import LoginMore from '../components/SignInSignUp/LoginMore';
// import Loading from '../components/Loading'
// import LoginFb from '../components/SignInSignUp/LoginFb';
// import LoginGg from '../components/SignInSignUp/LoginGg';
// import DialogSendOTP from '../components/DialogSendOTP'

// import {
//     LoginManager,
//     AccessToken,
//     GraphRequest,
//     GraphRequestManager,
//     Permissions,
//     LoginButton, ShareDialog
// } from 'react-native-fbsdk';

// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from '@react-native-community/google-signin';

// import { validatePhoneNumber, checkValidPhone, checkUUID } from '../server/SignInSignUp/sever'

// export default class CheckPhoneScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dialogVisible: false,
//             phone: '',
//             confirmResult: null,
//             flagLoading: 0,
//             flag: null,
//             data: null
//         };
//     }
//     onChangePhone = phone => {
//         this.setState({
//             phone
//         })
//     }

//     toggleDialog = () => {
//         const { dialogVisible } = this.state
//         dialogVisible ? this.setState({ dialogVisible: false }) : this.setState({ dialogVisible: true })

//     }
//     toggleLoading = () => {
//         const { flagLoading } = this.state
//         flagLoading ? this.setState({ flagLoading: 0 }) : this.setState({ flagLoading: 1 })
//     }
//     _gotoOTPScreen = (phone, data, flag) => {
//         this.toggleDialog();
//         this.props.navigation.navigate('OTPScreen', { phone: phone, data: data, flag: flag })
//     }

//     _gotoLoginScreen = (phone, data) => {
//         this.props.navigation.navigate('LoginScreen', { phone: phone, data: data })
//     }
//     _gotoSignUpFbGg = () => {
//         this.props.navigation.navigate('SignUpFbGgScreen')
//     }
//     _gotoDashboard = () => {
//         this.props.navigation.navigate('Dashboard')
//     }



//     checkPhoneNumber = async (phone) => {
//         if (validatePhoneNumber(phone)) {
//             try {
//                 this.toggleLoading();
//                 const resPhone = await checkValidPhone(phone);
//                 this.setState({
//                     data: resPhone.data
//                 })
//                 if (resPhone.code === 200) {
//                     this.toggleLoading();
//                     this.toggleDialog()
//                 } else if (resPhone.code === 409) {
//                     if (resPhone.data.password === "") {
//                         this.toggleLoading();
//                         this.toggleDialog()
//                         this.setState({
//                             flag: 2
//                         })
//                     } else {
//                         this.toggleLoading();
//                         this._gotoLoginScreen(phone, resPhone.data);
//                     }
//                 } else {
//                     this.toggleLoading();
//                     alert('Số điện thoại đã được đăng ký làm chủ sân')
//                 }
//             } catch (error) {
//                 alert(error)
//             }
//         } else {
//             alert('SĐT không đúng định dạng');
//         }
//     }




//     LoginFb = async () => {
//         try {
//             LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
//                 if (result.isCancelled) {
//                     console.log('Login cancelled');
//                 } else {
//                     AccessToken.getCurrentAccessToken().then((data) => {
//                         const accessToken = data.accessToken;
//                         const responseInfoCallback = (error, result) => {
//                             if (error) {
//                                 console.log(error);
//                                 console.log('Error fetching data=', error.toString());
//                                 return false;
//                             } else {
//                                 console.log('Success fetching data=', result.toString());
//                             }
//                         };
//                         const infoRequest = new GraphRequest(
//                             '/me',
//                             {
//                                 accessToken,
//                                 parameters: {
//                                     fields: {
//                                         string: 'id,email,name,picture.height(10000)',
//                                     },
//                                 },
//                             }, async (error, result) => {
//                                 if (error) {
//                                     console.log(error);
//                                 } else {
//                                     const { id } = result;
//                                     console.log(id)
//                                     this.toggleLoading();
//                                     const status = await checkUUID(id);
//                                     console.log(status);
//                                     if (status === 200) {
//                                         this.toggleLoading();
//                                         this.props.navigation.navigate('SignUpFbGgScreen', { data: result, flag: 0 })
//                                     } else if (status === 409) {
//                                         this.toggleLoading();
//                                         this.props.navigation.navigate('Dashboard')
//                                     } else {
//                                         this.toggleLoading();
//                                         alert('status: ', status);
//                                     }
//                                 }
//                                 responseInfoCallback
//                             }
//                         );
//                         new GraphRequestManager().addRequest(infoRequest).start();
//                     });
//                 }
//             });
//         } catch (error) {
//             alert('Login failed: ' + error)
//         }
//     }
//     componentDidMount() {
//         this.googleSignin();
//     }
//     googleSignin() {
//         GoogleSignin.configure({
//             scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//             webClientId: '574215655379-e3rdbh6ccmrkgchqfigqkk3s14npmo0f.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//             offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//             forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//         });
//     }
//     LoginGg = async () => {
//         try {
//             await GoogleSignin.hasPlayServices();
//             const userInfo = await GoogleSignin.signIn();
//             console.log(userInfo.user)
//             const { id } = userInfo.user;
//             console.log(id)
//             this.toggleLoading();
//             const status = await checkUUID(id);
//             console.log('status:====', status);
//             if (status === 200) {
//                 this.toggleLoading();
//                 this.props.navigation.navigate('SignUpFbGgScreen', { data: userInfo.user, flag: 1 })
//             } else if (status === 409) {
//                 this.toggleLoading();
//                 this.props.navigation.navigate('Dashboard')
//             } else {
//                 alert(statusCodes);
//             }
//             // this.setState({ userInfo });
//         } catch (error) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                 // user cancelled the login flow
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 // operation (e.g. sign in) is in progress already
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                 // play services not available or outdated
//             } else {
//                 // some other error happened
//             }
//             console.log(error)
//         }
//     };
//     render() {
//         const { phone, dialogVisible, flag, data } = this.state;
//         return (
//             <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
//                 <Loading flag={this.state.flagLoading} />
//                 <DialogSendOTP
//                     phone={phone}
//                     visible={dialogVisible}
//                     handleCancel={() => this.toggleDialog()}
//                     handleNext={() => this._gotoOTPScreen(phone, data, flag)}
//                 />
//                 <TopTitle
//                     title='Nhập số điện thoại'
//                     sub1Title='Dùng số điện thoại để đăng ký hoặc'
//                     sub2Title='đăng nhập' />

//                 <TextInput style={styles.input}
//                     placeholderTextColor='#778ca3'
//                     placeholder='Nhập số điện thoại'
//                     keyboardType='phone-pad'
//                     returnKeyType='go'
//                     onChangeText={this.onChangePhone}
//                     maxLength={10}
//                     autoCorrect={false}
//                 />
//                 <Button text='Tiếp theo' onPressBtn={() => this.checkPhoneNumber(phone)} />
//                 {/* <Button text='Tiếp theo' onPressBtn={() => this._gotoLoginScreen(phone)} /> */}
//                 <LoginMore />
//                 <LoginFb onPress={() => this.LoginFb()} />
//                 <LoginGg onPress={() => this.LoginGg()} />

//             </ImageBackground>

//         );
//     }
// }

import React, { useEffect, useState } from 'react';
import {
    View,
    SafeAreaView,
    Text, Image,
    ImageBackground,
    StatusBar,
    Button,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../theme/StylesAuth'
import COLOR from '../theme/color'
import LoginFb from '../components/SignInSignUp/LoginFb';
import LoginGg from '../components/SignInSignUp/LoginGg';
import Loading from '../components/Loading'
import AlertSuccessful from '../utils/alerts/AlertSuccessful'
import DialogConfirmSendOPT from '../utils/dialogs/DialogConfirmSendOPT'
import { AuthContext } from '../navigation/AuthContext'

import {
    validatePhoneNumber,
    checkValidPhone,
    signInPhone,
    validatePassword,
    checkUUID
} from '../server/SignInSignUp/sever'

const SignInScreen = ({ navigation }) => {
    const [data, setData] = useState({
        phone: '',
        password: '',
    });
    const [validError, setValidError] = useState({
        visible: false,
        text: '',
    });
    const [alertSuccess, setAlertSuccess] = useState({
        visible: false,
        text: '',
    });

    const [phoneSuccess, setPhoneSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [flag, setFlag] = useState(null);

    const changeInputPhone = (phone) => {
        setData({
            ...data,
            phone
        })
        setValidError({
            visible: false,
            text: '',
        })

    }
    const changeInputPassword = (password) => {
        setData({
            ...data,
            password
        })
        setValidError({
            visible: false,
            text: '',
        })
    }

    const checkTxtPhone = (phone) => {
        const err = validatePhoneNumber(phone)
        if (err) {
            setValidError({
                visible: true,
                text: err
            })
        } else {
            setValidError({
                ...validError,
                visible: false,
            })
            return true
        }
    }
    const checkTxtPassword = (password) => {
        const err = validatePassword(password)
        if (err) {
            setValidError({
                visible: true,
                text: err
            })
        } else {
            setValidError({
                ...validError,
                visible: false,
            })
            return true
        }
    }

    const checkExistPhone = async (phone) => {
        try {
            if (checkTxtPhone(phone)) {
                setIsLoading(true)
                const resPhone = await checkValidPhone(phone);
                if (resPhone.code === 200) {
                    setIsLoading(false)
                    setIsModalVisible(true)
                } else if (resPhone.code === 409) {
                    if (resPhone.data.password === "") {
                        setIsLoading(false)
                        updatePassword()
                    } else {
                        setIsLoading(false)
                        setPhoneSuccess(true);
                    }
                } else {
                    setIsLoading(false)
                    setValidError({
                        visible: true,
                        text: 'Số điện thoại đã được đăng ký làm chủ sân'
                    })
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    const updatePassword = () => {
        setFlag(2);
        setIsModalVisible(true)
    }

    const { signIn } = React.useContext(AuthContext)
    const login = async (phone, password) => {
        if (checkTxtPassword(password)) {
            setIsLoading(true)
            const res = await signInPhone(phone, password);
            if (res.code === 200) {
                setIsLoading(false)
                setAlertSuccess({
                    visible: true,
                    text: 'Đăng nhập thành công'
                })
                setTimeout(() => {
                    signIn(res.data);
                }, 2000)
                Keyboard.dismiss();
            } else {
                setIsLoading(false)
                setValidError({
                    visible: true,
                    text: 'Mật khẩu không chính xác'
                })
            }
        }
    }

    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLOR.STATUSBAR_COLOR} barStyle='light-content' />
            <SafeAreaView style={styles.container}>
                <Loading visible={isLoading} />
                <AlertSuccessful
                    visible={alertSuccess.visible}
                    text={alertSuccess.text}
                />
                <DialogConfirmSendOPT
                    phone={data.phone}
                    flag={flag}
                    visible={isModalVisible}
                    navigation={navigation}
                    data={data}
                    dismiss={() => setIsModalVisible(false)} />
                <Animatable.View animation="zoomIn" style={styles.header}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                </Animatable.View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Animatable.View
                        animation="slideInUp"
                        style={styles.footer}>
                        {!phoneSuccess ?
                            <Animatable.View
                                animation="fadeInLeft"

                                style={styles.action}>
                                <Feather
                                    name="phone"
                                    color={'#7f8c8d'}
                                    size={22}
                                />
                                <TextInput
                                    placeholder="Nhập số điện thoại"
                                    placeholderTextColor="#95a5a6"
                                    autoCapitalize="none"
                                    maxLength={10}
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    value={data.phone}
                                    onChangeText={(val) => changeInputPhone(val)}
                                    style={styles.input}
                                />

                                <TouchableOpacity
                                    onPress={() => checkExistPhone(data.phone)}
                                    style={styles.btnNext}>
                                    <AntDesign
                                        name="arrowright"
                                        size={25}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </Animatable.View>
                            :
                            <Animatable.View
                                animation="fadeInRight">
                                <TouchableOpacity
                                    style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => {
                                        setPhoneSuccess(false)
                                        setValidError({
                                            visible: false,
                                            text: '',
                                        })
                                    }}
                                >
                                    <AntDesign
                                        name="left"
                                        size={25}
                                        color="#16a085"
                                    />
                                    <Text style={{ fontSize: 16, marginLeft: 10, color: '#676767' }}>Đổi số điện thoại</Text>
                                </TouchableOpacity>
                                <View
                                    style={styles.action}>
                                    <Feather
                                        name="phone"
                                        color={'#7f8c8d'}
                                        size={22}
                                    />
                                    <TextInput
                                        placeholder="Nhập mật khẩu"
                                        placeholderTextColor="#95a5a6"
                                        autoCapitalize="none"
                                        maxLength={6}
                                        keyboardType='numeric'
                                        returnKeyType='next'
                                        secureTextEntry={true}
                                        // autoFocus={true}
                                        onChangeText={(val) => changeInputPassword(val)}
                                        style={styles.input}
                                    />
                                    <TouchableOpacity
                                        onPress={() => login(data.phone, data.password)}
                                        style={styles.btnNext}>
                                        <AntDesign
                                            name="right"
                                            size={25}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>

                                </View>
                                <TouchableOpacity
                                    onPress={() => updatePassword()}
                                    style={{ marginBottom: 10, alignItems: 'flex-end', marginTop: 10 }}
                                >
                                    <Text style={{ fontSize: 16, marginLeft: 10, color: '#676767' }}>Quên mật khẩu</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        }
                        {validError.visible &&
                            <Animatable.Text
                                animation="fadeInLeft"
                                style={{ color: 'red' }}>
                                {validError.text}
                            </Animatable.Text>
                        }
                        <Text style={{ color: '#95a5a6' }}>* Nhập số điện thoại dùng để đăng nhập hoặc đăng kí</Text>
                        <View style={styles.more}>
                            <Text style={styles.txtMore}>Hoặc</Text>
                        </View>
                        <LoginFb navigation={navigation} />
                        <LoginGg navigation={navigation} />
                    </Animatable.View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ImageBackground >
    );
}

export default SignInScreen;
