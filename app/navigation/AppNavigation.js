import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LocationsScreen from '../screens/LocationsScreen';
import ViewLocations from '../screens/ViewLocationScreen';
import SplashScreen from '../screens/SplashScreen';
import OTPScreen from '../screens/OTPScreen';
import FillInfoScreen from '../screens/FillInfoScreen';
import CompetitorScreen from '../screens/CompetitorScreen';
import CompetitorDetails from '../screens/CompetitorDetails';
import InforScreen from '../screens/InforScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class HomeStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="MainDetails" component={DetailsScreen} />
      </Stack.Navigator>
    );
  }
}

class LocationStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Location"
          component={LocationsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ViewLocations" component={ViewLocations} />
      </Stack.Navigator>
    );
  }
}

class CompetitorStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Competitor"
          component={CompetitorScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="CompetitorDetails" component={CompetitorDetails} />
      </Stack.Navigator>
    );
  }
}

class UserStack extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Infor"
          component={InforScreen}
        />
        <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
      </Stack.Navigator>
    );
  }
}

class BottomNavigation extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Locations') {
              iconName = 'navigation';
            } else if (route.name === 'Competitors') {
              iconName = 'users';
            } else if (route.name === 'Information') {
              iconName = 'user';
            }

            return (
              <Feather name={iconName} size={size} color={color} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0AB134',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Locations" component={LocationStack} />
        <Tab.Screen name="Competitors" component={CompetitorStack} />
        <Tab.Screen name="Information" component={UserStack} />
      </Tab.Navigator>
    );
  }
}

export default class MainNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={BottomNavigation} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          <Stack.Screen name="FillInfoScreen" component={FillInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
