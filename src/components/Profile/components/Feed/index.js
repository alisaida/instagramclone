import React, { useEffect, useState } from 'react';
import { Image, FlatList, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CacheImage from '../../../CacheImage'

import { retrievePostById } from '../../../../api/posts';
const Feed = ({ postId }) => {

    const [post, setPost] = useState(null);

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
                const postData = response.data;
                if (postData) {
                    setPost(postData);
                }
            }
        } catch (e) {
            console.log(`Feed Component: Failed to retrievePostById for id ${postId}`, e);
        }
    }

    return (
        post &&
        <TouchableOpacity style={styles.container}>
            <CacheImage showProgress={true} uri={post.imageUri} style={styles.image} />
        </TouchableOpacity>
    );
};

export default Feed;

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
