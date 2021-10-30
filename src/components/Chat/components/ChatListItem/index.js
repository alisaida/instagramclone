import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfilePicture from '../../../ProfilePicture';

import { retrieveMyChats, retrieveChatsByUserId, retrieveRecipientsByChatRoomId, retrieveMessagesByChatRoomId, createMessage } from '../../../../api/chats';

import { fetchProfileById } from '../../../../api/profile';
const ChatListItem = ({ chatRoomData, authUser }) => {

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetctRecipientData();
    }, []);

    const fetctRecipientData = async () => {
        const recipients = await retrieveRecipientsByChatRoomId(chatRoomData._id);
        if (!chatRoomData.isGroupChat) {
            const recipient = recipients[0].userId === authUser ? recipients[1] : recipients[0];
            const profile = await fetchProfileById(recipient.userId);
            setProfile(profile);
        } else {
            //split current user from list
        }
    }

    if (!profile || !profile.username) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.left} onPress={() => navigation.push('ChatRoom', { chatRoomId: chatRoomData._id, authUser: authUser, recipientProfile: profile })}>
                <ProfilePicture size={50} />
                <View style={styles.messageDeails}>
                    <Text style={{ fontSize: 16 }}>{profile.username}</Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>Hello? 2d</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name='ios-camera-outline' size={26} color={'black'} style={styles.camereaIcon} />
            </TouchableOpacity>
        </View >
    )
}

export default ChatListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageDeails: {
        marginHorizontal: 5
    },
    camereaIcon: {

    }
})
