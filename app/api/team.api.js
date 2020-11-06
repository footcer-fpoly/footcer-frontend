import {convertImageToFormData} from '../helpers/convertImageToFormData';
import RequestHelper from '../helpers/request.helper';
import {CREATE_TEAM, GET_LIST_TEAM_FOR_USER} from './api-url';

export const createTeamService = ({avatar, background, data}) => {
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
  formData.append('member', data?.member);
  formData.append('folder', 'team');
  return RequestHelper.post(CREATE_TEAM, formData);
};

export const getListTeamForUserService = () => {
  return RequestHelper.get(GET_LIST_TEAM_FOR_USER);
};
