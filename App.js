/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';


import {
  StatusBar,
  SafeAreaView,
  Image,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen/';
import PostScreen from './screens/PostScreen/';
import ProfileScreen from './screens/ProfileScreen/';
import ShoppingScreen from './screens/ShoppingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
import logo from './assets/images/instagram-logo.png'

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Instagram',
          headerTitleAlign: 'left',
          headerRightContainerStyle: {
            marginRight: 20,
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', width: 130, justifyContent: 'space-between', alignItems: 'center' }}>
              <Ionicons name='ios-camera-outline' size={26} color={'black'} />
              <Ionicons name='heart-outline' size={26} color={'#000'} />
              <Ionicons name='chatbubble-ellipses-outline' size={25} color={'#000'} />
            </View>
          ),
          headerTitle: () => (
            <Image source={logo} style={{ width: 150, resizeMode: 'contain', marginLeft: 5 }} />
          )
        }}
      />
    </HomeStack.Navigator >
  );
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
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
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          showLabel: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        {/* <Tab.Screen name="Post" component={PostScreen} /> */}
        <Tab.Screen name="Shop" component={ShoppingScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
