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
//     TouchableHighlight
// } from 'react-native';
// import TopTitle from '../components/SignInSignUp/TopTitle';
// import Button from '../components/SignInSignUp/Button';
// import styles from '../theme/StylesAuth';
// import LoginMore from '../components/SignInSignUp/LoginMore';
// import Loading from '../components/Loading'
// import auth from '@react-native-firebase/auth';
// import firebase from '@react-native-firebase/app';
// import { signUpFbGg } from '../server/SignInSignUp/sever'



// export default class OTPScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             verificationCode: '',
//             timer: 10,
//             disabledBtnReSend: true,
//             visibleCountdown: 'flex',
//             opacity: 0.7,
//             confirmResult: null,
//             flagLoading: 0,
//         };
//     }
//     toggleLoading = () => {
//         const { flagLoading } = this.state
//         flagLoading ? this.setState({ flagLoading: 0 }) : this.setState({ flagLoading: 1 })
//     }
//     goToChangePhone = () => {
//         this.props.navigation.replace('CheckPhoneScreen');
//     }
//     gotoDashboard = () => {
//         this.props.navigation.replace('Dashboard');
//     }
//     gotoSignUpPhone = (phone) => {
//         this.props.navigation.replace('SignUpPhoneScreen', { phone: phone })
//     }
//     gotoUpdatePass = (phone) => {
//         this.props.navigation.replace('SignUpPhoneScreen', { phone: phone })
//     }
//     handleVerifyCode = (confirmResult) => {
//         const { phone, data, flag } = this.props.route.params;
//         console.log(phone);
//         console.log(data);
//         console.log(flag);
//         this.toggleLoading()
//         const { verificationCode } = this.state
//         if (verificationCode.length == 6) {
//             confirmResult
//                 .confirm(verificationCode)
//                 .then(async () => {
//                     await this._goToNext(flag, data, phone);
//                     await this.toggleLoading();
//                 })
//                 .catch(error => {
//                     this.toggleLoading();
//                     alert(error.message)
//                     return false
//                 })
//         } else {
//             this.toggleLoading();
//             alert('Please enter a 6 digit OTP code.')
//             return false
//         }
//     }

//     countdownOverOTP = (phone) => {
//         var { timer } = this.state
//         this.sendOTP(phone)
//         this.setState({
//             opacity: 0.7,
//             disabledBtnReSend: true,
//             visibleCountdown: 'flex',
//         })
//         const countdown = setInterval(() => {
//             this.setState({ timer: --timer })
//             if (timer === 0) {
//                 clearInterval(countdown)
//                 this.setState({
//                     disabledBtnReSend: false,
//                     visibleCountdown: 'none',
//                     opacity: 1,
//                     timer: 10,
//                 })
//             }
//         }, 1000)
//     }

//     sendOTP = (phone) => {
//         const phone84 = '+84' + phone;
//         try {
//             firebase
//                 .auth()
//                 .signInWithPhoneNumber(phone84)
//                 .then(confirmResult => {
//                     this.setState({ confirmResult })
//                 })
//                 .catch(error => {
//                     console.log(error)
//                 })
//         } catch (err) {
//             console.log(err)
//         }
//     }
//     _goToNext = async (flag, data, phone) => {
//         console.log('phone: ', phone);
//         console.log('data', data);
//         console.log('flag', flag);
//         //flag = 0 sign fb -- flag = 1 sign gg -- flag = 2 update pass
//         if (flag === 0) {
//             try {
//                 const statusCode = await signUpFbGg(phone, data.picture.data.url, data.name, data.id);
//                 if (statusCode === 200) {
//                     this.gotoDashboard();
//                     alert('Vừa Sign Up Fb')
//                 } else {
//                     alert(statusCode);
//                 }
//             } catch (error) {
//                 alert(error)
//             }
//         } else if (flag === 1) {
//             try {
//                 const statusCode = await signUpFbGg(phone, data.photo, data.name, data.id);
//                 console.log(statusCode);
//                 if (statusCode === 200) {
//                     this.gotoDashboard();
//                     alert('Vừa Sign Up GG')
//                 } else {
//                     alert(statusCode);
//                 }
//             } catch (err) {
//                 alert(err)
//             }
//         } else if (flag === 2) {
//             try {
//                 this.props.navigation.navigate('UpdatePassScreen', { data: data, phone, phone });
//                 alert('haha')
//             } catch (error) {
//                 alert(error);
//             }
//         } else {
//             this.gotoSignUpPhone(phone)
//         }
//     }

