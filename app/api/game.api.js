import RequestHelper from '../helpers/request.helper';
import {CREATE_GAME, GET_GAME} from './api-url';

export const createGameService = ({
  date,
  hour,
  type,
  description,
  stadiumId,
  teamIdHost,
}) => {
  return RequestHelper.post(CREATE_GAME, {
    date,
    hour,
    type,
    score: '? - ?',
    description,
    stadiumId,
    teamIdHost,
  });
};

export const getGameService = params => {
  return RequestHelper.get(GET_GAME(params));
};
