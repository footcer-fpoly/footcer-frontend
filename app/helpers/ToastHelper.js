import React from 'react';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-easy-toast';
import colors from '../theme/colors';

export class ToastHelper {
  static toast;
  static setToast(toast) {
    this.toast = toast;
  }
  static showToast = (
    message,
    backgroundColor = colors.black,
    duration = 500,
  ) => {
    this.toast?.show(message, duration, backgroundColor);
  };
  static ToastContainer() {
    return (
      <Toast
        ref={ref => ToastHelper.setToast(ref)}
        positionValue={100}
        fadeInDuration={750}
        fadeOutDuration={2000}
        textStyle={styles.toastText}
        useNativeDriver={true}
        style={styles.toast}
      />
    );
  }
}

const styles = StyleSheet.create({
  // toast: {
  //   backgroundColor: colors.green,
  // },
  toastText: {color: colors.white},
});
