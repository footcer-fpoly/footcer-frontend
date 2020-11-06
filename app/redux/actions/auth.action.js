import {
  LOGIN,
  LOGIN_REQUESTED,
  LOGOUT,
  REGISTER,
  CHECK_LOGIN,
  UPDATE_AVATAR_USER,
  UPDATE_INFO_USER,
  GET_LIST_TEAM,
  GET_LIST_TEAM_SUCCESS,
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

export const getListTeam = () => {
  return {
    type: GET_LIST_TEAM,
  };
};

export const getListTeamSuccess = data => {
  return {
    type: GET_LIST_TEAM_SUCCESS,
    data,
  };
};
