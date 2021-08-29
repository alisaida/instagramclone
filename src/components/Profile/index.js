import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';


import ProfilePicture from '../ProfilePicture';
import MyHeader from './components/MyHeader';
import Stat from './components/Stat';
import Details from './components/Details'

import styles from './styles';

import postsData from '../../data/photos'
import Feed from './components/Feed';

import { currentAuthProfile } from '../../api/profile';
import { retrievePosts } from '../../api/posts';

const Profile = () => {
    const numColumns = 3;

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetchProfileData();
        fetchPostsData();
    }, [])

    const fetchProfileData = async () => {
        const currentUser = await currentAuthProfile();
        setProfile(currentUser);
    }

    const fetchPostsData = async () => {
        const postData = await retrievePosts();
        setPosts(postData);
    }

    return (
        <View >
            <FlatList
                data={posts}
                keyExtractor={({ _id }) => _id}
                renderItem={({ item }) => <Feed post={item} />}
                numColumns={numColumns}
                ListHeaderComponent={<Details profile={profile} />}
            />
        </View >
    )
}
export default Profile;