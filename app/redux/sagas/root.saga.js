import {all, takeLatest} from 'redux-saga/effects';
import {LOGIN_REQUESTED} from '../actions/types';
import {requestSignInSaga} from './auth.saga';

export default function* rootSaga() {
  yield all([yield takeLatest(LOGIN_REQUESTED, requestSignInSaga)]);
}
