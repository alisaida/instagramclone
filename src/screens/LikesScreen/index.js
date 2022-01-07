import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl } from 'react-native';

import PostLikeList from '../../components/Post/components/PostLikeList';
import LikeItem from '../../components/Post/components/PostLikeItem';

import { retrievePostLikesById } from '../../api/posts';

const LikesScreen = ({ navigation, route }) => {

    const [postLikes, setPostLikes] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [scrollToEndReached, setScrollToEndReached] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPostLikes();
    }, []);

    const fetchPostLikes = async () => {
        try {
            const response = await retrievePostLikesById(route.params.post._id, 1, 10);

            if (response && response.data) {
                const likes = response.data;
                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);
                setPostLikes(likes);
            }
        } catch (e) {
            console.log(`LikesScreen: Failed to retrievePostLikesById for postId ${route.params.post._id}`, e);
        }
    }

    const fetchMorePostLikes = async () => {
        try {
            const response = await retrievePostLikesById(route.params.post._id, page, 10);
            if (response && response.data) {
                const newLikes = response.data;

                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);

                if (newLikes && newLikes.length > 0) {
                    setPostLikes((oldLikes) => {
                        return oldLikes.concat(newLikes);
                    });
                }
            }
        } catch (e) {
            console.log(`LikesScreen: Failed to retrievePostLikesById for id ${route.params.post._id}`, e);
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        fetchPostData();
        setRefreshing(false);
    }, [refreshing]);

    if (!postLikes)
        return null;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <FlatList
                    data={postLikes}
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => <PostLikeList postLike={item} navigation={navigation} />}
                    contentContainerStyle={{ flexGrow: 1 }}
                    // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    onEndReached={() => { setScrollToEndReached(true) }}
                    onMomentumScrollEnd={() => {
                        if (scrollToEndReached) {
                            setRefreshing(true)
                            fetchMorePostLikes();
                            setScrollToEndReached(false);
                            setRefreshing(false)
                        }
                    }}
                />
            </View>
        </SafeAreaView >
    )
}

export default LikesScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
