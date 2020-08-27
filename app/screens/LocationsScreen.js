import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  PermissionsAndroid,
  ToastAndroid,
  FlatList,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Item from '../components/locations/Item';
import AsyncStorage from '@react-native-community/async-storage';
import {GetStadiumLocation} from '../server/Stadium/server';
import Geolocation from 'react-native-geolocation-service';
import Loading from '../components/Loading';

export default function LocationsScreen({navigation}) {
  const [listStadium, setListStadium] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [token, setToken] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        setIsLoading(true);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const renderItem = ({item}) => <Item item={item} navigation={navigation} />;
  const GetPosition = async () => {
    await requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.log('code:', error.code, 'message:', error.message);
      },
    );
  };
  const GetToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setToken(userToken);
  };
  const GetStadium = async () => {
    if (latitude != null && (longitude != null) & (token != null)) {
      const data = await GetStadiumLocation({token, latitude, longitude});
      if (data.code === 200) {
        setIsLoading(false);
        return setListStadium(data.data);
      } else {
        setIsLoading(false);
        ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
      }
    }
  };
  useEffect(() => {
    GetPosition();
    GetToken();
    GetStadium();
  }, [longitude]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Loading visible={isLoading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listStadium}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
