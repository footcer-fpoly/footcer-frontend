import {call} from 'redux-saga/effects';
import {requestSignInPhoneSaga} from './auth.saga';

function* rootSaga() {
  yield call(requestSignInPhoneSaga);
}

export default rootSaga;
