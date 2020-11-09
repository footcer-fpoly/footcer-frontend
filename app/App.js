import React from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigation from './navigations/main-navigation';
import configureStore from './redux/store/configure-store';

const store = configureStore();
const persistor = persistStore(store);
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
}
