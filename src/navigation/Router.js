import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNav from './MainNav';
import AuthNav from './AuthNav';
import CallScreen from '../screens/CallScreen';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import { useSelector, useDispatch } from 'react-redux';
import { ContextProvider } from '../contexts/SocketContext';
import { logout } from '../redux/actions/authActions';


const Router = () => {

    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);
    const dispatch = useDispatch();


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
            // dispatch(logout()); //force logout
        } else {
            console.log('user logged out');
            setAuthUser(null);
        }
    }

    const theme = {
        colors: {
            background: "transparent",
        },
    };

    const config = {
        screens: {
            ResetPassword: {
                path: 'reset-password/:id?',
                parse: {
                    id: (id: String) => `${id}`,
                },
            },
            ConfirmAccount: {
                path: 'verify-account/:id?',
                parse: {
                    id: (id: String) => `${id}`,
                },
            },
        },
    };

    const linking = {
        prefixes: ['instagramclone://'],
        config,
    };

    return (
        <NavigationContainer linking={linking} theme={theme}>

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




