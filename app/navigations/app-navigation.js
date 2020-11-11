import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {connect} from 'react-redux';
import ProfileDetailScreen from '../screens/account/profile-detail.screen';
import updatePassScreen from '../screens/account/update-pass.screen';
import OTPScreen from '../screens/auth/otp.screen';
import SignInScreen from '../screens/auth/sign-in.screen';
import SignUpFbGgScreen from '../screens/auth/sign-up-fb-gg.screen';
import SignUpPhoneScreen from '../screens/auth/sign-up-phone.screen';
import SplashScreen from '../screens/auth/splash.screen';
import CreateTeamScreen from '../screens/team/create-team.screen';
import TeamDetailScreen from '../screens/team/team-detail.screen';
import TestScreen from '../screens/test.screen';
import BottomTab from './bottom-tab.navigator';
import {navigationRef} from './root.navigator';
import {
  BOTTOM_TAB,
  CREATE_TEAM_SCREEN,
  DETAIL_PROFILE_SCREEN,
  OTP_SCREEN,
  SIGN_IN_SCREEN,
  SIGN_UP_FB_GG_SCREEN,
  SIGN_UP_SCREEN,
  SPLASH_SCREEN,
  TEAM_DETAIL_SCREEN,
  TEST_SCREEN,
  UPDATE_PASS_SCREEN,
} from './route-name';

const Stack = createStackNavigator();

const MainRouter = ({isLogedIn}) => {
  console.log('isLogedIn: ', isLogedIn);
  const renderAppRouter = () => {
    if (!isLogedIn) {
      return (
        <>
          <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
          <Stack.Screen name={SIGN_IN_SCREEN} component={SignInScreen} />
          <Stack.Screen name={SIGN_UP_SCREEN} component={SignUpPhoneScreen} />
          <Stack.Screen
            name={SIGN_UP_FB_GG_SCREEN}
            component={SignUpFbGgScreen}
          />
          <Stack.Screen name={OTP_SCREEN} component={OTPScreen} />
          <Stack.Screen
            name={UPDATE_PASS_SCREEN}
            component={updatePassScreen}
          />
        </>
      );
    }
    return (
      <>
        <Stack.Screen name={BOTTOM_TAB} component={BottomTab} />
        <Stack.Screen
          name={DETAIL_PROFILE_SCREEN}
          component={ProfileDetailScreen}
        />
        <Stack.Screen name={CREATE_TEAM_SCREEN} component={CreateTeamScreen} />
        <Stack.Screen name={TEAM_DETAIL_SCREEN} component={TeamDetailScreen} />
        <Stack.Screen name={TEST_SCREEN} component={TestScreen} />
      </>
    );
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none" initialRouteName={BOTTOM_TAB}>
        {renderAppRouter()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
function mapStateToProps(state) {
  return {
    isLogedIn: state.authState.isLogedIn,
  };
}

export default connect(
  mapStateToProps,
  null,
)(MainRouter);
