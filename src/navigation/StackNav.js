import React from 'react';
import { useNavigation } from '@react-navigation/native';
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
import Fontisto from 'react-native-vector-icons/Fontisto';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import logo from '../assets/images/instagram-logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

import PostMenuItem from '../components/Post/components/PostMenuItem';

const HomeStack = createStackNavigator();

const StackNav = () => {

    const navigation = useNavigation();
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#fff' }
            }}
        >
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
                        <View style={{ flexDirection: 'row', marginRight: 20, width: 100, justifyContent: 'space-between', alignItems: 'center' }}>
                            <PostMenuItem />
                            <Ionicons name='heart-outline' size={26} color={'#000'} />
                            <TouchableOpacity onPress={() => navigation.push('ChatScreen')}>
                                <Fontisto name='messenger' size={21} color={'#000'} />
                            </TouchableOpacity>
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