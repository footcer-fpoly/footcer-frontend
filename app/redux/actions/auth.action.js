import {LOGIN, LOGIN_REQUESTED, LOGOUT, REGISTER} from './types';

export const logout = () => {
  return {type: LOGOUT};
};
export const login = data => {
  return {type: LOGIN, data};
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
