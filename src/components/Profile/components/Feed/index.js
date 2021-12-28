import React, { useEffect } from 'react';
import { Image, FlatList, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Feed = ({ post }) => {

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: post.imageUri }} style={styles.image} />
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
