import React, { useState, useEffect } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment'


import styles from './styles';
import { retrievePostById, likePostById, unlikePostById } from '../../../../api/posts';

const Footer = ({ navigation, authProfile, profile, post, isSaved: isSavedProp }) => {

    const [postData, setPostData] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const onLikePressed = async () => {
        let apiResponse;
        try {
            if (isLiked) {
                apiResponse = await unlikePostById(post._id);
            } else {
                apiResponse = await likePostById(post._id);
            }

            setIsLiked(!isLiked);
            const amount = isLiked ? -1 : 1;
            setLikesCount(likesCount + amount);
        } catch (e) {
            console.log(e)
        }
    }

    const onSavePressed = () => {
        setIsSaved(!isSaved);
    }

    useEffect(() => {
        setIsSaved(isSavedProp);
        fetchPostData();
    }, []);

    const fetchPostData = async () => {
        try {
            const data = await retrievePostById(post._id);
            if (data) {
                setPostData(data);
                setLikesCount(data.likes.length);
                setIsLiked(checkLikes(data.likes));
                setCommentsCount(data.comments.length)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const checkLikes = (postLikes) => {
        const likesArr = postLikes.filter(like => like.userId === authProfile.userId);
        return likesArr.length > 0;
    }

    const navigateToCommentsScreen = () => {
        navigation.push('Root', { screen: 'Comments', params: { post: post, postComments: postData.comments, postId: post._id, profile: profile } });
    }

    const navigateToLikeScreen = () => {
        navigation.push('Root', { screen: 'Likes', params: { post: post } });
    }

    return (
        <View style={styles.container} >
            <View style={styles.icons}>
                <View style={styles.iconsLeft}>
                    <TouchableWithoutFeedback onPress={onLikePressed} >
                        {
                            isLiked ? <Ionicons name='heart' size={25} color={'red'} />
                                : <Ionicons name='heart-outline' size={25} />
                        }
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={navigateToCommentsScreen}>
                        <Text style={styles.flipY}><Ionicons name='chatbubble-outline' size={22.5} /></Text>
                    </TouchableWithoutFeedback>
                    <Ionicons name='paper-plane-outline' size={22.5} />
                </View>
                <View style={styles.iconsRight}>
                    <TouchableWithoutFeedback onPress={onSavePressed}>
                        {
                            isSaved ? <FontAwesome name='bookmark' size={22} color={'black'} />
                                : <FontAwesome name='bookmark-o' size={22} />
                        }
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={navigateToLikeScreen}>
                <Text style={styles.likes} >{likesCount.toLocaleString()} Likes</Text>
            </TouchableWithoutFeedback>
            {post.caption && <View style={styles.postDetails}>
                <Text style={styles.postUser} >{profile.name}</Text>
                <Text style={styles.caption} >{post.caption}</Text>
            </View>}
            <TouchableWithoutFeedback onPress={navigateToCommentsScreen}>
                <View>
                    {commentsCount > 0 && (commentsCount == 1 ?
                        (<Text style={styles.comments} >View 1 comment</Text>) :
                        (<Text style={styles.comments} >View all {commentsCount} comments</Text>))}
                </View>
            </TouchableWithoutFeedback>
            <Text style={styles.postedAt} >{moment(post.createdAt).format("MMMM Do YYYY")}</Text>
        </View >
    );
}

export default Footer;