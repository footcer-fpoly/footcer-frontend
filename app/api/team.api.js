import {convertImageToFormData} from '../helpers/convertImageToFormData';
import RequestHelper from '../helpers/request.helper';
import {
  ACCEPT_INVITE_TEAM,
  ADD_MEMBER_TEAM,
  CREATE_TEAM,
  DELETE_MEMBER_TEAM,
  DELETE_TEAM,
  GET_LIST_TEAM,
  GET_LIST_TEAM_FOR_USER,
  UPDATE_TEAM,
} from './api-url';

export const createTeamService = ({avatar, background, members, data}) => {
  const formData = new FormData();
  const imageAvatar = avatar ? convertImageToFormData(avatar, true) : null;
  const imageBackground = background
    ? convertImageToFormData(background, true)
    : null;
  formData.append('avatar', imageAvatar);
  formData.append('background', imageBackground);
  formData.append('name', data?.name);
  formData.append('place', data?.place);
  formData.append('description', data?.description);
  {
    members.trim().length && formData.append('memberList', members);
  }
  formData.append('level', data?.level);
  formData.append('folder', 'team');
  return RequestHelper.post(CREATE_TEAM, formData);
};

export const getListTeamForUserService = () => {
  return RequestHelper.get(GET_LIST_TEAM_FOR_USER);
};

export const getListTeamService = () => {
  return RequestHelper.get(GET_LIST_TEAM);
};

export const acceptInviteTeamService = ({
  userId,
  teamId,
  nameUser,
  nameTeam,
}) => {
  return RequestHelper.put(ACCEPT_INVITE_TEAM, {
    userId,
    teamId,
    nameUser,
    nameTeam,
  });
};

export const deleteTeamService = idTeam => {
  return RequestHelper.delete(DELETE_TEAM(idTeam));
};

export const deleteMemberService = ({userId, teamId, nameTeam}) => {
  return RequestHelper.delete(DELETE_MEMBER_TEAM, {
    userId,
    teamId,
    name: nameTeam,
  });
};

export const updateAvatarTeamService = ({avatar, teamId}) => {
  console.log('avatar: ', avatar);
  const formData = new FormData();
  const imageAvatar = convertImageToFormData(avatar, true);
  formData.append('folder', 'team');
  formData.append('teamId', teamId);
  formData.append('avatar', imageAvatar);
  return RequestHelper.put(UPDATE_TEAM, formData);
};

export const updateBackgroundTeamService = ({background, teamId}) => {
  const formData = new FormData();
  const imageBackground = convertImageToFormData(background, true);
  formData.append('folder', 'team');
  formData.append('teamId', teamId);
  formData.append('background', imageBackground);
  return RequestHelper.put(UPDATE_TEAM, formData);
};

export const updateInfoTeamService = data => {
  const formData = new FormData();
  formData.append('folder', 'team');
  formData.append('teamId', data.teamId);
  formData.append('description', data.description);
  formData.append('place', data.place);
  formData.append('level', data.level);
  formData.append('name', data.name);
  return RequestHelper.put(UPDATE_TEAM, formData);
};

export const addMemberTeamService = ({userId, teamId, nameTeam}) => {
  return RequestHelper.post(ADD_MEMBER_TEAM, {userId, teamId, name: nameTeam});
};
