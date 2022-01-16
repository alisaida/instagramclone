import React from 'react';
import {
    StatusBar,
    SafeAreaView,
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import StackNav from './StackNav';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import CommentsScreen from '../screens/CommentsScreen';
import LikesScreen from '../screens/LikesScreen';
import ProfileNav from './ProfileNav';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const TabNav = ({ route, options }) => {
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
                tabBarButton: [
                    "ProfileScreen",
                    "Likes",
                    "Comments",
                ].includes(route.name)
                    ? () => {
                        return null;
                    }
                    : undefined,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Home"
                component={StackNav}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        //check if already at the top level
                        const parentState = navigation.getParent().getState();
                        // console.log(parentState)
                        if (parentState && parentState.index && (parentState.index == 1 || parentState.index == 2)) {
                            navigation.dispatch(navigation.popToTop());
                        }
                    },
                })}
            />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Shop" component={ShoppingScreen} />
            <Tab.Screen name="Profile" component={ProfileNav} />
            <Tab.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                    headerShown: false
                }} />
            <Tab.Screen
                name='Likes'
                component={LikesScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    title: 'Likes',
                    headerLeft: () => (
                        < TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                            <MaterialIcons name='arrow-back-ios' size={25} />
                        </TouchableOpacity>
                    )
                })}
            />
        </Tab.Navigator >
    )
}

export default TabNav;

const styles = StyleSheet.create({
    leftHeader: {
        marginLeft: 15
    },
});