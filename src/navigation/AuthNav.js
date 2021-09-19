import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
const AuthStack = createStackNavigator();

const AuthNav = () => {
    return (
        <AuthStack.Navigator
            presentation={'modal'}
            screenOptions={{
                headerShown: false
            }}>
            <AuthStack.Screen name='Login' component={LoginScreen} />
            <AuthStack.Screen name='Register' component={RegisterScreen} />
            <AuthStack.Screen name='PassordReset' component={PasswordResetScreen} />
        </AuthStack.Navigator>
    )
}

export default AuthNav;




