import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav'
import StoryScreen from '../screens/StoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CommentsScreen from '../screens/CommentsScreen';
import LikesScreen from '../screens/LikesScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import CallScreen from '../screens/CallScreen';
import CallPreview from '../screens/CallPreview';

import CallNav from './CallNav';

import { TouchableOpacity, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import { SocketContext } from '../contexts/SocketContext';

const RootStack = createStackNavigator();

const MainNav = () => {

    const { call, activeCall } = useContext(SocketContext);

    return (
        <RootStack.Navigator>

            {
                call ? (
                    activeCall ? <RootStack.Screen
                        name='Call'
                        component={CallScreen}
                        options={{
                            headerShown: false
                        }} /> :
                        <RootStack.Screen
                            name='CallPreview'
                            component={CallPreview}
                            options={{
                                headerShown: false
                            }} />
                ) : (
                    <>
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
                        <RootStack.Screen
                            name='Comments'
                            component={CommentsScreen}
                            options={({ navigation }) => ({
                                headerShown: true,
                                title: 'Comments',
                                headerLeft: () => (
                                    < TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                                        <MaterialIcons name='arrow-back-ios' size={25} />
                                    </TouchableOpacity>
                                )
                            })} />
                        <RootStack.Screen
                            name='ChatScreen'
                            component={ChatScreen}
                            options={{
                                headerShown: false
                            }} />
                        <RootStack.Screen
                            name='ChatRoom'
                            component={ChatRoomScreen}
                            options={{
                                headerShown: false
                            }} />
                        <RootStack.Screen
                            name='Call'
                            component={CallScreen}
                            options={{
                                headerShown: false
                            }} />
                    </>
                )
            }


        </RootStack.Navigator>
    )
}

export default MainNav;

const styles = StyleSheet.create({
    leftHeader: {
        marginLeft: 15
    },
});



