import {GET_LIST_TEAM, GET_LIST_TEAM_SUCCESS} from './types';

export const getListTeam = () => {
  return {
    type: GET_LIST_TEAM,
  };
};

export const getListTeamSuccess = (data) => {
  return {
    type: GET_LIST_TEAM_SUCCESS,
    data,
  };
};
