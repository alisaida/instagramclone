import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilePicture from '../../../ProfilePicture';
import { SocketContext } from '../../../../contexts/SocketContext';

import { currentAuthProfile } from '../../../../api/profile'

const ChatScreenHeader = ({ profile, authUserId, chatRoomId }) => {

    const navigation = useNavigation();

    const { callUser } = useContext(SocketContext);

    const [fromProfile, setFromProfile] = useState(null);

    const makeCall = async () => {
        const fromProfile = await fetchAuthProfile();
        const callData = {
            callId: {
                from: fromProfile, //me
                to: profile //other party
            }
        }

        callUser(callData);
    }

    const fetchAuthProfile = async () => {
        try {
            const profile = await currentAuthProfile();
            return profile;
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.left}>
                    <TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                        <MaterialIcons name='arrow-back-ios' size={24} />
                    </TouchableOpacity>
                    <ProfilePicture size={35} />
                    <View style={styles.profileDetails}>
                        <Text style={styles.profileName}>{profile.name}</Text>
                        <Text style={styles.username}>{profile.username}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity style={styles.leftHeader} onPress={() => makeCall()}>
                        <Ionicons name='call-outline' size={26} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <Ionicons name='videocam-outline' size={26} />
                </View>
            </View>
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE"
                }}
            />
        </>

    )
}

export default ChatScreenHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    right: {
        flexDirection: 'row',
        marginTop: 5,
        marginRight: 15

    },
    profileDetails: {
        marginLeft: 10,
        marginBottom: 5
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
    },
    username: {
        fontSize: 14,
        fontWeight: '500',
        color: 'grey'
    }
})
