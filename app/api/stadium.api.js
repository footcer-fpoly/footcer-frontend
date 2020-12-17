import RequestHelper from '../helpers/request.helper';
import {
  GET_LIST_STADIUM,
  GET_STADIUM_COLLAGE_DETAIL,
  GET_STADIUM_DETAIL,
  REVIEW_STADIUM,
  SEARCH_STADIUM_NAME,
} from './api-url';

export const getListStadiumService = ({latitude, longitude}) => {
  return RequestHelper.get(GET_LIST_STADIUM({latitude, longitude}));
};
export const getStadiumDetailService = (stadiumId) => {
  return RequestHelper.get(GET_STADIUM_DETAIL(stadiumId));
};

export const getStadiumCollageDetailService = ({stadiumCollageId, date}) => {
  return RequestHelper.get(
    GET_STADIUM_COLLAGE_DETAIL({stadiumCollageId, date}),
  );
};

export const searchStadiumNameService = (name) => {
  return RequestHelper.get(SEARCH_STADIUM_NAME(name));
};

export const reviewStadiumService = ({stadiumId, content, rate}) => {
  return RequestHelper.post(REVIEW_STADIUM, {stadiumId, content, rate});
};
