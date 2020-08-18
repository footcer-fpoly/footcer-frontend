import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import CheckPhoneScreen from '../screens/CheckPhoneScreen';
import OTPScreen from '../screens/OTPScreen';
import SignUpFbGgScreen from '../screens/SignUpFbGgScreen';
import SignUpPhoneScreen from '../screens/SignUpPhoneScreen';
import LoginScreen from '../screens/LoginScreen';

const RootStack = createStackNavigator();

const AuthStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="CheckPhoneScreen" component={CheckPhoneScreen}/>
        <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
        <RootStack.Screen name="SignUpPhoneScreen" component={SignUpPhoneScreen}/>
        <RootStack.Screen name="SignUpFbGgScreen" component={SignUpFbGgScreen}/>
        <RootStack.Screen name="OTPScreen" component={OTPScreen}/>
    </RootStack.Navigator>
);

export default AuthStackScreen;