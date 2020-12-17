import {GET_DOMAIN} from '../actions/types';

const appState = {
  domain: '',
};

export const appReducer = (state = appState, action) => {
  switch (action.type) {
    case GET_DOMAIN:
      return {...state, domain: action.url};
    default:
      return state;
  }
};
