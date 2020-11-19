import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemHeader from '../components/ItemHeader';
import StarRating from 'react-native-star-rating';
import {AddReview} from '../server/Review/server';
import AsyncStorage from '@react-native-community/async-storage';
import {ToastAndroid} from 'react-native';

export default function ReviewStadiumScreen({route, navigation}) {
  const {item} = route.params;
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState(null);
  const [token, setToken] = useState(null);
  const onStarRatingPress = rating => {
    setRating(rating);
  };

  const GetToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setToken(userToken);
  };

  const AddReviewStadium = async () => {
    if (token != null) {
      const stadiumId = item.stadiumId;
      const data = await AddReview({rating, stadiumId, content, token});
      if (data.code === 200) {
        ToastAndroid.show('Đã đánh giá thành công', ToastAndroid.SHORT);
        navigation.goBack();
      } else ToastAndroid.show('Có lỗi xảy ra!', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    GetToken();
  }, []);

  return (
    <View style={styles.container}>
      <ItemHeader titleHeader="Đánh giá sân" />
      <View style={styles.reviewContainer}>
        <Image
          style={{height: 97, width: 97, borderRadius: 97 / 2}}
          source={{
            uri: item.image,
          }}
        />
        <Text
          style={{
            color: '#FF5E0B',
            fontSize: 18,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          {item.stadiumName}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Icon name="place" color="#FF0000" size={15} />
          <Text style={{paddingLeft: 5, fontSize: 13}} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}
        />
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={rating => onStarRatingPress(rating)}
          fullStarColor={'#FFDF00'}
        />
        <TextInput
          placeholder="Đánh giá của bạn"
          multiline
          style={{
            fontSize: 15,
            color: '#676767',
            borderBottomWidth: 0.5,
            borderBottomColor: '#707070',
            width: '100%',
            padding: 10,
          }}
          value={content}
          onChangeText={content => setContent(content)}
        />
        <TouchableOpacity
          style={styles.btnReview}
          onPress={() => AddReviewStadium(rating, content)}>
          <Text style={{color: '#fff', fontSize: 16}}>GỬI ĐÁNH GIÁ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reviewContainer: {
    alignItems: 'center',
    padding: 20,
  },
  btnReview: {
    marginTop: 50,
    backgroundColor: '#0AB134',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
