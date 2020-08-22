// import React, { Component } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ImageBackground,
//     TouchableOpacity,
//     TextInput,
//     ToastAndroid
// } from 'react-native';
// import TopTitle from '../components/SignInSignUp/TopTitle';
// import Button from '../components/SignInSignUp/Button';
// import Loading from '../components/Loading'
// import { Avatar } from 'react-native-elements';
// import styless from '../theme/StylesAuth';
// import { updatePassword } from '../server/SignInSignUp/sever'


// export default class UpdatePassScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             pass: '',
//             rePass: '',
//         };
//     }
//     checkValidForm = () => {
//         const { pass, rePass } = this.state;
//         if (pass === "" || rePass === "") {
//             alert('Nhập đầy đủ form');
//             return false;
//         } else if (pass.length < 6) {
//             alert('Mật khẩu gồm 6 số')
//             return false;
//         } else if (pass !== rePass) {
//             alert('Mật khẩu không khớp')
//             return false
//         } else { return true }
//     }

//     updatePass = async (phone, pass) => {
//         console.log(phone, pass);
//         if (this.checkValidForm()) {
//             const statusCode = await updatePassword(phone, pass);
//             if (statusCode === 200) {
//                 alert('Cập nhật mật khẩu thành công')
//                 this.props.navigation.navigate('Dashboard');
//             } else {
//                 alert(statusCode + 'Cập nhật mật khẩu thất bại');
//             }
//         }
//     }

//     render() {
//         const { data, phone } = this.props.route.params;
//         const { pass } = this.state
//         return (
//             <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
//                 <Text style={styles.title}>Cập nhật mật khẩu</Text>
//                 <Text style={styles.subTitle}>Cập nhật mật khẩu để đăng nhập</Text>
//                 <Avatar
//                     size="xlarge"
//                     rounded
//                     source={{ uri: 'http://footcer.tk:4000/static/user/avatar.png', }}
//                 />
//                 <Text style={[styles.subTitle, { marginTop: 10, fontWeight: 'bold', fontSize: 20 }]}>Dương Quốc Hải</Text>
//                 <TextInput style={styless.input}
//                     placeholder='Nhập mật khẩu'
//                     placeholderTextColor='#778ca3'
//                     onChangeText={pass => {
//                         this.setState({ pass })
//                     }}
//                     keyboardType='numeric'
//                     secureTextEntry={true}
//                     returnKeyType='go'
//                     maxLength={6}
//                     autoCorrect={false}
//                 />
//                 <TextInput style={styless.input}
//                     placeholder='Nhập nhập lại mật khẩu'
//                     placeholderTextColor='#778ca3'
//                     onChangeText={rePass => {
//                         this.setState({ rePass })
//                     }}
//                     keyboardType='numeric'
//                     secureTextEntry={true}
//                     returnKeyType='go'
//                     maxLength={6}
//                     autoCorrect={false}
//                 />
//                 <Button text='Tiếp tục' onPressBtn={() => this.updatePass(phone, pass)} />
//             </ImageBackground>

//         );
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         paddingTop: 50
//     },
//     title: {
//         fontSize: 25,
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 10
//     },
//     subTitle: {
//         fontSize: 18,
//         color: 'white',
//         textAlign: 'center',
//         marginBottom: 20

//     }
// });

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import COLOR from '../theme/color'
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../theme/StylesAuth'
import Loading from '../components/Loading'
import AlertSuccessful from '../utils/alerts/AlertSuccessful'
import { updatePassword, validatePassword, confirmPassword, checkValidPhone } from '../server/SignInSignUp/sever'


