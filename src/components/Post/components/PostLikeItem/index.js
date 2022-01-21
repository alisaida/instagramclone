import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import ProfilePicture from '../../../ProfilePicture';

const LikeItem = ({ name, imageUri, username }) => {
    return (
        <View>
            <View style={styles.container}>
                <ProfilePicture uri={imageUri} size={50} />
                <View style={styles.profileDetails}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.profileName}>{name}</Text>
                </View>
            </View>

        </View>
    )
}

export default LikeItem

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
        fontSize: 15
    },
    profileName: {
        fontSize: 13,
        color: '#8d8f91',
    }
})
