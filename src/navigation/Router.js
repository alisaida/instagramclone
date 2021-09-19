import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNav from './MainNav';
import AuthNav from './AuthNav';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import { useSelector } from 'react-redux';

const Router = () => {

    const { auth } = useSelector((state) => state);

    return (
        <NavigationContainer>

            {(auth && auth.authProfile && auth.authTokens) ?
                (
                    <MainNav />
                ) : <AuthNav />
            }
        </NavigationContainer>
    )
}

export default Router;




