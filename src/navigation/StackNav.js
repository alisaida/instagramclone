import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import {
    StatusBar,
    SafeAreaView,
    Image,
    View
} from 'react-native';


import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import logo from '../assets/images/instagram-logo.png'

const HomeStack = createStackNavigator();

const StackNav = () => {
    return (
        <HomeStack.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Instagram',
                    headerTitleAlign: 'left',
                    headerRightContainerStyle: {
                        marginRight: 20,
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', marginRight: 20, width: 130, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Ionicons name='ios-camera-outline' size={26} color={'black'} />
                            <Ionicons name='heart-outline' size={26} color={'#000'} />
                            <Ionicons name='chatbubble-ellipses-outline' size={25} color={'#000'} />
                        </View>
                    ),
                    headerTitle: () => (
                        <Image source={logo} style={{ width: 150, height: 100, resizeMode: 'contain', marginLeft: 5 }} />
                    )
                }}
            />
        </HomeStack.Navigator >
    )
}

export default StackNav;