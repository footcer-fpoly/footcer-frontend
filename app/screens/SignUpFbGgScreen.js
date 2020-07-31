import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import TopTitle from '../components/SignInSignUp/TopTitle';
import Button from '../components/SignInSignUp/Button';
import Loading from '../components/Loading'
import { Avatar } from 'react-native-elements';
import styless from '../theme/StyleLogin-Regis';
import { signUpFbGg, checkValidEmail, checkValidPhone } from '../server/SignInSignUp/sever'


export default class SignUpFbGgScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phone: '',
            urlAvatar: null,
            name: '',
            id: ''
        };
    }
    componentDidMount() {
        this.checkLogin();
    }
    checkLogin() {
        const { data, flag } = this.props.route.params;
        if (flag) {
            this.setState({
                email: data.email,
                name: data.name,
                urlAvatar: data.photo,
                id: data.id
            })
        } else {
            this.setState({
                email: data.email,
                name: data.name,
                urlAvatar: data.picture.data.url,
                id: data.id
            })
        }
    }
    checkValidForm() {
        const { phone, email } = this.state
        if (email.length === 0) {
            ToastAndroid.show("Nhập email", ToastAndroid.SHORT);
            return false;
        } else if (phone.length === 0) {
            ToastAndroid.show("Nhập số điện thoại", ToastAndroid.SHORT);
            return false;
        } else return true;
    }
    render() {
        const { phone, email, urlAvatar, name } = this.state
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <Text style={styles.title}>Cập nhật thông tin</Text>
                <Text style={styles.subTitle}>Cập nhật email và số điện thoại</Text>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{ uri: urlAvatar, }}
                />
                <Text style={[styles.subTitle, { marginTop: 10, fontWeight: 'bold', fontSize: 20 }]}>{name}</Text>
                <TextInput style={styless.input}
                    placeholder='Nhập email'
                    placeholderTextColor='#778ca3'
                    keyboardType='email-address'
                    //onChangeText={this.onChangeTxtEmail}
                    onChangeText={email => {
                        this.setState({ email })
                    }}
                    returnKeyType='next'
                    value={email}
                    autoCorrect={false}
                />
                <TextInput style={styless.input}
                    placeholder='Nhập số điện thoại'
                    placeholderTextColor='#778ca3'
                    onChangeText={phone => {
                        this.setState({ phone })
                    }}
                    keyboardType='numeric'
                    returnKeyType='go'
                    maxLength={6}
                    autoCorrect={false}
                />
                <Button text='Tiếp tục' />
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