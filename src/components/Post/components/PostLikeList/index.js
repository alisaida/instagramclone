import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LikeItem from '../PostLikeItem';

import { fetchProfileById } from '../../../../api/profile';

const PostLikeList = ({ postLike, navigation }) => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile()
    }, []);

    const fetchProfile = async () => {
        try {
            const profile = await fetchProfileById(postLike.userId);
            if (profile)
                setProfile(profile);
        } catch (error) {
            console.log(error);
        }
    }

    if (!profile || !profile.name)
        return null;

    return (
        <LikeItem
            name={profile.name}
            imageUri={'place.holder'}
            username={profile.username}
        />

    )
}

export default PostLikeList
