import RequestHelper from '../helpers/request.helper';
import {
  CHECK_VALID_PHONE,
  CHECK_UUID,
  SIGN_UP_PHONE,
  SIGN_IN_PHONE,
  SIGN_UP_FB_GG,
  UPDATE_PASS,
  UPDATE_NOTI_TOKEN,
} from './api-url';

export const checkValidPhoneService = (phone) => {
  return RequestHelper.post(CHECK_VALID_PHONE, {phone});
};
export const checkUUIDService = (userId) => {
  return RequestHelper.post(CHECK_UUID, {userId});
};

export const signUpPhoneService = (data) => {
  return RequestHelper.post(SIGN_UP_PHONE, {
    phone: data.phone,
    avatar: '/user/avatar.png',
    password: data.password,
    displayName: data.name,
  });
};
export const signInPhoneService = (phone, password) => {
  return RequestHelper.post(SIGN_IN_PHONE, {phone, password});
};
export const signUpFbGgService = (data) => {
  return RequestHelper.post(SIGN_UP_FB_GG, {
    phone: data.phone,
    avatar: data.image,
    displayName: data.name,
    userId: data.id,
  });
};
export const updatePassService = (phone, password) => {
  return RequestHelper.put(UPDATE_PASS, {phone, password});
};

export const updateNotiTokenService = (tokenNotify) => {
  return RequestHelper.put(UPDATE_NOTI_TOKEN, {tokenNotify});
};
