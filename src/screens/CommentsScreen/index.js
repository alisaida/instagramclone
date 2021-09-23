import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl } from 'react-native';

import PostCommentList from '../../components/Post/components/PostCommentList';
import CommentItem from '../../components/Post/components/PostCommentItem';

import { retrievePostById } from '../../api/posts';

const CommentScreen = ({ navigation, route }) => {

    const [postData, setPostData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        fetchPostData();
    }, []);

    const fetchPostData = async () => {
        try {
            const data = await retrievePostById(route.params.postId);
            if (data) {
                setPostData(data);
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

    if (!postData || !postData.comments || !postData.post)
        return null;
    // console.log(post)

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <FlatList
                    data={postData.comments}
                    ListHeaderComponent={
                        <CommentItem
                            name={route.params.profile.name} imageUri={'place.holder'} comment={postData.post.caption} createdAt={postData.post.createdAt}
                        />
                    }
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => <PostCommentList postComment={item} navigation={navigation} />}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </View>
        </SafeAreaView >
    )
}

export default CommentScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
