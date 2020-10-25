import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
// import TabbarComponent from '../components/common/TabbarComponent';
import TabbarIcon from '../components/common/TabbarIcon';
import HomeScreen from '../screens/home/home.screen';
import FindOpponentScreen from '../screens/opponent/find-opponent.screen';
import BookFieldScreen from '../screens/field/book-field.screen';
import AccountScreen from '../screens/account/account.screen';
import {
  ACCOUNT_SCREEN,
  HOME_SCREEN,
  BOOK_FIELD,
  FIND_OPPONENT_SCREEN,
} from './route-name';
import TabbarComponent from '../components/common/TabbarComponent';
import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTab = ({profile}) => {
  const generatorIconName = routeName => {
    switch (routeName) {
      case HOME_SCREEN:
        return {type: 'icon', name: 'home-outline'};
      case BOOK_FIELD:
        return {type: 'icon', name: 'home-outline'};
      case FIND_OPPONENT_SCREEN:
        return {
          type: 'icon',
          name: 'home-outline',
        };
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
        name={BOOK_FIELD}
        component={BookFieldScreen}
        options={{
          tabBarLabel: 'Đặt sân',
        }}
      />
      <Tab.Screen
        name={FIND_OPPONENT_SCREEN}
        component={FindOpponentScreen}
        options={{
          tabBarLabel: 'Tìm đối',
        }}
      />
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
