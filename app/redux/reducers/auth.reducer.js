import {removeToken, saveToken} from '../../helpers/storage.helper';
import {LOGIN, LOGOUT, REGISTER} from '../actions/types';

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
    case LOGOUT:
      removeToken();
      return {
        ...authState,
      };
    default:
      return state;
  }
};
