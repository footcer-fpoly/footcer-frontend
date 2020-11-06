import {call, put} from 'redux-saga/effects';
import {StatusCode} from '../../api/status-code';
import {getListTeamForUserService} from '../../api/team.api';
import {getListTeamSuccess} from '../actions/auth.action';

export function* requestGetListTeam() {
  try {
    const res = yield call(getListTeamForUserService);
    if (res && res.code === StatusCode.SUCCESS) {
      yield put(getListTeamSuccess(res.data));
    }
  } catch (error) {
    console.log('requestGetListTeam -->error: ', error);
  }
}
