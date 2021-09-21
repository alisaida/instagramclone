import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNav from './MainNav';
import AuthNav from './AuthNav';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import { useSelector } from 'react-redux';

const Router = () => {

    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        checkUser();
    }, [auth])

    const checkUser = async () => {
        const userId = await auth.userId;
        if (userId) {
            setAuthUser(userId);
            console.log('user logged in')
        } else {
            console.log('user logged out')
        }
    }

    return (
        <NavigationContainer>

            {(authUser) ?
                (
                    <MainNav />
                ) : <AuthNav />
            }

        </NavigationContainer>
    )
}

export default Router;




