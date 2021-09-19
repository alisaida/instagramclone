import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

import ProfilePicture from '../ProfilePicture';
import Stat from './components/Stat';
import Details from './components/Details'

import styles from './styles';

import postsData from '../../data/photos'
import Feed from './components/Feed';

import { retrievePosts } from '../../api/posts';

const Profile = ({ profile, isAuthProfile, navigation }) => {

    useEffect(() => {
        // Side-effect logic...
        return () => {
            // Side-effect cleanup
        };
    }, []);



    const numColumns = 3;
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetchPostsData();
    }, []);

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
                ListHeaderComponent={<Details profile={profile} isAuthProfile={isAuthProfile} navigation={navigation} />}
            />
        </View >
    )
}
export default Profile;