import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {scale} from '../../helpers/size.helper';
import colors from '../../theme/colors';

export default function TextError({text, style}) {
  return (
    <Animatable.Text animation="fadeInLeft" style={[styles.colorErr, style]}>
      {text}
    </Animatable.Text>
  );
}
const styles = StyleSheet.create({
  colorErr: {
    color: colors.error,
    marginLeft: scale(20),
  },
});
