import {SHOW_LOADING, HIDE_LOADING} from '../actions/types';

const loadingState = {
  loading: false,
};

export const loadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {...state, loading: true};
    case HIDE_LOADING:
      return {...state, loading: false};
    default:
      return state;
  }
};
