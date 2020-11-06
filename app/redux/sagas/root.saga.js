import {all, takeLatest} from 'redux-saga/effects';
import {GET_LIST_TEAM} from '../actions/types';
import {requestGetListTeam} from './team.saga';

export default function* rootSaga() {
  yield all([yield takeLatest(GET_LIST_TEAM, requestGetListTeam)]);
}
