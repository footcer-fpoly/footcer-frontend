// import {call, put} from 'redux-saga/effects';
// import {hideLoading, showLoading} from '../actions/loading.action';
// import {
//   GET_USER_PROFILE_SUCCESS,
//   LOGOUT_SUCCESS,
//   VERITY_SUCCESS,
// } from '../actions/types';
// import {
//   signUpPhoneService,
//   signInPhoneService,
//   checkValidPhoneService,
// } from '../../api/auth.api';

// export function* requestSignInSaga(action) {
//   const {authType, phone, password} = action.params;
//   try {
//     yield put(showLoading());
//     switch (authType) {
//       case 1:
//         const resValidPhone = yield checkValidPhoneService(phone);
//         console.log('phone saga: ', phone);
//         console.log('resValidPhone: ', resValidPhone);
//         break;
//     }
//     yield put(hideLoading());
//   } catch (error) {}
// }
