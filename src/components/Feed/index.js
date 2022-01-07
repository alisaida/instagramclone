import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';

import { retrievePosts } from '../../api/posts';

import Post from '../Post';
import Stories from "../../components/Stories";
import SecureStorage from 'react-native-secure-storage'
const Feed = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [scrollToEndReached, setScrollToEndReached] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await retrievePosts(1, size);
            if (response && response.data) {
                const posts = response.data;
                // console.log('1st api call', posts)
                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);
                setPosts(posts);
            }
        } catch (error) {
            console.log(`Feed: Failed retrievePosts data`, error);
        }
    }

    const loadMoreOlderPosts = async () => {
        try {
            const response = await retrievePosts(page, size);
            if (response && response.data) {
                const newPosts = response.data;
                // console.log(`api call ${page}`, newPosts);
                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);
                setPosts((oldPosts) => {
                    return oldPosts.concat(newPosts);
                });
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
            keyExtractor={(item, index) => String(item)}
            renderItem={({ item }) => <Post postId={item} navigation={navigation} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={() => { setScrollToEndReached(true) }}
            onMomentumScrollEnd={() => {
                if (scrollToEndReached) {
                    loadMoreOlderPosts();
                    setScrollToEndReached(false);
                }
            }}
        />
    );
}

export default Feed;