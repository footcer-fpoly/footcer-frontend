import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {connect} from 'react-redux';
import TabbarComponent from '../components/common/TabbarComponent';
// import TabbarComponent from '../components/common/TabbarComponent';
import TabbarIcon from '../components/common/TabbarIcon';
import AccountScreen from '../screens/account/account.screen';
import ListGameScreen from '../screens/game/list-game.screen';
import HomeScreen from '../screens/home/home.screen';
import NotificationScreen from '../screens/notification.screen';
import stadiumScreen from '../screens/stadium/stadium.screen';
import {
  ACCOUNT_SCREEN,
  HOME_SCREEN,
  LIST_GAME_SCREEN,
  NOTIFICATION_SCREEN,
  STADIUM_SCREEN,
} from './route-name';

const Tab = createBottomTabNavigator();

const BottomTab = ({profile}) => {
  const generatorIconName = routeName => {
    switch (routeName) {
      case HOME_SCREEN:
        return {type: 'icon', name: 'home-outline'};
      case STADIUM_SCREEN:
        return {type: 'icon', name: 'book-open'};
      case LIST_GAME_SCREEN:
        return {
          type: 'icon',
          name: 'sword-cross',
        };
      // case NOTIFICATION_SCREEN:
      //   return {
      //     type: 'icon',
      //     name: 'bell',
      //   };
      case ACCOUNT_SCREEN:
        return {
          type: 'image',
          url: profile.avatar,
        };
      default:
        break;
    }
  };

  return (
    <Tab.Navigator
      tabBar={props => <TabbarComponent {...props} />}
      backBehavior={'initialRoute'}
      initialRouteName={HOME_SCREEN}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const iconTab = generatorIconName(route.name);
          return <TabbarIcon iconTab={iconTab} focused={focused} />;
        },
      })}>
      <Tab.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trag chủ',
        }}
      />
      <Tab.Screen
        name={STADIUM_SCREEN}
        component={stadiumScreen}
        options={{
          tabBarLabel: 'Đặt sân',
        }}
      />
      <Tab.Screen
        name={LIST_GAME_SCREEN}
        component={ListGameScreen}
        options={{
          tabBarLabel: 'Trận đấu',
        }}
      />
      {/* <Tab.Screen
        name={NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Thông báo',
        }}
      /> */}
      <Tab.Screen
        name={ACCOUNT_SCREEN}
        component={AccountScreen}
        options={{
          tabBarLabel: profile.displayName,
        }}
      />
    </Tab.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    profile: state.authState.profile,
  };
}

export default connect(
  mapStateToProps,
  null,
)(BottomTab);
