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
// import { signUpFbGg, checkValidPhone, validatePhoneNumber } from '../server/SignInSignUp/sever'
// import DialogSendOTP from '../components/DialogSendOTP'


// export default class SignUpFbGgScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             phone: '',
//             urlAvatar: null,
//             name: '',
//             id: '',
//             dialogVisible: false
//         };
//     }
//     componentDidMount() {
//         this.checkLogin();
//     }
//     toggleDialog = () => {
//         const { dialogVisible } = this.state
//         dialogVisible ? this.setState({ dialogVisible: false }) : this.setState({ dialogVisible: true })

//     }
//     checkLogin() {
//         const { data, flag } = this.props.route.params;
//         if (flag) {
//             this.setState({
//                 name: data.name,
//                 urlAvatar: data.photo,
//                 id: data.id
//             })
//         } else {
//             this.setState({
//                 name: data.name,
//                 urlAvatar: data.picture.data.url,
//                 id: data.id
//             })
//         }
//     }
//     checkValidForm() {
//         const { phone } = this.state
//         if (phone.length === 0) {
//             ToastAndroid.show("Nhập số điện thoại", ToastAndroid.SHORT);
//             return false;
//         } else return true;
//     }
//     checkPhone = async (phone) => {
//         if (this.checkValidForm()) {
//             const resPhone = await checkValidPhone(phone);
//             if (validatePhoneNumber(phone)) {
//                 if (resPhone.code === 200) {
//                     this.toggleDialog(phone);
//                 } else if (resPhone.code === 409) {
//                     alert('Số điện thoại đã được đăng ký');
//                 } else {
//                     alert('Số điện thoại đã được đăng ký làm chủ sân')
//                 }
//             } else {
//                 ToastAndroid.show("Số điện thoại không đúng định dạng", ToastAndroid.SHORT);
//             }
//         }
//     }
//     _gotoOTPScreen = (phone) => {
//         const { data, flag } = this.props.route.params;
//         this.toggleDialog();
//         this.props.navigation.navigate('OTPScreen', { phone: phone, data: data, flag: flag });
//     }
//     render() {
//         const { phone, urlAvatar, name, dialogVisible } = this.state
//         return (
//             <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
//                 <DialogSendOTP
//                     phone={phone}
//                     visible={dialogVisible}
//                     handleCancel={() => this.toggleDialog()}
//                     handleNext={() => this._gotoOTPScreen(phone)}
//                 />
//                 <Text style={styles.title}>Cập nhật thông tin</Text>
//                 <Text style={styles.subTitle}>Cập nhật số điện thoại</Text>
//                 <Avatar
//                     size="xlarge"
//                     rounded
//                     source={{ uri: urlAvatar, }}
//                 />
//                 <Text style={[styles.subTitle, { marginTop: 10, fontWeight: 'bold', fontSize: 20 }]}>{name}</Text>
//                 <TextInput style={styless.input}
//                     placeholder='Nhập số điện thoại'
//                     placeholderTextColor='#778ca3'
//                     onChangeText={phone => {
//                         this.setState({ phone })
//                     }}
//                     keyboardType='numeric'
//                     returnKeyType='go'
//                     maxLength={10}
//                     autoCorrect={false}
//                 />
//                 <Button text='Tiếp tục' onPressBtn={() => this.checkPhone(phone)} />
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
import Feather from 'react-native-vector-icons/Feather';
import styles from '../theme/StylesAuth'
import Loading from '../components/Loading'
import AlertSuccessful from '../utils/alerts/AlertSuccessful'
import DialogConfirmSendOPT from '../utils/dialogs/DialogConfirmSendOPT'
import { checkValidPhone, validatePhoneNumber } from '../server/SignInSignUp/sever'


const SignUpFbGgScreen = ({ navigation, route }) => {
    const { data, flag } = route.params;
    const [dataUser, setDataUser] = useState({
        id: '',
        phone: '',
        name: '',
        image: ''
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState();
    const [validError, setValidError] = useState({
        visible: false,
        text: '',
    });
    const setData = () => {
        if (!flag) {
            setDataUser({
                ...dataUser,
                id: data.id,
                name: data.name,
                image: data.picture.data.url
            })
        } else {
            setDataUser({
                ...dataUser,
                id: data.id,
                name: data.name,
                image: data.photo
            })
        }

    }
    useEffect(() => {
        setData();
    }, [])

    const checkPhone = async (phone) => {
        const err = validatePhoneNumber(phone);
        if (err) {
            setValidError({ visible: true, text: err })
        } else {
            setIsLoading(true)
            const res = await checkValidPhone(phone);
            if (res.code === 200) {
                setIsLoading(false)
                setIsModalVisible(true);
            } else {
                setIsLoading(false)
                setValidError({ visible: true, text: 'Số điện thoại đã được đăng ký' })
            }
        }

    }


    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLOR.STATUSBAR_COLOR} barStyle='light-content' />
            <SafeAreaView style={{ flex: 1 }}>
                <DialogConfirmSendOPT
                    data={dataUser}
                    phone={dataUser.phone}
                    flag={flag}
                    visible={isModalVisible}
                    navigation={navigation}
                    dismiss={() => setIsModalVisible(false)} />
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
                            <Text style={styles.titleScreen} >Cập nhật thông tin</Text>
                            <Text style={styles.subTitleScreen}> Cập nhật số điện thoại</Text>

                        </View>
                        <View style={{
                            flex: 1.5,
                            position: 'relative',
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
                                        uri: dataUser.image ? dataUser.image : null,
                                    }}
                                />
                                <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#000', fontSize: 20, }}>
                                    {dataUser.name}
                                </Text>
                            </View>

                            <View style={{
                                zIndex: 1,
                            }}>
                                <TextInput
                                    placeholder="Nhập số điện thoại"
                                    placeholderTextColor="#bdc3c7"
                                    autoCapitalize="none"
                                    maxLength={10}
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    style={styles.inputBorder}
                                    onChangeText={(val) => setDataUser({
                                        ...dataUser,
                                        phone: val
                                    })}
                                    value={dataUser.phone}
                                />
                                {validError.visible &&
                                    <Animatable.Text
                                        animation="fadeInLeft"
                                        style={{ color: 'red' }}>
                                        {validError.text}
                                    </Animatable.Text>
                                }
                                <TouchableOpacity
                                    onPress={() => checkPhone(dataUser.phone)}
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
export default SignUpFbGgScreen;
