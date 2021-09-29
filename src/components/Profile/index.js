import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

import ProfilePicture from '../ProfilePicture';
import Stat from './components/Stat';
import Details from './components/Details'

import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import postsData from '../../data/photos'
import Feed from './components/Feed';

import { retrievePostsByUserId } from '../../api/posts';

const Profile = ({ profile, isAuthProfile, navigation }) => {

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    const numColumns = 3;
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if (profile.userId) {
            fetchPostData();
        }
    }, []);


    const fetchPostData = async () => {
        const postData = await retrievePostsByUserId(profile.userId)
        setPosts(postData);
    }

    const header = () => {
        return (
            <View>
                <Details profile={profile} isAuthProfile={isAuthProfile} navigation={navigation} />
                <View style={styles.headerButtons}>
                    <Fontisto name='nav-icon-grid' size={20} />
                    <MaterialIcons name='person-pin' size={30} />
                </View>
            </View>
        )
    }

    return (
        <View
            flatListStyle={styles.container} //this may cause issues
        >
            <FlatList
                data={posts}
                keyExtractor={({ _id }) => _id}
                renderItem={({ item }) => <Feed post={item} />}
                numColumns={numColumns}
                ListHeaderComponent={header}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View >
    )
}

export default Profile;

const flatListStyle = StyleSheet.create({
    container: {
        height: '100%'
    }
})
