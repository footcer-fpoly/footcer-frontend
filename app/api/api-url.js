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
