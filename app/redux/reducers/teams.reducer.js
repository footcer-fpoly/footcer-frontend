import {GET_LIST_TEAM_SUCCESS} from '../actions/types';

const authState = {
  listTeam: null,
};

export const teamsReducer = (state = authState, action) => {
  switch (action.type) {
    case GET_LIST_TEAM_SUCCESS:
      const newList = action.data.reverse();
      return {
        ...state,
        listTeam: newList,
      };
    default:
      return state;
  }
};
