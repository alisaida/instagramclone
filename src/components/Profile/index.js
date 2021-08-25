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

const Profile = () => {
    const numColumns = 3;
    const userId = '611d2138a972c0741b74e57c';

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState(null);

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjk1NTQ0MTgsImV4cCI6MTYyOTcyNzIxOCwiYXVkIjoiNjExZDIxMzhhOTcyYzA3NDFiNzRlNTdjIiwiaXNzIjoiaHR0cHM6Ly93d3cubXl3ZWJzaXRlLmNvbSJ9.2Gv3oEX4N2mIvJ_MpuKqjAC2c9plK2dTJbLtcbD9CuA';

    useEffect(() => {
        fetchProfileData();
        fetchPostsData();
    }, [])

    const fetchProfileData = () => {
        fetch(`http://localhost:5000/api/profiles/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                console.log(error);
            }

            setProfile(data.profile);
        }).catch(error => {
            console.log(error);
        })
    }

    const fetchPostsData = () => {
        fetch(`http://localhost:5000/api/posts/users/${userId}/fetchPosts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                console.log(error);
            }
            setPosts(data);
        }).catch(error => {
            console.log(error);
        })
    }

    if (!posts || !profile) {
        return (
            <SafeAreaView>
                <ActivityIndicator />
            </SafeAreaView >
        )
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