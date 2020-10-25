import {Platform} from 'react-native';
import RequestHelper from '../helpers/request.helper';
import {UPDATE_USER} from './api-url';

export const updateUserService = ({
  avatar,
  displayName,
  position,
  level,
  birthday,
  phone,
}) => {
  console.log('avatar: ', avatar.path);
  const formData = new FormData();
  formData.append('files', {
    uri:
      Platform.OS === 'android'
        ? avatar?.path
        : avatar?.sourceURL.replace('file://', ''),
    type: 'image/jpeg',
  });
  formData.append('folder', 'user');
  formData.append('displayName', displayName);
  formData.append('position', position);
  formData.append('level', level);
  formData.append('birthday', birthday);
  formData.append('phone', phone);
  return RequestHelper.put(UPDATE_USER, formData);
};
