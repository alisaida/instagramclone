/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from 'react';
import { StatusBar, SafeAreaView, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainNav from './navigation/MainNav';
import AuthNav from './navigation/AuthNav';
import { Provider } from 'react-redux';
import Router from './navigation/Router';
import store from './redux/store';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <Router />
    </Provider>
  );
};

export default App;