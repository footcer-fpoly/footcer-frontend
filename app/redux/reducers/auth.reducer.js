import {removeToken, saveToken} from '../../helpers/storage.helper';
import {
  ACCEPT_PERMISSION_LOCATION,
  CHECK_LOGIN,
  GET_LIST_ORDER_SUCCESS,
  LOGIN,
  LOGOUT,
  REFUSE_PERMISSION_LOCATION,
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
  isPermissionsLocation: false,
  listOrder: [],
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
        ...state,
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
    case ACCEPT_PERMISSION_LOCATION:
      return {
        ...state,
        isPermissionsLocation: true,
      };
    case REFUSE_PERMISSION_LOCATION:
      return {
        ...state,
        isPermissionsLocation: false,
      };
    case GET_LIST_ORDER_SUCCESS:
      return {
        ...state,
        listOrder: action.data,
      };
    default:
      return state;
  }
};
