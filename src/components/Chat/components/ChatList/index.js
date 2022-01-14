import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ChatListItem from '../ChatListItem/';

import { retrieveChatsByUserId, retrieveLastMessageByChatRoomId } from '../../../../api/chats';

const ChatList = () => {

    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);
    const [chatRooms, setChatRooms] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setUser();
    }, [auth]);

    useFocusEffect(
        useCallback(() => {
            fetchChatRooms();

            return () => { };
        }, [])
    );

    const setUser = async () => {
        const userId = await auth.userId;
        if (userId) {
            setAuthUser(userId);
        } else {
            setAuthUser(null);
        }
    }

    const populateLastMessage = (chatRooms) => {
        const chatRoomAndLastMsg = chatRooms.map((chatRoom) => {
            const lastMessages = retrieveLastMessageByChatRoomId(chatRoom._id).then((lastMessage) => {
                let result = {
                    _id: chatRoom._id,
                    createdAt: chatRoom.createdAt,
                    _isGroupChat: chatRoom.isGroupChat
                }
                if (lastMessage) {
                    result.lastMessage = lastMessage;
                    return result;
                }
                return result;

            }).catch((error) => {
                console.log(`ChatList Component: Failed to chats (retrieveChatsByUserId) for auth user ${userId}`, error);
            })
            return lastMessages;
        });

        return Promise.all(chatRoomAndLastMsg);
    }

    const fetchChatRooms = async () => {
        try {
            const userId = await auth.userId;
            const chatRooms = await retrieveChatsByUserId(userId);
            if (chatRooms) {
                const chatRoomData = populateLastMessage(chatRooms).then((data) => {
                    const rooms = data.filter(room => room.lastMessage !== undefined);
                    rooms.sort((a, b) => b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt));
                    setChatRooms(rooms);
                });
            }
        } catch (error) {
            console.log(`ChatList Component: Failed to chats (retrieveChatsByUserId) for auth user ${userId}`, error);
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
            extraData={chatRooms}
            renderItem={({ item }) => <ChatListItem chatRoomId={item._id} authUser={authUser} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    )
}

export default ChatList

const styles = StyleSheet.create({})
