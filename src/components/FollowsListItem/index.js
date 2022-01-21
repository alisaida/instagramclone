import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfileById, fetchFollowingBetweenUsersIds, followUserById, unFollowUserById } from '../../api/profile';
import ProfilePicture from '../ProfilePicture';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const FollowListItem = ({ authProfile, follow, routeName }) => {

    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [isAuthProfile, setIsAuthProfile] = useState(false);
    const [following, setFollowing] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);


    useEffect(() => {
        fetchFollow();

    }, [follow])

    const fetchFollow = async () => {
        try {
            let profile;
            if (routeName === 'following') {
                profile = await fetchProfileById(follow.following);
            } else {
                profile = await fetchProfileById(follow.follower);
            }

            const responseFollowing = await fetchFollowingBetweenUsersIds(authProfile.userId, profile.userId);

            setProfile(profile);
            //means found my profile in the list as a follower or following
            setIsAuthProfile(profile._id === authProfile._id);

            const following = responseFollowing;

            if (responseFollowing) {
                if (authProfile.userId === follow.follower) {
                    setIsFollowing(true);
                } else {
                    setIsFollowed(true);
                }
                setFollowing(following);
            }
        } catch (error) {
            console.log(error);
            console.log(`FollowListItem: Failed to fetchFollowingBetweenUsersIds for userId ${authProfile._id}`, error);
        }
    }

    const goToProfile = () => {
        navigation.push('Root', { screen: 'ProfileScreen', params: { otherProfile: profile, isAuthProfile: false } });
    }

    const handleFollow = async () => {
        const userId1 = authProfile.userId;
        const userId2 = follow.following;
        try {
            const response = await followUserById(userId2);
            if (response && response.data && response.status === 201) {
                const follow = response.data;

                setIsFollowing(true);
                setFollowing(follow);
            }
        } catch (error) {
            console.log(error);
            console.log(`FollowListItem: Failed to follow`, error);
        }
    }

    const handleUnfollow = async () => {
        const userId1 = authProfile.userId;
        const userId2 = follow.following;
        try {

            const response = await unFollowUserById(userId2);
            console.log('responseData', following)
            if (response && response.data && response.status === 202) {
                setIsFollowing(false);
            }

        } catch (error) {
            console.log(error);
            console.log(`FollowListItem: Failed to Unfollow`, error);
        }
    }

    if (!profile || !profile.name)
        return null;

    return (
        <View>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={goToProfile}>
                    <View style={styles.left}>

                        <ProfilePicture uri={profile.profilePicture} size={50} />
                        <View style={styles.profileDetails}>
                            <Text style={styles.username}>{profile.username}</Text>
                            <Text style={styles.profileName}>{profile.name}</Text>
                        </View>

                    </View>
                </TouchableWithoutFeedback>

                {following && isFollowing ? <TouchableWithoutFeedback onPress={() => { handleUnfollow() }}>
                    <View style={[styles.buttonContainer, { backgroundColor: 'white', borderColor: 'grey', }]}>
                        {following.status === 'accepted' ? <Text style={[styles.button]}>Following</Text> : <Text style={styles.button}>Requested</Text>}
                    </View>
                </TouchableWithoutFeedback>
                    : (profile._id !== authProfile._id && <TouchableWithoutFeedback onPress={() => { handleFollow() }}>
                        <View style={[styles.buttonContainer, isFollowing ? { backgroundColor: 'white', borderColor: 'grey', } : { backgroundColor: '#1992fb', borderColor: '#1992fb', }]}>
                            <Text style={[styles.button, { color: 'white', fontWeight: '500' }]}>Follow</Text>
                        </View>
                    </TouchableWithoutFeedback>)}

            </View>

        </View >


    )
}

export default FollowListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    left: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonContainer: {
        borderWidth: 1,
        width: 100,
        height: 27,
        borderRadius: 3,
        alignItems: 'center'
    },
    button: {
        alignSelf: 'center',
        paddingVertical: 4
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