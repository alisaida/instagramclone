import React from 'react';
import { Image, FlatList, Dimensions, Text } from 'react-native';

const numColumns = 3;

const Feed = ({ post }) => {

    return (
        <Image
            source={{ uri: post.uri }}
            style={{ aspectRatio: 1, flex: 1 / numColumns }}
        />
    );
};

export default Feed;
