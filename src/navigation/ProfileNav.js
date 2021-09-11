import React from 'react';
import {
    StatusBar, SafeAreaView, Image, View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem
} from '@react-navigation/drawer';

import ProfileScreen from '../screens/ProfileScreen';

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
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            />
        </DrawerContentScrollView>
    );
}

export default ProfileNav;