//     componentDidMount() {
//         const { phone } = this.props.route.params;
//         this.countdownOverOTP(phone)
//     }

//     render() {
//         const { phone } = this.props.route.params;
//         const { confirmResult, opacity, timer, visibleCountdown, disabledBtnReSend } = this.state
//         return (
//             <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
//                 <Loading flag={this.state.flagLoading} />
//                 <TopTitle
//                     title='Xác thực OTP'
//                     sub1Title='Một mã xác thực đã được gữi đến'
//                     sub2Title={phone} />
//                 <TextInput style={styles.input}
//                     placeholder='Mã xác thực'
//                     placeholderTextColor='#778ca3'
//                     keyboardType='numeric'
//                     returnKeyType='go'
//                     maxLength={6}
//                     onChangeText={verificationCode => {
//                         this.setState({ verificationCode })
//                     }}
//                     autoCorrect={false}
//                 />
//                 <Button text='Tiếp tục' onPressBtn={() => this.handleVerifyCode(confirmResult)} />
//                 <View style={styles.warpperResendAndChange}>
//                     <TouchableOpacity onPress={() => this.goToChangePhone()}><Text style={styles.txtResendAndChange}>ĐỔI SĐT</Text></TouchableOpacity>
//                     <TouchableOpacity onPress={() => this.countdownOverOTP(phone)}
//                         disabled={disabledBtnReSend} style={{ flexDirection: 'row', opacity: opacity }}  >
//                         <Text style={styles.txtResendAndChange}>
//                             GỬI LẠI OTP
//                     </Text>
//                         <Text style={[styles.txtResendAndChange, { display: visibleCountdown }]}>
//                             ({timer}s)</Text>
//                     </TouchableOpacity>

//                 </View>
//             </ImageBackground>
//         );
//     }
// }
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    Button,
    ImageBackground,
    StatusBar,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard,
    TouchableOpacity,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Text } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import COLOR from '../theme/color'
import styles from '../theme/StylesAuth'
import Loading from '../components/Loading'
import AlertSuccessful from '../utils/alerts/AlertSuccessful'
import AlertError from '../utils/alerts/AlertError'




