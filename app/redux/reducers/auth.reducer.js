import {removeToken, saveToken} from '../../helpers/storage.helper';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_LOGIN,
  UPDATE_INFO_USER,
  UPDATE_AVATAR_USER,
} from '../actions/types';

const authState = {
  isLogedIn: false,
  profile: {
    userId: null,
    phone: '',
    avatar: null,
    displayName: '',
    birthday: '',
    position: '',
    level: '',
  },
};

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      const profile = {...action.data};
      saveToken(profile?.token);
      return {
        ...state,
        isLogedIn: true,
        profile,
      };
    case CHECK_LOGIN:
      return {
        ...state,
        isLogedIn: true,
      };
    case LOGOUT:
      removeToken();
      return {
        ...authState,
      };

    case UPDATE_INFO_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          phone: action.data.phone,
          displayName: action.data.displayName,
          birthday: action.data.birthday,
          position: action.data.position,
          level: action.data.level,
        },
      };
    case UPDATE_AVATAR_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          avatar: action.avatar,
        },
      };
    default:
      return state;
  }
};
