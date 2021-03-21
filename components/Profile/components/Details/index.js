import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';


import ProfilePicture from '../../../ProfilePicture';
import MyHeader from '../MyHeader';
import Stat from '../Stat';

import styles from './styles';

import postsData from '../../../../data/photos'
import Feed from '../../../Feed';

const Profile = ({ userId }) => {
    const numColumns = 3;
    //const userId = '1';
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
                    <ProfilePicture uri={userPosts.user.uri} size={100} />
                </View>
                <View style={styles.stats}>
                    <Stat statName='Posts' statCount='40.9 k' />
                    <Stat statName='Followers' statCount='8.7 M' />
                    <Stat statName='Following' statCount='1,751' />
                </View>
            </View>
            <Text style={styles.profileName}>Said Ali</Text>

        </View >
    )
}
export default Profile;