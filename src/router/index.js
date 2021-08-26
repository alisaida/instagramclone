import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import bottomHomeNavigator from './bottomHomeNavigator.routes'
import StoryScreen from '../screens/StoryScreen';
import LoginScreen from '../screens/LoginScreen';
const RootStack = createStackNavigator();

const Router = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name={'Home'}
                component={bottomHomeNavigator}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen
                name='Story'
                component={StoryScreen}
                options={{
                    headerShown: false
                }}

            />
            {/* <RootStack.Screen
                name='Login'
                component={LoginScreen}
                options={{
                    headerShown: false
                }}

            /> */}
        </RootStack.Navigator>
    )
}

export default Router;




