import {combineReducers} from 'redux';
import {loadingReducer} from './loading.reducer';

const rootReducer = combineReducers({
  loadingState: loadingReducer,
});
export default rootReducer;
