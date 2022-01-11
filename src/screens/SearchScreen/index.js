import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, } from 'react-native'
import Search from '../../components/Search';

import { retrievePosts } from '../../api/posts';
import Feed from '../../components/Profile/components/Feed';

const SearchScreen = () => {

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [scrollToEndReached, setScrollToEndReached] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(15);

    useEffect(() => {
        fetchPosts();
    }, []);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
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
            console.log(`SearchScreen: Failed to retrievePosts`, error);
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
        <>
            <Search isSearching={isSearching} setIsSearching={setIsSearching} />
            {
                !isSearching &&
                <View>
                    <FlatList
                        data={posts}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item, index }) => <Feed postId={item} />}
                        numColumns={3}
                        contentContainerStyle={{ flexGrow: 1 }}
                        onEndReached={() => { setScrollToEndReached(true) }}
                        onMomentumScrollEnd={() => {
                            if (scrollToEndReached) {
                                loadMoreOlderPosts();
                                setScrollToEndReached(false);
                            }
                        }}
                    />
                </View>
            }
        </>

    );
}

export default SearchScreen;