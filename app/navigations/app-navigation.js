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
import CreateGameScreen from '../screens/game/create-game.screen';
import GameDetailScreen from '../screens/game/game-detail.screen';
import NotificationScreen from '../screens/notification.screen';
import ListOrderScreen from '../screens/order/list-order.screen';
import orderDetailScreen from '../screens/order/order-detail.screen';
import ReviewStadiumScreen from '../screens/stadium/review-stadium.screen';
import StadiumCollageDetailScreen from '../screens/stadium/stadium-collage-detail.screen';
import StadiumDetailScreen from '../screens/stadium/stadium-detail.screen';
import CreateTeamScreen from '../screens/team/create-team.screen';
import TeamDetailScreen from '../screens/team/team-detail.screen';
import TeamScreen from '../screens/team/team.screen';
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
  CREATE_GAME_SCREEN,
  GAME_DETAIL_SCREEN,
  TEAM_SCREEN,
  NOTIFICATION_SCREEN,
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
        <Stack.Screen name={UPDATE_PASS_SCREEN} component={updatePassScreen} />
        <Stack.Screen name={OTP_SCREEN} component={OTPScreen} />
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
        <Stack.Screen
          name={ORDER_DETAIL_SCREEN}
          component={orderDetailScreen}
        />
        <Stack.Screen name={CREATE_GAME_SCREEN} component={CreateGameScreen} />
        <Stack.Screen name={GAME_DETAIL_SCREEN} component={GameDetailScreen} />
        <Stack.Screen name={TEAM_SCREEN} component={TeamScreen} />
        <Stack.Screen
          name={NOTIFICATION_SCREEN}
          component={NotificationScreen}
        />
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
