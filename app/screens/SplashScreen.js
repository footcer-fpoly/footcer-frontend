import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import COLOR from '../theme/color'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SignInScreen');
        }, 2000)
    });
    return (
        <ImageBackground source={require('../assets/images/bg.png')} style={styles.container}>
            <StatusBar backgroundColor={COLOR.STATUSBAR_COLOR} barStyle='light-content' />
            <View style={styles.warpperLogo} >
                <Animatable.Image
                    animation="fadeInUp"
                    duration={2000}
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
                <Animatable.Text animation="fadeIn" style={styles.sologan}> Be healthier everyday </Animatable.Text>
            </View>
        </ImageBackground>
    );
}

export default SplashScreen;

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
