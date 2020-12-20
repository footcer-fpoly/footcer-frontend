import {Linking, Platform} from 'react-native';

export const direction = (
  latitude = 0,
  longitude = 0,
  label = 'Footcer',
) => async () => {
  const url = Platform.select({
    android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
  });
  const isLinkingSupport = await Linking.canOpenURL(url);
  if (isLinkingSupport) {
    Linking.openURL(url);
  } else {
    const urlGoogleMap = `https://www.google.com/maps/dir/Current+Location/${latitude},${longitude}`;
    Linking.openURL(urlGoogleMap);
  }
};
