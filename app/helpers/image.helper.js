import {Platform} from 'react-native';
import {domain} from '../configs/app.config';

export const convertImageToFormData = (image, isLocalImage) => {
  const uri = isLocalImage
    ? Platform.OS === 'android'
      ? image.path
      : image.sourceURL.replace('file://', '')
    : domain + image.url;
  let imageName = '';
  if (isLocalImage) {
    const parts = image.path.split('/');
    imageName = parts[parts.length - 1];
  } else {
    imageName = image.name + image.ext;
  }
  return {
    uri: uri,
    type: image.mime,
    name: imageName,
    length: image.size,
  };
};
