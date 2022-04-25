import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, } from 'react-native'
// import Search from '../../components/Search';
import { useNavigation, useRoute, NavigationAction } from '@react-navigation/native';

import { getLocationByName, getPostsByLocationId } from '../../api/posts';
import PostMini from '../../components/PostMini'

const LocationsScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [tagId, setLocationId] = useState('');
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [scrollToEndReached, setScrollToEndReached] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(15);

    useEffect(() => {
        navigation.setOptions({
            title: route.params.location.location
        });
        fetchPosts();
    }, []);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await getPostsByLocationId(route.params.location._id, 1, size);
            if (response && response.data) {
                const posts = response.data;
                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);
                setPosts(posts);
            }
        } catch (error) {
            console.log(`LocationsScreen: Failed to getLocationByName`, error);
        }
    }

    const loadMoreOlderPosts = async () => {
        try {
            const response = await getPostsByLocationId(route.params.location._id, page, size);
            if (response && response.data) {
                const newPosts = response.data;
                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);
                setPosts((oldPosts) => {
                    return oldPosts.concat(newPosts);
                });
            }
        } catch (error) {
            console.log(`LocationsScreen: Failed getLocationByName data`, error);
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        fetchPosts();
        setRefreshing(false);
    }, [refreshing])

    return (
        <>
            <View>
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => <PostMini postId={item} />}
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

        </>

    );
}

export default LocationsScreen;