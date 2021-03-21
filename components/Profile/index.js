import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';


import ProfilePicture from '../ProfilePicture';
import MyHeader from './components/MyHeader';
import Stat from './components/Stat';
import GridFeed from './components/GridFeed';
import styles from './styles';

import postsData from '../../data/photos'
import Content from './components/GridFeed/component/Content';

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
            {/* myheader or header */}
            <MyHeader />
            <View style={styles.container}>
                <View>
                    <ProfilePicture uri={userPosts.user.imageUri} size={100} />
                </View>
                <View style={styles.stats}>
                    <Stat statName='Posts' statCount='40.9 k' />
                    <Stat statName='Followers' statCount='8.7 M' />
                    <Stat statName='Following' statCount='1,751' />
                </View>
            </View>
            <Text style={styles.profileName}>Said Ali</Text>

            <FlatList
                data={userPosts.posts}
                // keyExtractor={({ userPosts.posts.postId }) => id}
                renderItem={({ item }) => <Content post={item} />}
                numColumns={numColumns}
            />
        </View >
    )
}
export default Profile;