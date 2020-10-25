import {combineReducers} from 'redux';
import {authReducer} from './auth.reducer';
import {loadingReducer} from './loading.reducer';

const rootReducer = combineReducers({
  loadingState: loadingReducer,
  authState: authReducer,
});
export default rootReducer;
