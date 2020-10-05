import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import ItemHeader from '../components/ItemHeader2';
import ItemServeice from '../components/StadiumDetailScreenComponents/ItemServeice';
import ButtonDate from '../components/StadiumDetailScreenComponents/ButonModalDate';
import ChooseTime from '../components/StadiumDetailScreenComponents/ChooseTimeComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {GetStadiumID} from '../server/Stadium/server';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';

const DATA = [
  {
    time: '19:30',
    timeLimit: '30',
    price: '30000',
  },
  {
    time: '19:30',
    timeLimit: '30',
    price: '30000',
  },
  {
    time: '19:30',
    timeLimit: '30',
    price: '300000',
  },
  {
    time: '19:30',
    timeLimit: '30',
    price: '30000',
  },
  {
    time: '19:30',
    timeLimit: '30',
    price: '30000',
  },
  {
    time: '19:30',
    timeLimit: '30',
    price: '300000',
  },
];

const DATASERVICE = [
  {
    imgService: require('../assets/icons/energy_drink.png'),
    txtService: 'Nước uống',
  },
  {
    imgService: require('../assets/icons/jersey.png'),
    txtService: 'Áo thi đấu',
  },
  {
    imgService: require('../assets/icons/cleats.png'),
    txtService: 'Giày',
  },
  {
    imgService: require('../assets/icons/soccer_ball.png'),
    txtService: 'Bóng đá',
  },
  {
    imgService: require('../assets/icons/energy_drink.png'),
    txtService: 'Nước uống',
  },
];

export default function StadiumDetailScreen({route, navigation}) {
  const [address, setAddress] = useState([]);
  const [listReview, setListReview] = useState([]);
  const [rateCount, setRateCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const {item} = route.params;
  const lengthListReviews = listReview.length;

  const renderItemReview = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
      }}>
      <Image
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
        }}
        source={{uri: item.user.avatar}}
      />
      <View
        style={{marginLeft: 10, justifyContent: 'center', paddingVertical: 20}}>
        <View>
          <Text numberOfLines={1} style={{fontSize: 20}}>
            {item.user.displayName}
          </Text>
        </View>
        <View style={{width: 60}}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={item.rate}
            fullStarColor={'#FFDF00'}
            starSize={15}
          />
        </View>
        <View style={{width: '89%'}}>
          <Text>{item.content}</Text>
        </View>
      </View>
    </View>
  );

  const slpitAddress = async () => {
    const fullAddress = item.address;
    setAddress(fullAddress.split(', '));
  };

  const GetReview = async () => {
    const stadiumId = item.stadiumId;
    const userToken = await AsyncStorage.getItem('userToken');
    if ((stadiumId != null) & (userToken != null)) {
      const data = await GetStadiumID({userToken, stadiumId});
      if (data.code === 200) {
        setListReview(data.data.review);
        setRateCount(data.data.rateCount);
      } else {
        ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await GetReview();
    setRefreshing(false);
  };

  const renderChooseTime = ({item}) => (
    <ChooseTime
      time={item.time}
      price={item.price}
      timeLimit={item.timeLimit}
    />
  );
  const renderItemService = ({item}) => (
    <ItemServeice txtService={item.txtService} imgService={item.imgService} />
  );

  useEffect(() => {
    GetReview();
  }, []);
  useEffect(() => {
    slpitAddress();
  }, []);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#EDEDED'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
          style={styles.imgStadium}>
          <View style={styles.imgStadium} />
        </LinearGradient>
        <Image style={styles.imgStadium} source={{uri: item.image}} />
        <ItemHeader title="Chi tiết sân" navigation={navigation} />

        <View
          style={{
            margin: 10,
            marginTop: 50,
          }}>
          <Text style={styles.nameStadium}>{item.stadiumName}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={rateCount}
              fullStarColor={'#FFDF00'}
              starSize={20}
            />
            <Text style={{color: '#fff'}}>{rateCount}</Text>
            <TouchableOpacity
              style={styles.review}
              onPress={() => navigation.navigate('ReviewScreen', {item})}>
              <Text style={styles.txtReview}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 1, marginTop: 10}}>
        <View style={styles.viewSection}>
          <Text style={styles.title}>Giờ đấu</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ButtonDate />
            <TouchableOpacity style={styles.btnSize}>
              <Text style={styles.txtSize}>5 người</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSize}>
              <Text style={styles.txtSize}>7 người</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{marginTop: 10}}
            data={DATA}
            renderItem={renderChooseTime}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.viewSection}>
          <Text style={styles.title}>Dịch vụ</Text>
          <FlatList
            style={{marginTop: 10}}
            data={DATASERVICE}
            renderItem={renderItemService}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.viewSection}>
          <Text style={styles.title}>Thông tin sân</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={styles.txt}>Loại sân</Text>
            <Text style={styles.txtCategory}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.viewSection}>
          <Text style={styles.title}>Địa chỉ</Text>
          <View style={styles.address}>
            <Text style={styles.txt}>Tỉnh/Thành Phố</Text>
            <Text style={styles.txtCategorys}>{address[3]}</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.txt}>Quận/Huyện</Text>
            <Text style={styles.txtCategory}>{address[2]}</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.txt}>Xã/Phường</Text>
            <Text style={styles.txtCategory}>{address[1]}</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.txt}>Đường</Text>
            <Text style={styles.txtCategory}>{address[0]}</Text>
          </View>
          <TouchableOpacity style={styles.btnBooking}>
            <Text style={styles.txtBooking}>Đặt Sân</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewSection}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.title}>Đánh giá</Text>
            <Text> ({lengthListReviews})</Text>
          </View>
          <FlatList
            data={listReview}
            renderItem={renderItemReview}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgStadium: {
    height: 200,
    width: '100%',
    position: 'absolute',
  },
  transparent: {
    height: 200,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  nameStadium: {
    bottom: 0,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  review: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    marginLeft: 10,
  },
  txtReview: {
    color: '#fff',
    fontSize: 14,
  },
  viewSection: {
    // flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  btnSize: {
    fontSize: 13,
    marginLeft: 10,
    color: '#676767',
    marginTop: 10,
  },
  chooseTime: {
    borderWidth: 1,
    borderColor: '#676767',
    borderRadius: 5,
  },
  txtSize: {
    fontSize: 13,
    color: '#676767',
  },
  txt: {fontSize: 14, color: '#676767'},
  txtCategory: {fontSize: 14},
  address: {
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  txtBooking: {
    fontSize: 16,
    color: '#fff',
  },
  btnBooking: {
    backgroundColor: '#FF5E0B',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
  },
});
