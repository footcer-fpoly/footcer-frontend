import {combineReducers} from 'redux';
import {authReducer} from './auth.reducer';
import {loadingReducer} from './loading.reducer';
import {teamsReducer} from './teams.reducer';

const rootReducer = combineReducers({
  loadingState: loadingReducer,
  authState: authReducer,
  teamsState: teamsReducer,
});
export default rootReducer;
