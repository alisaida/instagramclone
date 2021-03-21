import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';


import ProfilePicture from '../ProfilePicture';
import MyHeader from './components/MyHeader';
import Stat from './components/Stat';
import Details from './components/Details'

import styles from './styles';

import postsData from '../../data/photos'
import Feed from './components/Feed';

const Profile = () => {
    const numColumns = 3;
    const userId = '1';
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        const userPosts = postsData.find(postData => postData.user.id === userId);
        setUserPosts(userPosts);
    });

    if (!userPosts) {
        return (
            <SafeAreaView>
                <ActivityIndicator />
            </SafeAreaView >
        )
    }

    return (
        <View >
            <FlatList
                data={userPosts.posts}
                keyExtractor={({ postId }) => postId}
                renderItem={({ item }) => <Feed post={item} />}
                numColumns={numColumns}
                ListHeaderComponent={<Details userId={userId} />}
            />
        </View >
    )
}
export default Profile;