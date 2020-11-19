import RequestHelper from '../helpers/request.helper';
import {
  GET_LIST_STADIUM,
  GET_STADIUM_COLLAGE_DETAIL,
  GET_STADIUM_DETAIL,
} from './api-url';

export const getListStadiumService = ({latitude, longitude}) => {
  return RequestHelper.get(GET_LIST_STADIUM({latitude, longitude}));
};
export const getStadiumDetailService = stadiumId => {
  return RequestHelper.get(GET_STADIUM_DETAIL(stadiumId));
};

export const getStadiumCollageDetailService = stadiumCollageId => {
  return RequestHelper.get(GET_STADIUM_COLLAGE_DETAIL(stadiumCollageId));
};
