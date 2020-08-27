import React, {useState} from 'react';
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

export default function ReviewScreen({route, navigation}) {
  const {item} = route.params;
  const [rating, setRating] = useState(5);
  const onStarRatingPress = rating => {
    setRating(rating);
    console.log(rating);
  };
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
          style={{
            fontSize: 15,
            color: '#676767',
            borderBottomWidth: 0.5,
            borderBottomColor: '#707070',
            width: '100%',
            padding: 10,
          }}
        />
        <TouchableOpacity style={styles.btnReview}>
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
