import React, { useEffect, useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl, TextInput, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import SecureStorage from 'react-native-secure-storage';
import PostCommentList from '../../components/Post/components/PostCommentList';
import CommentItem from '../../components/Post/components/PostCommentItem';
import ProfilePicture from '../../components/ProfilePicture';

import { retrievePostById, retrievePostCommentsById, createCommentByPostId } from '../../api/posts';
import { fetchProfileById } from '../../api/profile';

const CommentScreen = ({ navigation, route }) => {

    const [comments, setComments] = useState([]);
    const [postData, setPostData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [authProfile, setAuthProfile] = useState(null);
    const commentInput = useRef();
    const [scrollToEndReached, setScrollToEndReached] = useState(false);
    const [page, setPage] = useState(1);


    useEffect(() => {
        fetchPostData();
        fetchPostComments();
        loadAuthProfile();
    }, []);

    const loadAuthProfile = async () => {
        try {
            const userId = await SecureStorage.getItem('userId');
            const authProfile = await fetchProfileById(userId);
            setAuthProfile(authProfile);
        } catch (e) {
            console.log(`Post: Failed to load authProfile for userId ${auth.userId}`, e)
        }
    }

    const fetchPostData = async () => {
        try {
            const response = await retrievePostById(route.params.post._id);
            if (response && response.data) {
                setPostData(response.data);
            }
        } catch (e) {
            console.log(`CommentsScreen: Failed to retrievePostById for id ${route.params.post._id}`, e);
        }
    }

    const fetchPostComments = async () => {
        try {
            const response = await retrievePostCommentsById(route.params.post._id, 1, 10);
            if (response && response.data) {
                const comments = response.data;
                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);
                setComments(comments);
            }
        } catch (e) {
            console.log(`CommentsScreen: Failed to retrievePostCommentsById for id ${route.params.post._id}`, e);
        }
    }

    const fetchMorePostComments = async () => {
        try {
            const response = await retrievePostCommentsById(route.params.post._id, page, 10);
            if (response && response.data) {
                const newComments = response.data;

                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);

                //filter out messages that already displayed
                const displayedComments = comments.map(comment => {
                    return comment._id;
                });

                const filteredComments = newComments.filter(comment => !displayedComments.includes(comment._id));
                if (filteredComments && filteredComments.length > 0) {
                    setComments((oldComments) => {
                        return oldComments.concat(filteredComments);
                    });
                }
            }
        } catch (e) {
            console.log(`CommentsScreen: Failed to retrievePostCommentsById for id ${route.params.post._id}`, e);
        }
    }

    if (!postData || !postData.caption || !authProfile) {
        return null;
    }

    const createComment = async () => {
        if (!newComment || newComment === '')
            return;
        try {
            const response = await createCommentByPostId(route.params.post._id, newComment);
            if (response && response.status === 201) {
                const comment = response.data;
                setComments([comment, ...comments]);
                commentInput.current.clear();
            }
        } catch (e) {
            console.log(`Post: Failed to createCommentByPostId for id ${route.params.post._id}`, e);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={65} >
            <View style={styles.container}>
                <FlatList
                    data={comments}
                    ListHeaderComponent={
                        <CommentItem
                            name={route.params.profile} comment={postData.caption} createdAt={postData.createdAt}
                        />
                    }
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => <PostCommentList postComment={item} navigation={navigation} />}
                    contentContainerStyle={{ flexGrow: 1 }}
                    onEndReached={() => { setScrollToEndReached(true) }}
                    onMomentumScrollEnd={() => {
                        if (scrollToEndReached) {
                            setRefreshing(true)
                            fetchMorePostComments();
                            setScrollToEndReached(false);
                            setRefreshing(false)
                        }
                    }}
                />
                <View style={styles.bottomContainer}>
                    <ProfilePicture size={40} uri={authProfile.profilePicture} />
                    <View style={styles.inputContainer}>
                        <ScrollView keyboardDismissMode='on-drag'>
                            <TextInput
                                clearButtonMode="always"
                                style={styles.input}
                                placeholder="Add a comment..."
                                placeholderTextColor="#9e9e9e"
                                onChangeText={setNewComment}
                                ref={commentInput}
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
        backgroundColor: '#efefef',
    },
    input: {
        flex: 1,

    }
})
