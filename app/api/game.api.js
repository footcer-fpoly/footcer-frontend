import RequestHelper from '../helpers/request.helper';
import {
  ACCEPT_INVITE_GAME,
  CREATE_GAME,
  DELETE_GAME,
  GET_GAME,
  GET_GAME_DETAIL,
  GET_GAME_FOR_USER,
  JOIN_GAME,
  REFUSE_INVITE_GAME,
  UPDATE_GAME,
} from './api-url';

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

export const updateGameService = ({
  gameId,
  date,
  hour,
  type,
  description,
  stadiumId,
  teamIdHost,
  orderId,
}) => {
  return RequestHelper.put(UPDATE_GAME, {
    gameId,
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

export const getGameService = (params) => {
  return RequestHelper.get(GET_GAME(params));
};
export const getGameForUserService = () => {
  return RequestHelper.get(GET_GAME_FOR_USER);
};
export const getGameDetailService = (gameId) => {
  return RequestHelper.get(GET_GAME_DETAIL(gameId));
};
export const deleteGameService = (gameId) => {
  return RequestHelper.delete(DELETE_GAME(gameId));
};
export const joinGameService = ({
  gameId,
  teamId,
  userNotifyId,
  nameHost,
  nameInvite,
}) => {
  return RequestHelper.post(JOIN_GAME, {
    gameId,
    teamId,
    userNotifyId,
    nameHost,
    nameInvite,
  });
};

export const acceptInviteGameService = ({
  gameId,
  teamId,
  userNotiyId,
  name,
}) => {
  return RequestHelper.post(ACCEPT_INVITE_GAME, {
    gameId,
    teamId,
    userNotiyId,
    name,
  });
};

export const refuseInviteGameService = ({
  gameId,
  teamId,
  userNotiyId,
  name,
}) => {
  return RequestHelper.post(REFUSE_INVITE_GAME, {
    gameId,
    teamId,
    userNotiyId,
    name,
  });
};
