import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav'
import StoryScreen from '../screens/StoryScreen';
import LoginScreen from '../screens/LoginScreen';
const RootStack = createStackNavigator();

const MainNav = () => {
    return (
        <>
            <RootStack.Navigator>
                <RootStack.Screen
                    name={'Root'}
                    component={TabNav}
                    options={{
                        headerShown: false
                    }} />
                <RootStack.Screen
                    name='Story'
                    component={StoryScreen}
                    options={{
                        headerShown: false
                    }} />
            </RootStack.Navigator>
        </>
    )
}

export default MainNav;




