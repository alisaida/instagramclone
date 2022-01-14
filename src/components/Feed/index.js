import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { retrievePosts } from '../../api/posts';

import Post from '../Post';
import Stories from "../../components/Stories";
// import { styles } from './styles'
import BottomDrawer from '../BottomDrawer';
import DrawerSearch from '../DrawerSearch';
import SecureStorage from 'react-native-secure-storage';

const Feed = ({ navigation }) => {

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [scrollToEndReached, setScrollToEndReached] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const [visible, setVisible] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

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
    }, [refreshing]);

    const dismissMenu = () => {
        setVisible(false);
        setIsMenu(false);
    }

    const toggleMenu = (postId) => {
        setSelectedPost(postId);
        setIsMenu(true)
        setVisible(true);
    }

    return (
        <>
            <FlatList
                data={posts}
                ListHeaderComponent={<Stories />}
                keyExtractor={(item, index) => String(item)}
                renderItem={({ item }) => <Post postId={item} navigation={navigation} toggleMenu={toggleMenu} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onEndReached={() => { setScrollToEndReached(true) }}
                onMomentumScrollEnd={() => {
                    if (scrollToEndReached) {
                        loadMoreOlderPosts();
                        setScrollToEndReached(false);
                    }
                }}
            />
            {
                visible && <BottomDrawer onDismiss={dismissMenu} minHeight={350} >
                    {
                        isMenu && <DrawerSearch selectedPost={selectedPost} onDismiss={dismissMenu} />
                    }
                </BottomDrawer>
            }
        </>
    );
}

export default Feed;

const styles = StyleSheet.create({
});