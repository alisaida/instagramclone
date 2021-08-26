/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from 'react';

import {
  StatusBar,
  SafeAreaView,
  Image,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import { fetchAccessToken, fetchRefreshToken } from './utils/SecureStore';

import Router from './router'
import { AuthContext } from './contexts/AuthContext';

import { loginUser, registerUser } from './api/auth';

const App: () => React$Node = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isUserLoggedin();
  }, [])

  const isUserLoggedin = async () => {
    // const accessToken = await fetchAccessToken();
    // const refreshToken = await fetchRefreshToken();

    const accessToken = '';
    const refreshToken = '';

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  const AuthStack = createStackNavigator();

  const auth = useMemo(() => ({
    login: async (email, password) => {
      const response = loginUser(email, password);
      if (response && response.status === 200) {
        //setErrorMessage('');
      } else {
        //setErrorMessage(response.message);
      }

      return response;
    },

    logout: () => {
      console.log('logout');
    },

    register: async (email, name, username, password) => {
      const response = registerUser(email, name, username, password);
      if (response && response.status === 201) {
        //setErrorMessage('');
      } else {
        //setErrorMessage(response.message);
      }

      return response;
    },

    forgotPassword: async (email) => {
      const response = loginUser(email);
      if (response && response.status === 201) {
        //setErrorMessage('');
      } else {
        //setErrorMessage(response.message);
      }

      return response;
    }
  }), [])

  return (

    <AuthContext.Provider value={auth}>

      {/* isLoggedIn ?

      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Router />
      </NavigationContainer>
      : */}
      <>
        <NavigationContainer>
          <AuthStack.Navigator
            mode={'modal'}
            screenOptions={{
              headerShown: false
            }}
          >
            <AuthStack.Screen name='Login' component={LoginScreen} />
            <AuthStack.Screen name='Register' component={RegisterScreen} />
            <AuthStack.Screen name='PassordReset' component={PasswordResetScreen} />
          </AuthStack.Navigator>
        </NavigationContainer>
      </>
    </AuthContext.Provider>
  );
};


export default App;

