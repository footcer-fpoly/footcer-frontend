import {
  GET_USER_PROFILE_SUCCESS,
  LOGOUT_SUCCESS,
  VERITY_SUCCESS,
} from '../actions/types';

const authState = {
  isLogedIn: false,
  profile: {
    userId: '',
    phone: '',
    avatar: '',
    displayName: '',
  },
};

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...authState,
      };
    default:
      return state;
  }
};
