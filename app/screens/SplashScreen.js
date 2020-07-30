import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Button } from 'react-native';

export default class splashscreen extends Component {
    render() {
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
                <View style={styles.warpperLogo} >
                    <Image source={require('../assets/images/logo.png')} style={styles.logo}></Image>
                    <Text style={styles.sologan}> Be healthier everyday </Text>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    warpperLogo: {
        alignItems: 'center',
        position: 'relative'
    },
    logo: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: -150
    },
    sologan: {
        color: 'white',
        fontSize: 15,
    }
});
