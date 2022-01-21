import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import TabNav from './TabNav'
import StoryScreen from '../screens/StoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CommentsScreen from '../screens/CommentsScreen';
import LikesScreen from '../screens/LikesScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import CallScreen from '../screens/CallScreen';
import CallPreview from '../screens/CallPreview';
import CreatePostScreen from '../screens/CreatePostScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import PostScreen from '../screens/PostScreen';
import FollowScreen from '../screens/FollowScreen';
import FollowRequestScreen from '../screens/FollowRequestScreen';

// import CallNav from './CallNav';

import { TouchableOpacity, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import { SocketContext } from '../contexts/SocketContext';

const RootStack = createStackNavigator();


const MainNav = () => {


    const navigation = useNavigation();
    const { call } = useContext(SocketContext);

    PushNotification.configure({
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification.data);
            const { chatRoomId, authUser, recipientProfile } = notification.data
            // process the notification
            navigation.navigate('ChatRoom', { chatRoomId: chatRoomId, authUser: authUser, recipientProfile: recipientProfile })

            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
        requestPermissions: true,
    })


    useEffect(() => {
        createNotificationChannel();
    }, [])

    const createNotificationChannel = () => {
        PushNotification.createChannel(
            {
                channelId: "chats.instagram-clone",
                channelName: "chats",
            }
        );
    }


    return (
        <RootStack.Navigator screenOptions={{
            headerMode: 'screen',
            cardStyle: { backgroundColor: '#FFFFFF' },
            headerStyle: { shadowColor: 'transparent', elevation: 0 }
        }}>
            {
                !!call ? (
                    !!call.isAccepted ? <RootStack.Screen
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
                            name='Bookmarks'
                            component={BookmarkScreen}
                            options={({ navigation }) => ({
                                headerShown: true,
                                title: 'Saved',
                                headerLeft: () => (
                                    < TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                                        <MaterialIcons name='arrow-back-ios' size={25} />
                                    </TouchableOpacity>
                                )
                            })} />
                        <RootStack.Screen
                            name='FollowRequest'
                            component={FollowRequestScreen}
                            options={({ navigation }) => ({
                                headerShown: true,
                                title: 'Follow Requests',
                                headerLeft: () => (
                                    < TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                                        <MaterialIcons name='arrow-back-ios' size={25} />
                                    </TouchableOpacity>
                                )
                            })} />
                        <RootStack.Screen
                            name='PostScreen'
                            component={PostScreen}
                            options={({ navigation, route }) => ({
                                cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                                headerShown: true,
                                headerTitle: () => (
                                    <View style={styles.postHeader}>
                                        <Text style={styles.profileName}>{route.params.profile.username.toString().toUpperCase()}</Text>
                                        <Text style={styles.screenName}>{route.params.screenName}</Text>
                                    </View>
                                ),
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
                            name='FollowScreen'
                            component={FollowScreen}
                            options={({ navigation, route }) => ({
                                headerShown: true,
                                headerTitle: () => (
                                    <View style={styles.postHeader}>
                                        <Text style={{ color: 'black', fontSize: 14, fontWeight: '500' }}>{route.params.profile.username}</Text>
                                    </View>
                                ),
                                headerLeft: () => (
                                    < TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                                        <MaterialIcons name='arrow-back-ios' size={25} />
                                    </TouchableOpacity>
                                )
                            })} />
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
                        <RootStack.Screen
                            name='CreatePost'
                            component={CreatePostScreen}
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
    postHeader: {
        alignContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        color: '#666666',
        fontSize: 14,
        fontWeight: '500'
    },
    screenName: {
        fontSize: 16,
        fontWeight: '700'
    }
});



