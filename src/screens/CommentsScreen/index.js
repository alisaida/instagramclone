import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl, TextInput, ScrollView, Button, KeyboardAvoidingView } from 'react-native';

import PostCommentList from '../../components/Post/components/PostCommentList';
import CommentItem from '../../components/Post/components/PostCommentItem';

import { retrievePostById, createCommentByPostId } from '../../api/posts';

const CommentScreen = ({ navigation, route }) => {

    const [postData, setPostData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [newComment, setNewComment] = useState('');


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

    const createComment = async () => {
        if (!newComment || newComment === '')
            return;
        try {
            const response = await createCommentByPostId(route.params.postId, newComment);
            if (response) {
                console.log(response);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={65} //style={styles.keyboardAvoider}
        >

            <View style={styles.container}>
                <FlatList
                    data={postData.comments}
                    ListHeaderComponent={
                        <CommentItem
                            name={route.params.profile} imageUri={'place.holder'} comment={postData.post.caption} createdAt={postData.post.createdAt}
                        />
                    }
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => <PostCommentList postComment={item} navigation={navigation} />}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
                <View style={styles.bottomContainer}>
                    <View style={styles.inputContainer}>
                        <ScrollView keyboardDismissMode='on-drag'>
                            <TextInput
                                clearButtonMode="always"
                                style={styles.input}
                                placeholder="Add a comment..."
                                placeholderTextColor="#9e9e9e"
                                onChangeText={setNewComment}
                            />
                        </ScrollView>
                        {
                            newComment ? <Button title="Post" onPress={() => { createComment() }} /> : null
                        }
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default CommentScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    bottomContainer: {
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginTop: 2
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 20,
        height: 45,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    input: {
        flex: 1,

    }
})