const OTPScreen = ({ route, navigation }) => {
    const { phone } = route.params
    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [pin5, setPin5] = useState('');
    const [pin6, setPin6] = useState('');
    const pin1ref = useRef(null);
    const pin2ref = useRef(null);
    const pin3ref = useRef(null);
    const pin4ref = useRef(null);
    const pin5ref = useRef(null);
    const pin6ref = useRef(null);

    let [timer, setTimer] = useState(60);
    const [confirmResult, setConfirmResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState({
        visible: false,
        text: '',
    });
    const [alertError, setAlertError] = useState({
        visible: false,
        text: '',
    });


    const focusInput = (changePin, pin, next, prev) => {
        changePin;
        if (!pin.length) {
            if (next) {
                next.current.focus()
            }
        } else {
            if (prev) {
                prev.current.focus()
            }
        }
    }
    const sendOTP = (phone, timer) => {
        const phone84 = '+84' + phone;
        try {
            firebase
                .auth()
                .signInWithPhoneNumber(phone84)
                .then(confirmResult => {
                    setConfirmResult(confirmResult);
                    console.log(confirmResult)
                    const countdown = setInterval(() => {
                        setTimer(--timer)
                        if (timer === 0) {
                            clearInterval(countdown);
                        }
                    }, 1000)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const handleVerifyCode = (confirmResult) => {
        if (pin1 && pin2 && pin3 && pin4 && pin5 && pin6) {
            const pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
            setIsLoading(true);
            confirmResult
                .confirm(pin)
                .then(async () => {
                    setAlertSuccess({ visible: true, text: 'Xác thực thành công' })
                    setIsLoading(false);
                    setTimeout(() => _goToNext(1, 2, phone), 2000);
                })
                .catch(error => {
                    setAlertError({ visible: true, text: 'Mã xác thực không đúng' })
                    setIsLoading(false);
                })
        } else {
            setAlertError({ visible: true, text: 'Mã xác thực có 6 kí tự' })
            setIsLoading(false);
        }
    }

    const _goToNext = (flag, data, phone) => {
        navigation.replace('SignUpPhoneScreen', { phone: phone })
    }

    useEffect(() => {
        sendOTP(phone, 60)
    }, []);
    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLOR.STATUSBAR_COLOR} barStyle='light-content' />
            <SafeAreaView style={{ flex: 1 }}>
                <Loading visible={isLoading} />
                <AlertSuccessful visible={alertSuccess.visible} text={alertSuccess.text} />
                <AlertError
                    visible={alertError.visible}
                    text={alertError.text}
                    dismiss={() => setAlertError({ ...alertError, visible: false })} />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.btnGoBack}>
                    <AntDesign
                        name="left"
                        size={22}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <Image source={require('../assets/images/iphone.png')} style={{ width: 100, height: 120, marginBottom: 10 }} />
                            <Text category='h4' style={{ color: 'white', fontWeight: 'bold', marginBottom: 20 }} >Xác thực OTP</Text>
                            <Text category='h6' style={{ color: 'white', textAlign: 'center' }}>Một mã xác thực đã được gữi đến {"\n"} {phone}</Text>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.warpperInputOTP}>
                                <TextInput
                                    ref={pin1ref}
                                    keyboardType='numeric'
                                    maxLength={2}
                                    onChangeText={(val) =>
                                        focusInput(setPin1(val), pin1, pin2ref, null)
                                    }
                                    value={pin1}
                                    style={styles.inputOTP}
                                />
                                <TextInput
                                    ref={pin2ref}
                                    keyboardType='numeric'
                                    maxLength={1}
                                    onChangeText={(val) =>
                                        focusInput(setPin2(val), pin2, pin3ref, pin1ref)
                                    }
                                    value={pin2}
                                    style={styles.inputOTP}
                                />
                                <TextInput
                                    ref={pin3ref}
                                    keyboardType='numeric'
                                    maxLength={1}
                                    onChangeText={(val) =>
                                        focusInput(setPin3(val), pin3, pin4ref, pin2ref)
                                    }
                                    value={pin3}
                                    style={styles.inputOTP}
                                />
                                <TextInput
                                    ref={pin4ref}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    onChangeText={(val) =>
                                        focusInput(setPin4(val), pin4, pin5ref, pin3ref)
                                    }
                                    value={pin4}
                                    style={styles.inputOTP}
                                />
                                <TextInput
                                    ref={pin5ref}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    onChangeText={(val) =>
                                        focusInput(setPin5(val), pin5, pin6ref, pin4ref)
                                    }
                                    value={pin5}
                                    style={styles.inputOTP}
                                />
                                <TextInput
                                    ref={pin6ref}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    onChangeText={(val) =>
                                        focusInput(setPin6(val), pin6, null, pin5ref)
                                    }
                                    value={pin6}
                                    style={styles.inputOTP}
                                />
                            </View>
                            {
                                timer !== 0 ? <Animatable.Text animation="fadeIn" style={{ color: '#676767', fontWeight: 'bold', fontSize: 18, }}>({timer})</Animatable.Text> :
                                    <Animatable.View
                                        animation="fadeIn"
                                    >
                                        <TouchableOpacity
                                            onPress={() => sendOTP(phone, 60)}
                                            style={{ justifyContent: 'center' }}  >
                                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#2c3e50' }}>Gữi lại mã xác thực</Text>
                                        </TouchableOpacity>
                                    </Animatable.View>
                            }
                            <TouchableOpacity
                                onPress={() => handleVerifyCode(confirmResult)}
                                style={styles.button}>
                                <Text category='h6' style={{ flex: 1, color: '#fff', fontWeight: 'bold', textAlign: 'center' }} >Tiếp theo</Text>
                                <AntDesign
                                    name="arrowright"
                                    size={30}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ImageBackground >
    );

}
export default OTPScreen;
