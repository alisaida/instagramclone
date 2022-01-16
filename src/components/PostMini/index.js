import React, { useEffect, useState } from 'react';
import { Image, FlatList, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CacheImage from '../CacheImage'

import { retrievePostById } from '../../api/posts';
import { fetchProfileById } from '../../api/profile';

const PostMini = ({ postId, screenName = 'Posts' }) => {

    const navigation = useNavigation();
    const [post, setPost] = useState(null);
    const [profile, setProfile] = useState(null);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        fetchPostData();
    }, []);

    const fetchPostData = async () => {
        try {
            const response = await retrievePostById(postId);
            if (response && response.data) {
                const post = response.data;

                const profile = await fetchProfileById(post.userId);
                if (profile) {
                    setPost(post);
                    setProfile(profile);
                }
            }
        } catch (e) {
            console.log(`PostMini Component: Failed to retrievePostById/fetchProfileById for id ${postId}`, e);
        }
    }



    if (!post) return null;

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('PostScreen', { post: post, profile: profile, screenName: screenName })}>
            <CacheImage showProgress={true} uri={post.imageUri} style={styles.image} />
        </TouchableOpacity>
    );
};

export default PostMini;

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1,
        flex: 1 / 3,
        margin: 0.3
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
    }
})
