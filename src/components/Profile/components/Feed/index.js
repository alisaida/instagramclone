import React, { useEffect } from 'react';
import { Image, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';

const numColumns = 3;

const Feed = ({ post }) => {

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    return (
        <TouchableOpacity style={{ aspectRatio: 1, flex: 1 / numColumns }}>
            <Image
                source={{ uri: post.imageUri }}
                style={{
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    // resizeMode: "contain"
                }}
            />
        </TouchableOpacity>
    );
};

export default Feed;
