import React, { useState } from 'react';
import {
    View,
    TextInput,
    ImageBackground,
    StatusBar,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard,
    TouchableOpacity,
    Image,
    ScrollView,
    Text
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLOR from '../theme/color'
import styles from '../theme/StylesAuth'
import {
    validatePassword,
    confirmPassword,
    signUpPhone
} from '../server/SignInSignUp/sever'
import Loading from '../components/Loading'
import AlertSuccessful from '../utils/alerts/AlertSuccessful'
import AlertError from '../utils/alerts/AlertError'
import { AuthContext } from '../navigation/AuthContext'

const SignUpPhoneScreen = ({ navigation, route }) => {
    const [data, setData] = useState({
        phone: route.params.phone,
        name: '',
        password: '',
        rePassword: ''
    });
    const [secureTextEntry, setSecureTextEntry] = useState({
        password: true,
        rePassword: true
    });
    const [errName, setErrName] = useState({
        visible: false,
        text: '',
    });
    const [errPassword, setErrPassword] = useState({
        visible: false,
        text: '',
    });
    const [errRePassword, setErrRePassword] = useState({
        visible: false,
        text: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState({
        visible: false,
        text: '',
    });
    const [alertError, setAlertError] = useState({
        visible: false,
        text: '',
    });

    const toggleSecurePass = () => {
        setSecureTextEntry({
            ...secureTextEntry,
            password: !secureTextEntry.password
        })
    }
    const toggleSecureRePass = () => {
        setSecureTextEntry({
            ...secureTextEntry,
            rePassword: !secureTextEntry.rePassword
        })
    }

    const changeTxtName = (val) => {
        setData({ ...data, name: val })
        setErrName({ ...errName, visible: false })
    }
    const changeTxtPass = (val) => {
        setData({ ...data, password: val })
        setErrPassword({ ...errPassword, visible: false })
    }
    const changeTxtRePass = (val) => {
        setData({ ...data, rePassword: val })
        setErrRePassword({ ...errRePassword, visible: false })
    }

    const checkValidName = () => {
        if (!data.name.length) {
            setErrName({ visible: true, text: 'Họ và tên không được để trống' })
            return false
        }
        return true
    }

    const checkValidPass = () => {
        const err = validatePassword(data.password);
        if (err) {
            setErrPassword({ visible: true, text: err })
            return false
        }
        return true
    }

    const checkValidRePass = () => {
        const err = confirmPassword(data.password, data.rePassword);
        if (err) {
            setErrRePassword({ visible: true, text: err })
            return false
        }
        return true
    }
    const { signUp } = React.useContext(AuthContext)

    const registerPhone = async (data) => {
        if (checkValidName() && checkValidPass() && checkValidRePass()) {
            setIsLoading(true)
            const res = await signUpPhone(data);
            if (res.code === 200) {
                setIsLoading(false)
                setAlertSuccess({ visible: true, text: 'Đăng kí thành công' });
                setTimeout(() => {
                    signUp(res.data);
                }, 2000)
            } else {
                setIsLoading(false)
                setAlertError({ visible: true, text: 'Đăng kí thất bại' })
            }
        }
    }

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
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={styles.header}>
                        <Image source={require('../assets/images/user.png')} style={{ width: 100, height: 100, marginBottom: 10 }} />
                        <Text style={styles.titleScreen} >Cập nhật thông tin</Text>
                        <Text style={styles.subTitleScreen}> Cập nhật thông tin cá nhân {"\n"} và mật khẩu </Text>
                    </View>
                    <ScrollView style={styles.footerSignUp}>
                        <Text style={[styles.text_footer, { marginTop: 20 }]}>Họ và tên</Text>
                        <View style={styles.actionSignUp}>
                            <AntDesign
                                name="user"
                                color={'#05375a'}
                                size={20}
                            />
                            <TextInput
                                placeholder="Nhập họ và tên"
                                placeholderTextColor="#666666"
                                autoCapitalize="none"
                                maxLength={10}
                                keyboardType='default'
                                returnKeyType='next'
                                autoCorrect={false}
                                onChangeText={(val) => changeTxtName(val)}
                                style={styles.textInput}
                            />
                            {
                                data.name.length ?
                                    <Animatable.View animation='bounceIn' >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null
                            }

                        </View>
                        {
                            errName.visible &&
                            <Animatable.View animation="fadeInLeft" >
                                <Text style={{ color: 'red' }}>{errName.text}</Text>
                            </Animatable.View>
                        }
                        <Text style={[styles.text_footer, { marginTop: 20 }]}>Mật khẩu</Text>
                        <View style={styles.actionSignUp}>
                            <Feather
                                name="key"
                                color={'#05375a'}
                                size={20}
                            />
                            <TextInput
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="#666666"
                                autoCapitalize="none"
                                maxLength={6}
                                keyboardType='numeric'
                                secureTextEntry={secureTextEntry.password}
                                returnKeyType='next'
                                onChangeText={(val) => changeTxtPass(val)}
                                style={styles.textInput}
                            />
                            <TouchableOpacity onPress={() => toggleSecurePass()}>
                                {secureTextEntry.password ?
                                    <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    /> :
                                    <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>

                        </View>
                        {
                            errPassword.visible &&
                            <Animatable.View animation="fadeInLeft" >
                                <Text style={{ color: 'red' }}>{errPassword.text}</Text>
                            </Animatable.View>
                        }
                        <Text style={[styles.text_footer, { marginTop: 20 }]}>Xác nhận mật khẩu</Text>
                        <View style={styles.actionSignUp}>
                            <Feather
                                name="key"
                                color={'#05375a'}
                                size={20}
                            />
                            <TextInput
                                placeholder="nhập lại mật khẩu"
                                placeholderTextColor="#666666"
                                autoCapitalize="none"
                                maxLength={6}
                                keyboardType='numeric'
                                returnKeyType='next'
                                secureTextEntry={secureTextEntry.rePassword}
                                onChangeText={(val) => changeTxtRePass(val)}
                                style={styles.textInput}
                            />
                            <TouchableOpacity onPress={() => toggleSecureRePass()}>
                                {secureTextEntry.rePassword ?
                                    <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    /> :
                                    <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            errRePassword.visible &&
                            <Animatable.View animation="fadeInLeft" >
                                <Text style={{ color: 'red' }}>{errRePassword.text}</Text>
                            </Animatable.View>
                        }

                        <TouchableOpacity
                            onPress={() => registerPhone(data)}
                            style={styles.button}>
                            <Text style={styles.textButton} >Đăng kí</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ImageBackground >
    );
}

export default SignUpPhoneScreen

