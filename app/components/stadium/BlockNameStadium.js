import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {body3, headline4, Text} from '../common/Text';

export default function BlockNameStadium({name, star}) {
  return (
    <View style={styles.container}>
      <Text type={headline4} style={styles.txtName}>
        {name}
      </Text>
      <StarRating
        disabled={true}
        maxStars={5}
        rating={star}
        fullStarColor={colors.yellow}
        starSize={20}
        containerStyle={styles.star}
      />
      <Text type={body3}>{star || 0}/5</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.columnCenter,
    backgroundColor: colors.white,
    borderRadius: scale(8),
    paddingHorizontal: scale(24),
    marginTop: scale(-40),
    marginHorizontal: scale(20),
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: scale(4),
    elevation: 2,
    zIndex: 1,
    paddingVertical: scale(10),
  },
  txtName: {
    marginBottom: scale(10),
    color: colors.orange,
  },
  star: {
    width: 120,
  },
});
