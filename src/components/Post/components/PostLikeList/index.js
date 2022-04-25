import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import LikeItem from '../PostLikeItem';

import { fetchProfileById } from '../../../../api/profile';

const PostLikeList = ({ postLike, navigation }) => {

    const [profile, setProfile] = useState(null);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        fetchProfile()
    }, []);

    const fetchProfile = async () => {
        try {
            const profile = await fetchProfileById(postLike.userId);
            console.log(profile)
            if (profile)
                setProfile(profile);
        } catch (error) {
            console.log(error);
            console.log(`PostLikeList: Failed to fetchProfileById for userId ${postLike.userId}`, error);
        }
    }

    const goToProfile = () => {
        navigation.push('Root', { screen: 'ProfileScreen', params: { otherProfile: profile, isAuthProfile: false } });
    }

    if (!profile || !profile.name)
        return null;

    return (
        <TouchableOpacity onPress={goToProfile}>
            <LikeItem name={profile.name} imageUri={profile.profilePicture} username={profile.username} />
        </TouchableOpacity>

    )
}

export default PostLikeList
