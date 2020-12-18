import {convertImageToFormData} from '../helpers/convertImageToFormData';
import RequestHelper from '../helpers/request.helper';
import {GET_NOTI_FOR_USER, SEARCH_PHONE_USER, UPDATE_USER} from './api-url';

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
export const updateAvatarUserService = ({avatar, phone}) => {
  const formData = new FormData();
  const imageAvatar = convertImageToFormData(avatar, true);
  formData.append('folder', 'user');
  formData.append('phone', phone);
  formData.append('files', imageAvatar);
  return RequestHelper.put(UPDATE_USER, formData);
};

export const searchPhoneUserService = (phone) => {
  return RequestHelper.post(SEARCH_PHONE_USER, {phone});
};

export const getNotiService = () => {
  return RequestHelper.get(GET_NOTI_FOR_USER);
};
