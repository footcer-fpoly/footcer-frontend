import RequestHelper from '../helpers/request.helper';
import {CREATE_GAME, GET_GAME, GET_GAME_FOR_USER} from './api-url';

export const createGameService = ({
  date,
  hour,
  type,
  description,
  stadiumId,
  teamIdHost,
  orderId,
}) => {
  return RequestHelper.post(CREATE_GAME, {
    date,
    hour,
    type,
    score: '? - ?',
    description,
    stadiumId,
    teamIdHost,
    orderId,
  });
};

export const getGameService = params => {
  return RequestHelper.get(GET_GAME(params));
};
export const getGameForUserService = () => {
  return RequestHelper.get(GET_GAME_FOR_USER);
};
