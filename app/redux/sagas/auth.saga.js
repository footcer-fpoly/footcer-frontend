import {PermissionsAndroid} from 'react-native';
import {put} from 'redux-saga/effects';
import {getGameForUserService} from '../../api/game.api';
import {getListOrderService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import {getNotiService} from '../../api/user.api';
import {
  acceptPermissionLocation,
  getListGameSuccess,
  getListNoti,
  getListNotiSuccess,
  getListOrderSuccess,
  refusePermissionLocation,
} from '../actions/auth.action';

export function* requestLocationPermissionSaga() {
  try {
    const granted = yield PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      yield put(acceptPermissionLocation());
    } else {
      yield put(refusePermissionLocation());
    }
  } catch (error) {
    console.log('requestLocationPermissionSaga -->error: ', error);
  }
}

export function* getListOrderSaga() {
  try {
    const res = yield getListOrderService();
    if (res && res.code === StatusCode.SUCCESS) {
      yield put(getListOrderSuccess(res.data));
    }
  } catch (error) {
    console.log('requestLocationPermissionSaga -->error: ', error);
  }
}

export function* getListGameSaga() {
  try {
    const res = yield getGameForUserService();
    console.log('LOG -> function*getListGameSaga -> res', res);
    if (res && res.code === StatusCode.SUCCESS) {
      yield put(getListGameSuccess(res.data));
    }
  } catch (error) {
    console.log('getListGameSaga -->error: ', error);
  }
}

export function* getListNotiSaga() {
  try {
    const res = yield getNotiService();
    if (res && res.code === StatusCode.SUCCESS) {
      yield put(getListNotiSuccess(res.data));
    }
  } catch (error) {
    console.log('getListGameSaga -->error: ', error);
  }
}
