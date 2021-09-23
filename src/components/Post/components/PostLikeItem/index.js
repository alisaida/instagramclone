import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import ProfilePicture from '../../../ProfilePicture';

const LikeItem = ({ name, imageUri, username }) => {
    return (
        <View>
            <View style={styles.container}>
                <ProfilePicture uri={imageUri} size={60} />
                <View style={styles.profileDetails}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.profileName}>{name}</Text>
                </View>
            </View>
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                    marginHorizontal: "3%"
                }}
            />
        </View>
    )
}

export default LikeItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    profileDetails: {
        marginTop: 6,
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
