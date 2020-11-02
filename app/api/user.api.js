import {convertImageToFormData} from '../helpers/image.helper';
import RequestHelper from '../helpers/request.helper';
import {UPDATE_USER} from './api-url';

export const updateInfoUserService = ({
  displayName,
  position,
  level,
  birthday,
  phone,
}) => {
  const formData = new FormData();
  formData.append('folder', 'user');
  formData.append('displayName', displayName);
  formData.append('position', position);
  formData.append('level', level);
  formData.append('birthday', birthday);
  formData.append('phone', phone);
  return RequestHelper.put(UPDATE_USER, formData);
};
export const updateAvatarUserService = ({avatar}) => {
  const formData = new FormData();
  const imageAvatar = convertImageToFormData(avatar, true);
  formData.append('folder', 'user');
  formData.append('phone', '0903585177');
  formData.append('files', imageAvatar);
  return RequestHelper.put(UPDATE_USER, formData);
};
