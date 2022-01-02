import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';

import { retrievePosts } from '../../api/posts';

import Post from '../Post';
import Stories from "../../components/Stories";
import SecureStorage from 'react-native-secure-storage'
const Feed = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await retrievePosts();
            if (response && response.data) {
                const postsData = response.data;
                setPosts(postsData);
            }
        } catch (error) {
            console.log(`Feed: Failed retrievePosts data`, error);
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        fetchPosts();
        setRefreshing(false);
    }, [refreshing])

    return (
        <FlatList
            data={posts}
            ListHeaderComponent={<Stories />}
            keyExtractor={(item, index) => item}
            renderItem={({ item }) => <Post postId={item} navigation={navigation} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    );
}

export default Feed;