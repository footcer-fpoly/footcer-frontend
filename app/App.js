import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import CodePush from 'react-native-code-push';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigation from './navigations/main-navigation';
import configureStore from './redux/store/configure-store';

const store = configureStore();
const persistor = persistStore(store);
let DEBUG = __DEV__ ? true : false;

export default function App() {
  useEffect(() => {
    Crashes.setEnabled(!DEBUG);
    Analytics?.setEnabled(!DEBUG);
  }, []);
  useEffect(() => {
    CodePush?.disallowRestart();
    CodePush?.sync({installMode: CodePush.InstallMode.IMMEDIATE}, (status) => {
      switch (status) {
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          Alert.alert(
            'Cập nhật thành công!',
            'Muốn sài bản mới nhất thì tắt app mở lại. OK!.',
          );
          break;
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
}
