import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import OTPScreen from '../screens/OTPScreen';
import SignUpFbGgScreen from '../screens/SignUpFbGgScreen';
import SignUpPhoneScreen from '../screens/SignUpPhoneScreen';

const RootStack = createStackNavigator();

const AuthStackScreen = ({ navigation }) => (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpPhoneScreen" component={SignUpPhoneScreen} />
        <RootStack.Screen name="SignUpFbGgScreen" component={SignUpFbGgScreen} />
        <RootStack.Screen name="OTPScreen" component={OTPScreen} />
    </RootStack.Navigator>
);

export default AuthStackScreen;