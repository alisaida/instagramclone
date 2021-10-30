import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import ChatListItem from '../ChatListItem/';

import { retrieveMyChats } from '../../../../api/chats';

const ChatList = () => {

    useEffect(() => {
        return () => { }
    })

    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);
    const [chatRooms, setChatRooms] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setUser();
    }, [auth]);

    const setUser = async () => {
        const userId = await auth.userId;
        if (userId) {
            setAuthUser(userId);
        } else {
            setAuthUser(null);
        }
    }

    useEffect(() => {
        fetchChatRooms();
    }, []);

    const fetchChatRooms = async () => {
        try {
            const chatRooms = await retrieveMyChats();
            if (chatRooms) {
                setChatRooms(chatRooms);
            }
        } catch (error) {
            console.log('Fetch User Chat Failed', error)
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        fetchChatRooms();
        setRefreshing(false);
    }, [refreshing]);

    return (
        <FlatList
            data={chatRooms}
            keyExtractor={({ _id }) => _id}
            renderItem={({ item }) => <ChatListItem chatRoomData={item} authUser={authUser} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    )
}

export default ChatList

const styles = StyleSheet.create({})
