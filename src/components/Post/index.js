import React, { useState, useEffect } from 'react';
import { View } from 'react-native'
import SecureStorage from 'react-native-secure-storage';

import Header from './components/Header/index';
import Body from './components/Body/index';
import Footer from './components/Footer/index';

import { fetchProfileById } from '../../api/profile';


const post = {

}

const Post = ({ post, navigation }) => {

    const [authProfile, setAuthProfile] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadAuthProfile();
        fetchProfile();
    }, [])

    const loadAuthProfile = async () => {
        const auth = await SecureStorage.getItem('authProfile');
        try {
            setAuthProfile(JSON.parse(auth));
        } catch (e) {
            console.log('failed')
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