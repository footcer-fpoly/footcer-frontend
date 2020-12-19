import React, {Component} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../../helpers/size.helper';
import Styles from '../../helpers/styles.helper';
import colors from '../../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator} from 'react-native-paper';

export default function SearchInput({onChangeText, onPress, onBlur, onReady}) {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onPress}
        style={styles.textInput}
        placeholder="Nhập tên sân bóng"
        onBlur={onBlur}
      />
      {!onReady ? (
        <ActivityIndicator style={styles.loading} color={colors.greenDark} />
      ) : (
        <TouchableOpacity onPress={onPress}>
          <MaterialIcons name="search" size={scale(25)} color={colors.black} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...Styles.borderView(colors.gray, 1, scale(50)),
    ...Styles.rowBetween,
    backgroundColor: colors.white,
    paddingLeft: scale(20),
    paddingRight: scale(10),
  },
  textInput: {
    flex: 1,
  },
  loading: {
    fontSize: scale(10),
  },
});
