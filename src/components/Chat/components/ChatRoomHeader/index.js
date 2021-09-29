import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilePicture from '../../../ProfilePicture';

const ChatScreenHeader = ({ profile }) => {

    const navigation = useNavigation();
    return (
        <>
            <View style={styles.container}>
                <View style={styles.left}>
                    < TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                        <MaterialIcons name='arrow-back-ios' size={24} />
                    </TouchableOpacity>
                    <ProfilePicture size={35} />
                    <View style={styles.profileDetails}>
                        <Text style={styles.profileName}>{profile.name}</Text>
                        <Text style={styles.username}>{profile.username}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Ionicons name='call-outline' size={26} style={{ marginRight: 10 }} />
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
