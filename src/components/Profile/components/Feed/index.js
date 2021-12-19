import React, { useEffect } from 'react';
import { Image, FlatList, Dimensions, Text } from 'react-native';

const numColumns = 3;

const Feed = ({ post }) => {

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    return (
        <Image
            source={{ uri: post.imageUri }}
            style={{ aspectRatio: 1, flex: 1 / numColumns }}
        />
    );
};

export default Feed;
