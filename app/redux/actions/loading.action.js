import {SHOW_LOADING, HIDE_LOADING} from './types';

export const showLoading = () => {
  return {type: SHOW_LOADING};
};

export const hideLoading = () => {
  return {type: HIDE_LOADING};
};
