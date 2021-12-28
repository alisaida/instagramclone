import React, { useState, useEffect } from 'react';
import { View } from 'react-native'
import SecureStorage from 'react-native-secure-storage';

import Header from './components/Header/index';
import Body from './components/Body/index';
import Footer from './components/Footer/index';

import { fetchProfileById } from '../../api/profile';

const Post = ({ post, navigation }) => {

    const [authProfile, setAuthProfile] = useState(null);
    const [profile, setProfile] = useState(null);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        loadAuthProfile();
        fetchProfile();
    }, [])

    const loadAuthProfile = async () => {
        const userId = await SecureStorage.getItem('userId');
        try {
            const authProfile = await fetchProfileById(userId);
            setAuthProfile(authProfile);
        } catch (e) {
            console.log(`Post: Failed to load authProfile for userId ${auth.userId}`, e)
        }
    }

    const fetchProfile = async () => {
        const profile = await fetchProfileById(post.userId);
        setProfile(profile);
    }

    if (!profile || !authProfile) {
        return <View></View>
    }

    return (
        <View>
            <Header profile={profile} />
            <Body imageUri={post.imageUri} />
            <Footer navigation={navigation} authProfile={authProfile} profile={profile} post={post} isSaved={false} />
        </View>
    );
}

export default Post;