/**
 * @format
 */
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './app/App'
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

import SplashScreen from './app/screens/SplashScreen'
// import HomeScreen from './app/screens/HomeScreen'
// import SignUpFbGgScreen from './app/screens/SignUpFbGgScreen'
// // import {AppRegistry} from 'react-native';
// import App from './app/screens/FindOpponentScreen';
// import {name as appName} from './app.json';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { currentScreen: 'SplashScreen' }  
        setTimeout(() => {
            this.setState({currentScreen:'App'})
        }, 3000)
    }
    render() {
        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'SplashScreen' ? <SplashScreen /> : <App />
        return mainScreen
    }
}

AppRegistry.registerComponent(appName, () => Main);
