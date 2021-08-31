import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
// import { API, graphqlOperation } from 'aws-amplify';

import { listPosts } from '../../graphql/queries';
import { retrievePosts } from '../../api/posts';

import Post from '../Post';
import Stories from "../../components/Stories";

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const postData = await retrievePosts();
        setPosts(postData);
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
            renderItem={({ item }) => <Post post={item} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    );
}

export default Feed;