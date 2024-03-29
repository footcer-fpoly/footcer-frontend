import {AppConfig} from '../configs/app.config';

const ROOT_API_URL = AppConfig.apiUrl;
//API AUTH
export const CHECK_VALID_PHONE = `${ROOT_API_URL}/users/valid-phone`;
export const CHECK_UUID = `${ROOT_API_URL}/users/valid-uuid`;
export const SIGN_UP_PHONE = `${ROOT_API_URL}/users/sign-up-phone`;
export const SIGN_IN_PHONE = `${ROOT_API_URL}/users/sign-in-phone`;
export const SIGN_UP_FB_GG = `${ROOT_API_URL}/users/sign-in`;
export const UPDATE_PASS = `${ROOT_API_URL}/users/change-password`;

//API USER
export const GET_USER_PROFILE = `${ROOT_API_URL}/users/profile`;
export const SEARCH_PHONE_USER = `${ROOT_API_URL}/team/search-phone`;
export const UPDATE_USER = `${ROOT_API_URL}/users/update`;

//API TEAM
export const CREATE_TEAM = `${ROOT_API_URL}/team/add`;
export const GET_LIST_TEAM_FOR_USER = `${ROOT_API_URL}/team/for-user-accept`;
export const UPDATE_TEAM = `${ROOT_API_URL}/team/update`;
export const DELETE_TEAM = idTeam =>
  `${ROOT_API_URL}/team/delete-team/${idTeam}`;
export const ADD_MEMBER_TEAM = `${ROOT_API_URL}/team/add-member`;
export const DELETE_MEMBER_TEAM = `${ROOT_API_URL}/team/delete-member`;
export const GET_LIST_TEAM = `${ROOT_API_URL}/team/for-user-reject`;
export const ACCEPT_INVITE_TEAM = `${ROOT_API_URL}/team/accept-invite`;

//API STADIUM
export const GET_LIST_STADIUM = ({latitude, longitude}) =>
  `${ROOT_API_URL}/stadium/search-location?latitude=${latitude}&longitude=${longitude}`;
export const GET_STADIUM_DETAIL = stadiumId =>
  `${ROOT_API_URL}/stadium/info-id/${stadiumId}`;
export const GET_STADIUM_COLLAGE_DETAIL = ({stadiumCollageId, date}) =>
  `${ROOT_API_URL}/stadium/collage-details/?stadiumCollageId=${stadiumCollageId}&date=${date}`;
export const SEARCH_STADIUM_NAME = name =>
  `${ROOT_API_URL}/stadium/search-name/${name}`;
export const REVIEW_STADIUM = `${ROOT_API_URL}/review/add`;

//API ORDER
export const ADD_ORDER = `${ROOT_API_URL}/order/add`;
export const GET_LIST_ORDER = `${ROOT_API_URL}/order/user`;
export const GET_ORDER_DETAIL = orderId => `${ROOT_API_URL}/order/${orderId}`;
export const CANCEL_ORDER = `${ROOT_API_URL}/order/update-status`;

//GAME
export const GET_GAME = params => `${ROOT_API_URL}/game/gets/${params}`;
export const CREATE_GAME = `${ROOT_API_URL}/game/add`;
export const GET_GAME_FOR_USER = `${ROOT_API_URL}/game/for-user`;
