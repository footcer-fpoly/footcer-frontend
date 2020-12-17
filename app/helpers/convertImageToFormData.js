import {Platform} from 'react-native';
import {Image} from 'react-native';

export const convertImageToFormData = (image, isLocalImage) => {
  let uri = isLocalImage
    ? Platform.OS === 'android'
      ? image.path
      : image.sourceURL.replace('file://', '')
    : Image.resolveAssetSource(image).uri;
  let imageName = '';
  if (isLocalImage) {
    const parts = image.path.split('/');
    imageName = parts[parts.length - 1];
  } else {
    imageName = uri.slice(uri.lastIndexOf('/') + 1, uri.indexOf('?'));
    uri = uri.slice(0, uri.indexOf('?'));
  }
  return {
    uri: uri,
    type: 'image/jpeg',
    name: imageName,
  };
};
