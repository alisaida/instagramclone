import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';

import { listPosts } from '../../graphql/queries';
import { retrievePosts } from '../../api/posts';

import Post from '../Post';
import Stories from "../../components/Stories";
import SecureStorage from 'react-native-secure-storage'
const Feed = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const postData = await retrievePosts();
            if (postData)
                setPosts(postData);
        } catch (error) {


            console.log('failed');
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
            keyExtractor={({ _id }) => _id}
            renderItem={({ item }) => <Post post={item} navigation={navigation} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    );
}

export default Feed;