import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';


import ProfilePicture from '../../../ProfilePicture';
import MyHeader from '../MyHeader';
import Stat from '../Stat';

import styles from './styles';

import postsData from '../../../../data/photos'
import Feed from '../../../Feed';

const Profile = ({ profile, navigation }) => {
    const numColumns = 3;
    //const userId = '1';
    const [userPosts, setUserPosts] = useState(null);

    //dummy profile stats
    useEffect(() => {
        const userPosts = postsData.find(postData => postData.user.id === "1");
        setUserPosts(userPosts);

    }, []);

    if (!userPosts) {
        return null
    }

    if (!profile)
        return null;

    return (
        <View >
            {/* myheader or header */}
            <MyHeader username={profile.username} navigation={navigation} />
            <View style={styles.container}>
                <View>
                    <ProfilePicture uri={profile.profilePicture} size={100} />
                </View>
                <View style={styles.stats}>
                    <Stat statName='Posts' statCount='40.9 k' />
                    <Stat statName='Followers' statCount='8.7 M' />
                    <Stat statName='Following' statCount='1,751' />
                </View>
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>

        </View >
    )
}
export default Profile;