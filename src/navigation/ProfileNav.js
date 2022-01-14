import React from 'react';
import { StatusBar, SafeAreaView, Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux'

import ProfileScreen from '../screens/ProfileScreen';
import { logout } from '../redux/actions/authActions';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProfileNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerMode: 'screen',
                cardStyle: { backgroundColor: '#FFFFFF' }
            }}
        >
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    drawerItemStyle: {
                        display: "none",
                    },
                }}
            />
        </Stack.Navigator >
    )
}

export default ProfileNav;

