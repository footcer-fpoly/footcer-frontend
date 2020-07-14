import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import OTPScreen from '../screens/OTPScreen'
import FillInfoScreen from '../screens/FillInfoScreen'

const Stack = createStackNavigator();
const AppNavigation = () => {
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='OTPScreen' component={OTPScreen} />
        </Stack.Navigator>
    </NavigationContainer>
}
export default AppNavigation;