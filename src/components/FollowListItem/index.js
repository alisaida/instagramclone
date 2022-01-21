import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchProfileById, fetchFollowingBetweenUsersIds, followUserById, unFollowUserById, acceptFollowing, rejectFollowing } from '../../api/profile';
import ProfilePicture from '../ProfilePicture';

const FollowListItem = ({ authProfile, follow, routeName, removeItemFromList }) => {

    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [isAuthProfile, setIsAuthProfile] = useState(false);
    const [data, setData] = useState(null);
    const [following, setFollowing] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);


    useEffect(() => {
        setData(follow)
        fetchFollow();

    }, [follow])

    const fetchFollow = async () => {

        try {
            let profile;
            let responseFollowing;
            if (routeName === 'following') {
                profile = await fetchProfileById(follow.following);
                responseFollowing = await fetchFollowingBetweenUsersIds(authProfile.userId, profile.userId);
            } else {
                profile = await fetchProfileById(follow.follower);
                responseFollowing = await fetchFollowingBetweenUsersIds(profile.userId, authProfile.userId);
            }

            setProfile(profile);

            //means found my profile in the list as a follower or following
            setIsAuthProfile(profile._id === authProfile._id);

            if (responseFollowing) {
                if (authProfile.userId === follow.follower) {
                    setIsFollowing(true);
                }
                else if (authProfile.userId === follow.following) {
                    setIsFollowed(true);
                }
                setFollowing(responseFollowing);
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

            let response;
            let relation;
            if (!routeName) {
                console.log('unfollowing pending request')
                response = await rejectFollowing(following._id);
            }
            else {
                const user = following.following === authProfile.userId ? following.follower : following.following;
                relation = following.following === authProfile.userId ? 'following' : 'follower';
                response = await unFollowUserById(user, relation);
            }
            if (response && response.data && response.status === 202) {
                // setProfile(null);//hack to remove the item the list
                removeItemFromList(follow, routeName);

            } else if (!routeName) {
                // setProfile(null);
                removeItemFromList(follow);
            }

        } catch (error) {
            console.log(error);
            console.log(`FollowListItem: Failed to Unfollow`, error);
        }
    }

    const handleAccept = async () => {
        const userId1 = authProfile.userId;
        const userId2 = follow.following;
        try {

            const response = await acceptFollowing(following._id);
            if (response && response.data && response.status === 201) {
                removeItemFromList(follow);
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
                {following ? (
                    <View style={{ flexDirection: 'row' }}>
                        {isFollowed && following.status === 'pending' && <TouchableOpacity onPress={() => { handleAccept() }}>
                            <View style={[styles.buttonContainer, { backgroundColor: '#1992fb', borderColor: '#1992fb', }]}>
                                {following.status === 'pending' && <Text style={[styles.button, { color: 'white', fontWeight: '500' }]}>Confirm</Text>}
                            </View>
                        </TouchableOpacity>}
                        {(isFollowing || isFollowed || !routeName) && <TouchableOpacity onPress={() => { handleUnfollow() }}>
                            <View style={[styles.buttonContainer, { backgroundColor: 'white', borderColor: 'grey', }]}>
                                {(following.status === 'accepted' && isFollowing) ? <Text style={[styles.button]}>Following</Text> : <Text style={styles.button}>Remove</Text>}
                            </View>
                        </TouchableOpacity>}

                    </View>
                )
                    : (profile._id !== authProfile._id && <TouchableOpacity onPress={() => { handleFollow() }}>
                        <View style={[styles.buttonContainer, isFollowing ? { backgroundColor: 'white', borderColor: 'grey', } : { backgroundColor: '#1992fb', borderColor: '#1992fb', }]}>
                            <Text style={[styles.button, { color: 'white', fontWeight: '500' }]}>Follow</Text>
                        </View>
                    </TouchableOpacity>)}
            </View>
        </View>
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
        width: 80,
        height: 27,
        borderRadius: 3,
        alignItems: 'center',
        marginHorizontal: 2
    },
    button: {
        alignSelf: 'center',
        paddingVertical: 4,
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