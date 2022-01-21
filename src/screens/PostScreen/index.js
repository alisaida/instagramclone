import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import Post from '../../components/Post';
import BottomDrawer from '../../components/BottomDrawer';
import DrawerSearch from '../../components/DrawerSearch';
const PostScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [post, setPost] = useState(null);
    const [visible, setVisible] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useFocusEffect(
        useCallback(() => {
            setPost(route.params.post)

            return () => { };
        }, [])
    );

    const dismissMenu = () => {
        setVisible(false);
        setIsMenu(false);
    }

    const toggleMenu = () => {
        setSelectedPost(post._id);
        setIsMenu(true)
        setVisible(true);
    }

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
            <Post postId={post._id} navigation={navigation} toggleMenu={toggleMenu} />
            {
                visible && <BottomDrawer onDismiss={dismissMenu} minHeight={350} >
                    {
                        isMenu && <DrawerSearch selectedPost={selectedPost} onDismiss={dismissMenu} />
                    }
                </BottomDrawer>
            }
        </View>
    );
}

export default PostScreen;