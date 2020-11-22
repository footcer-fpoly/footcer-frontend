import {all, takeLatest} from 'redux-saga/effects';
import {GET_LIST_TEAM, REQUESTED_PERMISSION_LOCATION} from '../actions/types';
import {requestLocationPermissionSaga} from './auth.saga';
import {requestGetListTeam} from './team.saga';

export default function* rootSaga() {
  yield all([
    yield takeLatest(GET_LIST_TEAM, requestGetListTeam),
    yield takeLatest(
      REQUESTED_PERMISSION_LOCATION,
      requestLocationPermissionSaga,
    ),
  ]);
}
