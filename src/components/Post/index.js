import React, { useState, useEffect } from 'react';
import { View } from 'react-native'

import Header from './components/Header/index';
import Body from './components/Body/index';
import Footer from './components/Footer/index';

import { fetchProfileById } from '../../api/profile';

const post = {

}

const Post = ({ post }) => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, [])

    const fetchProfile = async () => {
        const profile = await fetchProfileById(post.userId);
        setProfile(profile);
    }

    if (!profile) {
        return <View></View>
    }

    return (
        <View>
            <Header imageUri={profile.profilePicture} name={profile.name} />
            <Body imageUri={post.imageUri} />
            <Footer name={profile.name} caption={post.content} likesCount={3} postedAt={post.createdAt} isLiked={false} isSaved={false} />
        </View>
    );
}

export default Post;