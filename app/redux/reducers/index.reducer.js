import {combineReducers} from 'redux';
import {appReducer} from './app.reducer';
import {authReducer} from './auth.reducer';
import {loadingReducer} from './loading.reducer';
import {teamsReducer} from './teams.reducer';

const rootReducer = combineReducers({
  loadingState: loadingReducer,
  authState: authReducer,
  teamsState: teamsReducer,
  appState: appReducer,
});
export default rootReducer;
