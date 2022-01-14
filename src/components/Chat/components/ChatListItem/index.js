import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfilePicture from '../../../ProfilePicture';

import { retrieveMyChats, retrieveChatsByUserId, retrieveRecipientsByChatRoomId, retrieveMessagesByChatRoomId, createMessage } from '../../../../api/chats';

import { fetchProfileById } from '../../../../api/profile';
import { retrieveChatDataByChatRoomId, retrieveLastMessageByChatRoomId } from '../../../../api/chats'
const ChatListItem = ({ chatRoomId, authUser }) => {

    moment.updateLocale('en', {
        relativeTime: {
            s: '1s',
            ss: '%ds',
            m: "1m",
            mm: "%dm",
            h: "1h",
            hh: "%dh",
            d: '1d',
            dd: (day) => {
                if (day < 7) {
                    return day + 'd';
                }
                else {
                    var weeks = Math.round(day / 7);
                    return weeks + (weeks > 1 ? 'w' : 'w');
                }
            },
            M: () => {
                return 4 + 'w';
            },
            MM: (month) => {
                return month * 4 + 'w';
            },
            y: "y",
            yy: "%dy"
        }
    });

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [chatRoom, setChatRoom] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [lastMessageContent, setLastMessageContent] = useState('');

    useEffect(() => {
        fetchChatRoomData();
        fetchLastMessage();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchLastMessage();

            return () => { };
        }, [])
    );

    useEffect(() => {
        updateLastMessage();
    }, [lastMessage]);

    const fetchChatRoomData = async () => {
        try {
            const chatRoom = await retrieveChatDataByChatRoomId(chatRoomId);
            if (chatRoom) {
                const recipient = chatRoom.recipients[0].userId === authUser ? chatRoom.recipients[1] : chatRoom.recipients[0];
                const profile = await fetchProfileById(recipient.userId);
                const lastMessage = await retrieveLastMessageByChatRoomId(chatRoomId);

                setProfile(profile);
                setChatRoom(chatRoom);
                setLastMessage(lastMessage);
            }
        } catch (e) {
            console.log(`ChatListItem Component: Failed to ChatRoom data (retrieveChatDataByChatRoomId) for id ${chatRoomId}`, e);
        }
    }

    const fetchLastMessage = async () => {
        try {
            const lastMessage = await retrieveLastMessageByChatRoomId(chatRoomId);
            if (lastMessage) {
                setLastMessage(lastMessage);
            }
        } catch (e) {
            console.log(`ChatListItem Component: Failed to ChatRoom data (fetchLastMessage) for id ${chatRoomId}`, e);
        }
    }

    const updateLastMessage = () => {
        if (lastMessage) {
            if (lastMessage.type === 'default') {
                if (lastMessage.imageUri) {
                    const messageContent = authUser === lastMessage.userId ? 'You sent a photo' : 'Sent a photo';
                    setLastMessageContent(messageContent);
                } else if (lastMessage.content !== '') {
                    setLastMessageContent(lastMessage.content);
                }
            } else {
                const messageContent = authUser === lastMessage.userId ? 'Sent' : 'Received';
                setLastMessageContent(messageContent);
            }
        }
    }

    if (!profile || !profile.username && !lastMessage) {
        return null;
    }

    return (
        lastMessage
        && <View style={styles.container}>
            <TouchableOpacity style={styles.left} onPress={() => navigation.push('ChatRoom', { chatRoomId: chatRoom.chatRoomId, authUser: authUser, recipientProfile: profile })}>
                <ProfilePicture uri={profile.profilePicture} size={50} />
                <View style={styles.messageDeails}>
                    <Text style={{ fontSize: 14 }}>{profile.username}</Text>

                    <Text style={{ fontSize: 14, color: 'grey' }}>{lastMessageContent} • {moment(lastMessage.createdAt).fromNow(true)}</Text>

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
