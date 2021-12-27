import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../../ProfilePicture';

const ProfileListItem = ({ profile }) => {

    const navigation = useNavigation();

    const navigateToProfileScreen = () => {
        navigation.push('Root', { screen: 'ProfileScreen', params: { otherProfile: profile, isAuthProfile: false } });
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={navigateToProfileScreen}>
                <ProfilePicture uri={profile.profilePicture} size={50} />
                <View style={styles.profileDetails}>
                    <Text style={styles.username}>{profile.username}</Text>
                    <Text style={styles.profileName}>{profile.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileListItem

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
