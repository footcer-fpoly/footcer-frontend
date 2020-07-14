import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../app/screens/LoginScreen'
import OTPScreen from '../app/screens/OTPScreen'
import FillInfoScreen from '../app/screens/FillInfoScreen'
export default class App extends Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='OTPScreen' component={OTPScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='FillInfoScreen' component={FillInfoScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
