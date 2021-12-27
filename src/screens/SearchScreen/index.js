import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, } from 'react-native'
import Search from '../../components/Search';

import { retrievePosts } from '../../api/posts';
import Feed from '../../components/Profile/components/Feed'

const SearchScreen = () => {

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
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
        <>

            <Search isSearching={isSearching} setIsSearching={setIsSearching} />
            {
                !isSearching &&
                <View>
                    <FlatList
                        data={posts}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => <Feed post={item} />}
                        numColumns={3}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </View>
            }
        </>

    );
}

export default SearchScreen;