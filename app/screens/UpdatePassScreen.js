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
import { updatePassword } from '../server/SignInSignUp/sever'


export default class UpdatePassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            rePass: '',
        };
    }
    checkValidForm = () => {
        const { pass, rePass } = this.state;
        if (pass === "" || rePass === "") {
            alert('Nhập đầy đủ form');
            return false;
        } else if (pass.length < 6) {
            alert('Mật khẩu gồm 6 số')
            return false;
        } else if (pass !== rePass) {
            alert('Mật khẩu không khớp')
            return false
        } else { return true }
    }

    updatePass = async (phone, pass) => {
        console.log(phone, pass);
        if (this.checkValidForm()) {
            const statusCode = await updatePassword(phone, pass);
            if (statusCode === 200) {
                alert('Cập nhật mật khẩu thành công')
                this.props.navigation.navigate('Dashboard');
            } else {
                alert(statusCode + 'Cập nhật mật khẩu thất bại');
            }
        }
    }

    render() {
        const { data, phone } = this.props.route.params;
        const {pass} = this.state
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <Text style={styles.title}>Cập nhật mật khẩu</Text>
                <Text style={styles.subTitle}>Cập nhật mật khẩu để đăng nhập</Text>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{ uri: data.avatar, }}
                />
                <Text style={[styles.subTitle, { marginTop: 10, fontWeight: 'bold', fontSize: 20 }]}>{data.displayName}</Text>
                <TextInput style={styless.input}
                    placeholder='Nhập mật khẩu'
                    placeholderTextColor='#778ca3'
                    onChangeText={pass => {
                        this.setState({ pass })
                    }}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    returnKeyType='go'
                    maxLength={6}
                    autoCorrect={false}
                />
                <TextInput style={styless.input}
                    placeholder='Nhập nhập lại mật khẩu'
                    placeholderTextColor='#778ca3'
                    onChangeText={rePass => {
                        this.setState({ rePass })
                    }}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    returnKeyType='go'
                    maxLength={6}
                    autoCorrect={false}
                />
                <Button text='Tiếp tục' onPressBtn={() => this.updatePass(phone, pass)} />
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
