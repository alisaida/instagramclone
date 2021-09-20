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
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: "right"
            }}>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    drawerItemStyle: {
                        display: "none",
                    },
                }}
            />
        </Drawer.Navigator >
    )
}

function CustomDrawerContent(props) {
    const dispatch = useDispatch();

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Friend Requests"
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
            <DrawerItem
                label="Bookmarks"
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
            <DrawerItem
                label="Sign out"
                onPress={() => dispatch(logout())}
            />
        </DrawerContentScrollView>
    );
}

export default ProfileNav;