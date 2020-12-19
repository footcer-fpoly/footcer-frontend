import {Alert, Linking} from 'react-native';

export const callPhone = (phone) => () => {
  console.log('callNumber ----> ', phone);
  if (phone) {
    const phoneNumber = `tel:${phone}`;
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Số điện thoại không khả dụng');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  }
};
