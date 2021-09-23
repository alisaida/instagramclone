import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl } from 'react-native';

import PostLikeList from '../../components/Post/components/PostLikeList';
import LikeItem from '../../components/Post/components/PostLikeItem';

import { retrievePostLikesById } from '../../api/posts';

const LikesScreen = ({ navigation, route }) => {

    const [postLikes, setPostLikes] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchPostData();
    }, []);

    const fetchPostData = async () => {
        try {
            const data = await retrievePostLikesById(route.params.post._id);
            if (data) {
                setPostLikes(data);
            }
        } catch (e) {
            console.log(e)
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
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
