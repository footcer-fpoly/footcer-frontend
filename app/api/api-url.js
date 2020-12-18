//API AUTH
export const CHECK_VALID_PHONE = '/users/valid-phone';
export const CHECK_UUID = '/users/valid-uuid';
export const SIGN_UP_PHONE = '/users/sign-up-phone';
export const SIGN_IN_PHONE = '/users/sign-in-phone';
export const SIGN_UP_FB_GG = '/users/sign-in';
export const UPDATE_PASS = '/users/change-password';
export const UPDATE_NOTI_TOKEN = '/users/update-notify';

//API USER
export const GET_USER_PROFILE = '/users/profile';
export const SEARCH_PHONE_USER = '/team/search-phone';
export const UPDATE_USER = '/users/update';
export const GET_NOTI_FOR_USER = '/notification/get';

//API TEAM
export const CREATE_TEAM = '/team/add';
export const GET_LIST_TEAM_FOR_USER = '/team/for-user-accept';
export const UPDATE_TEAM = '/team/update';
export const DELETE_TEAM = (idTeam) => `/team/delete-team/${idTeam}`;
export const ADD_MEMBER_TEAM = '/team/add-member';
export const DELETE_MEMBER_TEAM = '/team/delete-member';
export const GET_LIST_TEAM = '/team/for-user-reject';
export const ACCEPT_INVITE_TEAM = '/team/accept-invite';
export const GET_TEAM_DETAIL = (teamId) => `/team/${teamId}`;

//API STADIUM
export const GET_LIST_STADIUM = ({latitude, longitude}) =>
  `/stadium/search-location?latitude=${latitude}&longitude=${longitude}`;
export const GET_STADIUM_DETAIL = (stadiumId) =>
  `/stadium/info-id/${stadiumId}`;
export const GET_STADIUM_COLLAGE_DETAIL = ({stadiumCollageId, date}) =>
  `/stadium/collage-details/?stadiumCollageId=${stadiumCollageId}&date=${date}`;
export const SEARCH_STADIUM_NAME = (name) => `/stadium/search-name/${name}`;
export const REVIEW_STADIUM = '/review/add';

//API ORDER
export const ADD_ORDER = '/order/add';
export const GET_LIST_ORDER = '/order/user';
export const GET_ORDER_DETAIL = (orderId) => `/order/${orderId}`;
export const CANCEL_ORDER = '/order/update-status';

//GAME
export const GET_GAME = (params) => `/game/gets/${params}`;
export const CREATE_GAME = '/game/add';
export const GET_GAME_FOR_USER = '/game/for-user';
export const GET_GAME_DETAIL = (gameId) => `/game/get/${gameId}`;
export const JOIN_GAME = '/game/join';
export const ACCEPT_INVITE_GAME = '/game/accept';
export const REFUSE_INVITE_GAME = '/game/refuse';
export const DELETE_GAME = (gameId) => `/game/delete/${gameId}`;
