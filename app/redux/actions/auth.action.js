import {
  CHECK_LOGIN,
  LOGIN,
  LOGIN_REQUESTED,
  LOGOUT,
  REGISTER,
  UPDATE_AVATAR_USER,
  UPDATE_INFO_USER,
  ACCEPT_PERMISSION_LOCATION,
  REFUSE_PERMISSION_LOCATION,
  REQUESTED_PERMISSION_LOCATION,
  GET_LIST_ORDER,
  GET_LIST_ORDER_SUCCESS,
} from './types';

export const logout = () => {
  return {type: LOGOUT};
};
export const login = data => {
  return {type: LOGIN, data};
};
export const checkIsLogin = () => {
  return {type: CHECK_LOGIN};
};
export const register = data => {
  return {type: REGISTER, data};
};
export const requestLogin = ({authType, phone, password}) => {
  return {
    type: LOGIN_REQUESTED,
    params: {authType, phone, password},
  };
};

export const updateAvatarUser = avatar => {
  return {
    type: UPDATE_AVATAR_USER,
    avatar,
  };
};

export const updateInfoUser = data => {
  return {
    type: UPDATE_INFO_USER,
    data,
  };
};
export const requestPermissionLocation = () => {
  return {
    type: REQUESTED_PERMISSION_LOCATION,
  };
};
export const acceptPermissionLocation = () => ({
  type: ACCEPT_PERMISSION_LOCATION,
});

export const refusePermissionLocation = () => ({
  type: REFUSE_PERMISSION_LOCATION,
});

export const getListOrder = () => ({
  type: GET_LIST_ORDER,
});
export const getListOrderSuccess = data => ({
  type: GET_LIST_ORDER_SUCCESS,
  data,
});
