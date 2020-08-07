import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ToastAndroid
} from 'react-native';
import TopTitle from '../components/SignInSignUp/TopTitle';
import Button from '../components/SignInSignUp/Button';
import Loading from '../components/Loading'
import { Avatar } from 'react-native-elements';
import styless from '../theme/StyleLogin-Regis';
import { signUpFbGg, checkValidPhone, validatePhoneNumber } from '../server/SignInSignUp/sever'
import DialogSendOTP from '../components/DialogSendOTP'


export default class SignUpFbGgScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            urlAvatar: null,
            name: '',
            id: '',
            dialogVisible: false
        };
    }
    componentDidMount() {
        this.checkLogin();
    }
    toggleDialog = () => {
        const { dialogVisible } = this.state
        dialogVisible ? this.setState({ dialogVisible: false }) : this.setState({ dialogVisible: true })

    }
    checkLogin() {
        const { data, flag } = this.props.route.params;
        if (flag) {
            this.setState({
                name: data.name,
                urlAvatar: data.photo,
                id: data.id
            })
        } else {
            this.setState({
                name: data.name,
                urlAvatar: data.picture.data.url,
                id: data.id
            })
        }
    }
    checkValidForm() {
        const { phone } = this.state
        if (phone.length === 0) {
            ToastAndroid.show("Nhập số điện thoại", ToastAndroid.SHORT);
            return false;
        } else return true;
    }
    checkPhone = async (phone) => {
        if (this.checkValidForm()) {
            const resPhone = await checkValidPhone(phone);
            if (validatePhoneNumber(phone)) {
                if (resPhone.code === 200) {
                    this.toggleDialog(phone);
                } else if (resPhone.code === 409) {
                    alert('Số điện thoại đã được đăng ký');
                } else {
                    alert('Số điện thoại đã được đăng ký làm chủ sân')
                }
            } else {
                ToastAndroid.show("Số điện thoại không đúng định dạng", ToastAndroid.SHORT);
            }
        }
    }
    _gotoOTPScreen = (phone) => {
        const { data, flag } = this.props.route.params;
        this.toggleDialog();
        this.props.navigation.navigate('OTPScreen', { phone: phone, data: data, flag: flag });
    }
    render() {
        const { phone, urlAvatar, name, dialogVisible } = this.state
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <DialogSendOTP
                    phone={phone}
                    visible={dialogVisible}
                    handleCancel={() => this.toggleDialog()}
                    handleNext={() => this._gotoOTPScreen(phone)}
                />
                <Text style={styles.title}>Cập nhật thông tin</Text>
                <Text style={styles.subTitle}>Cập nhật số điện thoại</Text>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{ uri: urlAvatar, }}
                />
                <Text style={[styles.subTitle, { marginTop: 10, fontWeight: 'bold', fontSize: 20 }]}>{name}</Text>
                <TextInput style={styless.input}
                    placeholder='Nhập số điện thoại'
                    placeholderTextColor='#778ca3'
                    onChangeText={phone => {
                        this.setState({ phone })
                    }}
                    keyboardType='numeric'
                    returnKeyType='go'
                    maxLength={10}
                    autoCorrect={false}
                />
                <Button text='Tiếp tục' onPressBtn={() => this.checkPhone(phone)} />
            </ImageBackground>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    title: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20

    }
});