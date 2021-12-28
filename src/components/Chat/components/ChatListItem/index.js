import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfilePicture from '../../../ProfilePicture';

import { retrieveMyChats, retrieveChatsByUserId, retrieveRecipientsByChatRoomId, retrieveMessagesByChatRoomId, createMessage } from '../../../../api/chats';

import { fetchProfileById } from '../../../../api/profile';
const ChatListItem = ({ chatRoomData, authUser }) => {

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
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        fetctRecipientData();

        if (chatRoomData && chatRoomData.lastMessage) {
            if (chatRoomData.lastMessage.imageUri) {
                const msg = authUser === chatRoomData.lastMessage.userId ? 'You sent a photo' : 'Sent a photo';
                setLastMessage(msg);
            } else {
                setLastMessage(chatRoomData.lastMessage.content);
            }
        }
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

    const setUpLastMessage = () => {
        if (chatRoomData && chatRoomData.lastMessage) {
            if (chatRoomData.lastMessage.imageUri) {
                const msg = authUser === chatRoomData.lastMessage.userId ? 'You sent a photo' : 'Sent a photo';
                setLastMessage(msg);
            } else {
                setLastMessage(chatRoomData.lastMessage.content);
            }
        }
    }


    return (
        chatRoomData && chatRoomData.lastMessage &&
        <View style={styles.container}>
            <TouchableOpacity style={styles.left} onPress={() => navigation.push('ChatRoom', { chatRoomId: chatRoomData._id, authUser: authUser, recipientProfile: profile })}>
                <ProfilePicture uri={profile.profilePicture} size={50} />
                <View style={styles.messageDeails}>
                    <Text style={{ fontSize: 14 }}>{profile.username}</Text>

                    <Text style={{ fontSize: 14, color: 'grey' }}>{lastMessage} • {moment(chatRoomData.lastMessage.createdAt).fromNow(true)}</Text>

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
