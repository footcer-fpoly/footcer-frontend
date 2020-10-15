import {
  GET_USER_PROFILE,
  LOGIN_REQUESTED,
  LOGOUT,
  REGISTER_REQUESTED,
  VERITY_REQUESTED,
} from './types';

export const logout = () => {
  return {type: LOGOUT};
};
export const requestRegister = ({authType, username}) => {
  return {
    type: REGISTER_REQUESTED,
    params: {authType, username},
  };
};
export const requestLogin = ({authType, username}) => {
  return {
    type: LOGIN_REQUESTED,
    params: {authType, username},
  };
};
export const requestVerify = ({otp_session_id, otp_token}) => {
  return {
    type: VERITY_REQUESTED,
    params: {otp_session_id, otp_token},
  };
};

export const getUserProfile = () => {
  return {
    type: GET_USER_PROFILE,
  };
};
