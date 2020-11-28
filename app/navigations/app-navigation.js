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
import ListOrderScreen from '../screens/order/list-order.screen';
import orderDetail from '../screens/order/order-detail';
import ReviewStadiumScreen from '../screens/review-stadium.screen';
import StadiumCollageDetailScreen from '../screens/stadium/stadium-collage-detail.screen';
import StadiumDetailScreen from '../screens/stadium/stadium-detail.screen';
import CreateTeamScreen from '../screens/team/create-team.screen';
import TeamDetailScreen from '../screens/team/team-detail.screen';
import TestScreen from '../screens/test.screen';
import BottomTab from './bottom-tab.navigator';
import {navigationRef} from './root.navigator';
import {
  LIST_ORDER_SCREEN,
  BOTTOM_TAB,
  CREATE_TEAM_SCREEN,
  DETAIL_PROFILE_SCREEN,
  OTP_SCREEN,
  REVIEW_STADIUM_SCREEN,
  SIGN_IN_SCREEN,
  SIGN_UP_FB_GG_SCREEN,
  SIGN_UP_SCREEN,
  SPLASH_SCREEN,
  STADIUM_COLLAGE_DETAIL_SCREEN,
  STADIUM_DETAIL_SCREEN,
  TEAM_DETAIL_SCREEN,
  TEST_SCREEN,
  UPDATE_PASS_SCREEN,
  ORDER_DETAIL_SCREEN,
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
        <Stack.Screen
          name={STADIUM_DETAIL_SCREEN}
          component={StadiumDetailScreen}
        />
        <Stack.Screen
          name={REVIEW_STADIUM_SCREEN}
          component={ReviewStadiumScreen}
        />
        <Stack.Screen name={TEST_SCREEN} component={TestScreen} />
        <Stack.Screen
          name={STADIUM_COLLAGE_DETAIL_SCREEN}
          component={StadiumCollageDetailScreen}
        />
        <Stack.Screen name={LIST_ORDER_SCREEN} component={ListOrderScreen} />
        <Stack.Screen name={ORDER_DETAIL_SCREEN} component={orderDetail} />
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
