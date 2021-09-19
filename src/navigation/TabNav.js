import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    Image,
    View
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

import StackNav from './StackNav';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import ProfileNav from './ProfileNav';

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Search') {
                        iconName = focused
                            ? 'search'
                            : 'search-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Profile') {
                        iconName = focused
                            ? 'person-circle'
                            : 'person-circle-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Post') {
                        iconName = focused
                            ? 'plussquare'
                            : 'plussquareo';
                        return <AntDesign name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Shop') {
                        iconName = focused
                            ? 'shopping'
                            : 'shopping-outline';
                        return <MaterialCI name={iconName} size={size} color={color} />;
                    }
                },

                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                headerShown: false
            })}
        >
            <Tab.Screen name="Home" component={StackNav} />
            <Tab.Screen name="Search" component={SearchScreen} />
            {/* <Tab.Screen name="Post" component={PostScreen} /> */}
            <Tab.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                    headerShown: false
                }} />
            <Tab.Screen name="Shop" component={ShoppingScreen} />
            <Tab.Screen name="Profile" component={ProfileNav} />
        </Tab.Navigator>
    )
}

export default TabNav;