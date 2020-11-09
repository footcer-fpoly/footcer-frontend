import {removeToken, saveToken} from '../../helpers/storage.helper';
import {
  CHECK_LOGIN,
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_AVATAR_USER,
  UPDATE_INFO_USER,
} from '../actions/types';

const authState = {
  isLogedIn: false,
  listTeam: null,
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