const UpdatePassScreen = ({ navigation, route }) => {
    const { phone } = route.params
    const [user, setUser] = useState({
        phone: '',
        name: '',
        password: '',
        rePassword: '',
        avatar: null

    });
    const [isLoading, setIsLoading] = useState(false);

    const [alertSuccess, setAlertSuccess] = useState({
        visible: false,
        text: '',
    });
    const [error, setError] = useState({
        password: false,
        rePassword: false,
        text: 'haha'
    });
    const getData = async () => {
        const res = await checkValidPhone(phone)
        console.log(phone)
        console.log(res)
        setUser({
            ...user,
            phone: res.data.phone,
            name: res.data.displayName,
            avatar: res.data.avatar
        })
    }

    const changeTxtPass = (val) => {
        setUser({
            ...user,
            password: val
        })
        setError({
            ...error,
            password: false
        })
    }
    const changeTxtRePass = (val) => {
        setUser({
            ...user,
            rePassword: val
        })
        setError({
            ...error,
            rePassword: false
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const checkForm = () => {
        const err = validatePassword(user.password)
        if (err) {
            setError({
                ...error,
                password: true,
                text: err
            })
            return false
        } else {

            const error = confirmPassword(user.password, user.rePassword)
            if (error) {
                setError({
                    ...error,
                    rePassword: true,
                    text: error
                })
                return false
            } else {
                setError({
                    password: false,
                    rePassword: false,
                    text: ''
                })
                return true
            }
        }
    }

    const updatePass = async () => {
        if (checkForm()) {
            setIsLoading(true)
            const res = await updatePassword(user.phone, user.password)
            if (res === 200) {
                setIsLoading(false)
                setAlertSuccess({
                    visible: true,
                    text: 'Cập nhật mật khẩu thành công'
                })
                setTimeout(() => {
                    navigation.goBack()
                }, 2000)
            } else alert('huhu')
        }
    }


    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLOR.STATUSBAR_COLOR} barStyle='light-content' />
            <SafeAreaView style={{ flex: 1 }}>
                <Loading visible={isLoading} />
                <AlertSuccessful
                    visible={alertSuccess.visible}
                    text={alertSuccess.text}
                />
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
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.titleScreen} >Cập nhật mật khẩu</Text>
                            <Text style={styles.subTitleScreen}></Text>
                            <Text style={styles.subTitleScreen}></Text>

                        </View>
                        <View style={{
                            flex: 2,
                            backgroundColor: 'white',
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            paddingHorizontal: 30,
                        }}>
                            <View style={{
                                marginTop: -100,
                                zIndex: 1,
                                alignItems: 'center'
                            }}>
                                <Image
                                    style={{ borderWidth: 4, borderColor: '#fff', borderRadius: 80, width: 160, height: 160 }}
                                    source={{
                                        uri: user.avatar,
                                    }}
                                />
                                <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#000', fontSize: 20, }}>
                                    {user.name}
                                </Text>
                            </View>

                            <View style={{
                                zIndex: 1,
                            }}>
                                <TextInput
                                    placeholder="Nhập mật khẩu mới"
                                    placeholderTextColor="#bdc3c7"
                                    autoCapitalize="none"
                                    maxLength={6}
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    onChangeText={(val) => changeTxtPass(val)}
                                    style={styles.inputBorder}
                                />
                                {error.password &&
                                    <Animatable.Text
                                        animation="fadeInLeft"
                                        style={{ color: 'red', textAlign: 'center' }}>
                                        {error.text}
                                    </Animatable.Text>
                                }
                                <TextInput
                                    placeholder="Nhập lại mật khẩu mới"
                                    placeholderTextColor="#bdc3c7"
                                    autoCapitalize="none"
                                    maxLength={6}
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    onChangeText={(val) => changeTxtRePass(val)}
                                    style={styles.inputBorder}
                                />
                                {error.rePassword &&
                                    <Animatable.Text
                                        animation="fadeInLeft"
                                        style={{ color: 'red', textAlign: 'center' }}>
                                        {error.text}
                                    </Animatable.Text>
                                }
                                <TouchableOpacity
                                    onPress={() => updatePass()}
                                    style={styles.button}>
                                    <Text style={styles.textButton} >Tiếp theo</Text>
                                    <AntDesign
                                        name="arrowright"
                                        size={30}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ImageBackground >
    );
}
export default UpdatePassScreen;

