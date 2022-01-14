import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native'
import SecureStorage from 'react-native-secure-storage';

import Header from './components/Header/index';
import Body from './components/Body/index';
import Footer from './components/Footer/index';

import { fetchProfileById } from '../../api/profile';
import { retrievePostById, checkIsLiked, likePostById, unlikePostById, bookmarkPostById, unBookmarkPostById, checkIsBookmarked } from '../../api/posts';

const Post = ({ postId, navigation, toggleMenu }) => {

    const [authProfile, setAuthProfile] = useState(null);
    const [profile, setProfile] = useState(null);
    const [post, setPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);

    useFocusEffect(
        useCallback(() => {
            loadAuthProfile();
            fetchPostData();

            return () => { };
        }, [])
    );

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
            const response = await retrievePostById(postId);
            if (response && response.data) {
                const post = response.data;
                const profile = await fetchProfileById(post.userId);
                const isLiked = await checkIsLiked(post._id);
                const isBookmarked = await checkIsBookmarked(post._id);

                if (profile) {
                    setPost(post);
                    setProfile(profile);
                    setIsLiked(isLiked);
                    setIsBookmarked(isBookmarked);

                    setLikesCount(post.likes);
                    setCommentsCount(post.comments);
                }
            }
        } catch (e) {
            console.log(`Post: Failed to fetchProfileById for id ${postId}`, e);
        }
    }

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
            console.log(`Post: Failed to like/unlike for ${post._id}`, e);
        }
    }

    const onBookmarkPressed = async () => {
        let apiResponse;
        try {
            if (isBookmarked) {
                apiResponse = await unBookmarkPostById(post._id);
            } else {
                apiResponse = await bookmarkPostById(post._id);
            }

            setIsBookmarked(!isBookmarked);
        } catch (e) {
            console.log(`Post: Failed to bookmark/unbookmark for ${post._id}`, e);
        }
    }

    if (!profile || !authProfile) {
        return <View></View>
    }

    return (
        <View>
            <Header
                profile={profile}
            />
            <Body
                imageUri={post.imageUri}
                onLikePressed={onLikePressed}
            />
            <Footer
                navigation={navigation}
                authProfile={authProfile}
                profile={profile}
                post={post}
                likesCount={likesCount}
                commentsCount={commentsCount}
                isBookmarked={isBookmarked}
                isLiked={isLiked}
                onBookmarkPressed={onBookmarkPressed}
                onLikePressed={onLikePressed}
                toggleMenu={toggleMenu}
            />
        </View>
    );
}

export default Post;