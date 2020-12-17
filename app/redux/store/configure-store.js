import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/root.saga';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = () => {
  const middleWares = [sagaMiddleware];
  const enhancer = [applyMiddleware(...middleWares)];
  const store = createStore(persistedReducer, composeEnhancers(...enhancer));
  sagaMiddleware.run(rootSaga);
  return store;
};
const persistConfig = {
  key: 'root',
  timeout: null,
  whitelist: ['authState'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default configureStore;
