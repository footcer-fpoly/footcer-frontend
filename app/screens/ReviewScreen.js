import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ItemHeader from '../components/ItemHeader';
import StarRating from 'react-native-star-rating';

export default class ReviewScreen extends Component {
  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }
  render() {
    const addressStadium = '30 Phan Thúc Duyện, Tân Bình';
    const nameStadium = 'Sân bóng Chảo Lửa';
    const urlImgStadium =
      'https://www.foreverlawn.com/wp-content/uploads/2019/01/DSC_0006.jpg';
    const {rating} = this.props;
    return (
      <View style={styles.container}>
        <ItemHeader titleHeader="Đánh giá sân" />
        <View style={styles.reviewContainer}>
          <Image
            style={{height: 97, width: 97, borderRadius: 97 / 2}}
            source={{
              uri: urlImgStadium,
            }}
          />
          <Text style={{color: '#FF5E0B', fontSize: 16, marginTop: 10}}>
            {nameStadium}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Icon name="place" color="#FF0000" size={15} />
            <Text style={{paddingLeft: 5, fontSize: 13}} numberOfLines={1}>
              {addressStadium}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <AirbnbRating reviews={[]} />
          </View>
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
