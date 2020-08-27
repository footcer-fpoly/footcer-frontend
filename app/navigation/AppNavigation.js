import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ApplicationProvider} from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import * as eva from '@eva-design/eva';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LocationsScreen from '../screens/LocationsScreen';
import ViewLocations from '../screens/ViewLocationScreen';
import CompetitorScreen from '../screens/CompetitorScreen';
import CompetitorDetails from '../screens/CompetitorDetails';
import InforScreen from '../screens/InforScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';
import AuthStackScreen from './AuthStackScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './AuthContext';
import Spinner from 'react-native-spinkit';
import {View, StatusBar} from 'react-native';
import StadiumDetailScreen from '../screens/StadiumDetailScreen';
import ReviewScreen from '../screens/ReviewScreen';

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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Infor" component={InforScreen} />
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

            return <Feather name={iconName} size={size} color={color} />;
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

const MainNavigation = () => {
  const initialLoginState = {
    isLoading: true,
    dataUser: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          dataUser: action.data,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          dataUser: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          dataUser: action.data,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(() => ({
    signIn: async User => {
      const userToken = String(User.token);
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGIN', data: User, token: userToken});
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: async User => {
      const userToken = String(User.token);
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', data: User, token: userToken});
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token !== null) {
          userToken = token;
        }
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 0);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00C27F',
        }}>
        <StatusBar backgroundColor={'#00C27F'} barStyle="light-content" />
        <Spinner
          isVisible={true}
          size={80}
          type={'9CubeGrid'}
          color={'white'}
        />
        <Animatable.Text
          style={{
            fontSize: 15,
            color: 'white',
            marginTop: 20,
          }}
          animation="zoomIn"
          duraton="1500">
          Waitings ...
        </Animatable.Text>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Dashboard" component={BottomNavigation} />
              <Stack.Screen
                name="StadiumDetail"
                component={StadiumDetailScreen}
              />
              <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
            </Stack.Navigator>
          ) : (
            <AuthStackScreen />
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
};
export default MainNavigation;
