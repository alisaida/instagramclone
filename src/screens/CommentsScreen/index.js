import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl } from 'react-native';

import PostComment from '../../components/PostComment';
import CommentItem from '../../components/PostComment/components/CommentItem';

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
    }, [refreshing])

    const separator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                    marginHorizontal: "3%"
                }}
            />
        )
    }

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
                    renderItem={({ item }) => <PostComment postComment={item} navigation={navigation} />}
                    // ItemSeparatorComponent={separator}
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
