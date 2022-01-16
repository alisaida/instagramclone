import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import Post from '../../components/Post';
const PostScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [post, setPost] = useState(null);

    useFocusEffect(
        useCallback(() => {
            setPost(route.params.post)

            return () => { };
        }, [])
    );

    if (!post || !post._id)
        return null;

    return (
        <View
            onTouchStart={e => {
                this.onTouchStartX = e.nativeEvent.pageX;
                this.onTouchStartY = e.nativeEvent.pageY;

            }}
            onTouchEnd={e => {
                const onTouchEndX = e.nativeEvent.pageX;
                const onTouchEndY = e.nativeEvent.pageY;

                const deltaX = Math.abs(onTouchEndX - onTouchStartX);
                const deltaY = Math.abs(onTouchEndY - onTouchStartY);

                if (deltaX > 20 || deltaY > 20) {
                    navigation.pop();
                }
            }}
        >
            <Post postId={post._id} navigation={navigation} />
        </View>
    );
}

export default PostScreen;