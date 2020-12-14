import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Styles from '../../helpers/styles.helper';
import {formatToDate} from '../../helpers/format.helper';
import Avatar from '../common/Avatar';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';
import {body3, Text} from '../common/Text';
import StarRating from 'react-native-star-rating';

export default function CardReview({item}) {
  return (
    <View style={styles.container}>
      <View style={styles.warpperAvatar}>
        <Avatar image={item.user.avatar} size={scale(40)} />
        <Text type={body3} style={styles.txtName}>
          {item.user.displayName}
        </Text>
      </View>
      <View style={styles.warpperRating}>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={item.rate}
          fullStarColor={colors.yellow}
          starSize={10}
          containerStyle={styles.star}
        />
        <Text type={body3} style={styles.txtDate}>
          {formatToDate(item.updated_at)}
        </Text>
      </View>
      <Text type={body3} style={styles.txtContent}>
        {item.content}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
    borderBottomWidth: scale(0.5),
    borderBottomColor: colors.gray,
    padding: scale(10),
  },
  warpperAvatar: {
    ...Styles.rowAlignCenter,
  },
  txtName: {
    marginLeft: scale(15),
  },
  warpperRating: {
    ...Styles.rowAlignCenter,
    marginTop: scale(10),
  },
  txtDate: {
    marginLeft: scale(10),
    color: colors.gray,
  },
  star: {
    width: 70,
  },
  txtContent: {
    marginTop: scale(5),
    color: colors.gray,
  },
});
