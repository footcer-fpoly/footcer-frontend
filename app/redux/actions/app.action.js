import {GET_DOMAIN} from './types';

export const getDomain = url => {
  return {type: GET_DOMAIN, url};
};
