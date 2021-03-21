import React from 'react';
import { Image, FlatList, Dimensions } from 'react-native';

const numColumns = 3;

const Content = ({ content }) => {
    console.log(content)
    return (
        // <Image
        //     source={{ uri: content.imageUri }}
        //     style={{ aspectRatio: 1, flex: 1 / numColumns }}
        // />

        <Image
            source={{ uri: content.imageUri }}
            width={120} height={120}
        />
    );
};

export default Content;
