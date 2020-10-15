import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/root.saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = () => {
  const middleWares = [sagaMiddleware];
  const enhancer = [applyMiddleware(...middleWares)];
  const store = createStore(rootReducer, composeEnhancers(...enhancer));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
