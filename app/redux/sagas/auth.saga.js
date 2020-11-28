import {PermissionsAndroid} from 'react-native';
import {call, put} from 'redux-saga/effects';
import {getListOrderService} from '../../api/order.api';
import {StatusCode} from '../../api/status-code';
import {
  acceptPermissionLocation,
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
