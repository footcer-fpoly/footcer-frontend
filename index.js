/**
 * @format
 */
import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import SplashScreen from './app/screens/SplashScreen'
import LoginScreen from './app/screens/LoginScreen'
import OTPScreen from './app/screens/OTPScreen'
import FillInfoScreen from './app/screens/FillInfoScreen'
import { name as appName } from './app.json';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { currentScreen: 'SplashScreen' }
        setTimeout(() => {
            this.setState({currentScreen:'LoginScreen'})
        }, 3000)
    }
    render() {
        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'SplashScreen' ? <SplashScreen /> : <LoginScreen />
        return mainScreen
    }
}

AppRegistry.registerComponent(appName, () => FillInfoScreen);
