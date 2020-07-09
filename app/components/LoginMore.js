import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class LoginMore extends Component {

    render() {
        return (
            <View style={styles.more}>
                <View style={styles.line}></View>
                <Text style={styles.txtMore}>Hoặc đăng nhập bằng tài khoản</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    more: {
        width: '100%',
        position: 'relative',
        marginTop: 50,
        alignItems: 'center'
    },
    line: {
        position: 'absolute',
        width: '100%',
        borderWidth: 0.5,
        borderColor: 'black',
        top: 12,
        borderColor: '#676767'
    },
    txtMore: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#676767',
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderRadius: 10,

    }
});
