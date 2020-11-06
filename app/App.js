import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import React from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './navigations/main-navigation';
import configureStore from './redux/store/configure-store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

const store = configureStore();
const persistor = persistStore(store);
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <MainNavigation />
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}
