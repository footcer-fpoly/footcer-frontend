import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import React from 'react';
import {Provider} from 'react-redux';
import MainNavigation from './navigations/main-navigation';
import configureStore from './redux/store/configure-store';

const store = configureStore();
export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <MainNavigation />
      </ApplicationProvider>
    </Provider>
  );
}
