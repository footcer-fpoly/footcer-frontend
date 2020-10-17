import {call, put} from 'redux-saga/effects';
import {hideLoading, showLoading} from '../actions/loading.action';
import {
  GET_USER_PROFILE_SUCCESS,
  LOGOUT_SUCCESS,
  VERITY_SUCCESS,
} from '../actions/types';
import {
  signUpPhoneService,
  signInPhoneService,
  checkValidPhoneService,
} from '../../api/auth.api';

export function* requestSignInPhoneSaga() {
  // yield put(showLoading());
  // const response = yield checkValidPhoneService('0392350815');
  // console.log(response);
}
