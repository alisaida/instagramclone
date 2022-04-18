import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ConfirmAccountScreen from '../screens/ConfirmAccountScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
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
            <AuthStack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
            <AuthStack.Screen name='ResetPassword' component={ResetPasswordScreen} />
            <AuthStack.Screen name='ConfirmAccount' component={ConfirmAccountScreen} />
        </AuthStack.Navigator>
    )
}

export default AuthNav;




