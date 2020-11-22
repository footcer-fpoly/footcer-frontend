import {PermissionsAndroid} from 'react-native';
import {put} from 'redux-saga/effects';
import {
  acceptPermissionLocation,
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
