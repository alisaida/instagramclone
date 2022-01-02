import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../../ProfilePicture';

import { createChatRoom, retrieveChatsWithRecipient } from '../../../../api/chats';

const ChatContactListItem = ({ profile, authUser }) => {

    const navigation = useNavigation();

    const setUpChat = async () => {
        const chatRoomId = await fetchChatRoomId();
        navigation.push('ChatRoom', { chatRoomId: chatRoomId, authUser: authUser, recipientProfile: profile })
    }

    const fetchChatRoomId = async () => {
        try {
            const data = await retrieveChatsWithRecipient(profile.userId);
            console.log(data.id)
            if (data && data.id) {
                return data.id;
            } else if (data && data.response) {
                if (data.response.status === 404) {
                    console.log('Chat data not found, creating a new chatroom!');
                    const newChatId = await createNewChatRoom();
                    return newChatId;
                }
            }
        } catch (error) {
            console.log('failed', error);
        }
    }

    const createNewChatRoom = async () => {
        try {
            const data = await createChatRoom(profile.username);

            if (data && data._id) {
                console.log('new chatroom id:', data)
                return data._id;
            }
        } catch (error) {
            console.log(`ChatContactListItem: Failed to createChatRoom for recipient ${profile.username}`, error);
        }
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={setUpChat}>
                <ProfilePicture uri={profile.ProfilePicture} size={50} />
                <View style={styles.profileDetails}>
                    <Text style={styles.username}>{profile.username}</Text>
                    <Text style={styles.profileName}>{profile.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChatContactListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    profileDetails: {
        marginLeft: 3
    },
    username: {
        fontWeight: '500',
        fontSize: 18
    },
    profileName: {
        fontSize: 16,
        color: '#8d8f91',
    }
})
