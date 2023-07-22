/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  useColorScheme,
} from 'react-native';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persister, store } from './src/redux/store';
import { Home } from './src/screen/Home';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


const App = ()=> {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Home />
      </PersistGate>
    </Provider>
  );
}

export default App;
