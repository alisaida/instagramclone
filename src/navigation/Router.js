import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNav from './MainNav';
import AuthNav from './AuthNav';
import CallScreen from '../screens/CallScreen';
// import CallNav from './CallNav';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import { useSelector } from 'react-redux';
import { ContextProvider } from '../contexts/SocketContext';


const Router = () => {

    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        checkUser();
    }, [auth])

    const checkUser = async () => {
        const userId = await auth.userId;

        if (userId) {
            console.log('user logged in');
            setAuthUser(userId);
        } else {
            console.log('user logged out');
            setAuthUser(null);
        }
    }


    return (
        <NavigationContainer>

            {(authUser)
                ?
                (
                    <ContextProvider>
                        <MainNav />
                    </ContextProvider>
                ) : <AuthNav />
            }

        </NavigationContainer>
    )
}

export default Router;




