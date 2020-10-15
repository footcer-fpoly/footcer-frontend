import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/AuthScreens/SplashScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import OTPScreen from '../screens/AuthScreens/OTPScreen';
import SignUpFbGgScreen from '../screens/AuthScreens/SignUpFbGgScreen';
import SignUpPhoneScreen from '../screens/AuthScreens/SignUpPhoneScreen';
import UpdatePassScreen from '../screens/UpdatePassScreen';

const RootStack = createStackNavigator();

const AuthStackScreen = () => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpPhoneScreen" component={SignUpPhoneScreen} />
    <RootStack.Screen name="SignUpFbGgScreen" component={SignUpFbGgScreen} />
    <RootStack.Screen name="OTPScreen" component={OTPScreen} />
    <RootStack.Screen name="UpdatePassScreen" component={UpdatePassScreen} />
  </RootStack.Navigator>
);

export default AuthStackScreen;
