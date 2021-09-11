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

import MainNav from './navigation/MainNav'
import { AuthContext } from './contexts/AuthContext';

import { loginUser, registerUser } from './api/auth';




const App: () => React$Node = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    return () => { }
  })
  useEffect(() => {
    isUserLoggedin();
  }, [])

  const isUserLoggedin = async () => {
    const accessToken = await fetchAccessToken();
    const refreshToken = await fetchRefreshToken();

    // const accessToken = '';
    // const refreshToken = '';

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  const AuthStack = createStackNavigator();

  const auth = useMemo(() => ({
    login: async (email, password) => {
      const response = await loginUser(email, password);
      if (response) {
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          //destructure axios repsonse error
          const { error } = response.response.data;
          if (error && error.status === 401) {
            return new Error('Invalid username or password');
          } else {
            return new Error(response.toString());
          }
        }
      }

      return null;
    },

    logout: () => {
      console.log('logout');
    },

    register: async (email, name, username, password) => {
      const response = await registerUser(email, name, username, password);
      if (response && response.status === 201) {
        setIsLoggedIn(true);
      } else {


        //destructure axios repsonse error
        const { error } = response.response.data;
        if (error && error.status === 409) {
          return new Error(error.message);
        } else {
          return new Error(response.toString());
        }
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

      {isLoggedIn ?

        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <MainNav />
        </NavigationContainer>
        :
        <>
          <NavigationContainer>
            <AuthStack.Navigator
              presentation={'modal'}
              screenOptions={{
                headerShown: false
              }}
            >
              <AuthStack.Screen name='Login' component={LoginScreen} />
              <AuthStack.Screen name='Register' component={RegisterScreen} />
              <AuthStack.Screen name='PassordReset' component={PasswordResetScreen} />
            </AuthStack.Navigator>
          </NavigationContainer>
        </>}
    </AuthContext.Provider>
  );
};


export default App;

