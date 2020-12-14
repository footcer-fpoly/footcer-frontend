import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {numberWithCommas} from '../../helpers/format.helper';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import {body3, headline6, Text} from '../common/Text';

export default function ItemServeice({image, name, price}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imgService}
        source={{
          uri: image,
        }}
      />
      <Text type={body3} numberOfLines={1} style={styles.txtPrice}>
        {price ? numberWithCommas(price) : 'Miễm phí'}
      </Text>
      <Text type={headline6} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 90,
    paddingHorizontal: scale(10),
    marginTop: scale(10),
  },
  imgService: {
    ...Styles.borderRadiusCircle(60),
  },
  txtPrice: {
    marginTop: scale(5),
    color: colors.orange,
  },
});
