import React from 'react';
import { View } from 'react-native'

import Header from './components/Header/index';
import Body from './components/Body/index';
import Footer from './components/Footer/index';

const post = {

}

const Post = ({ post }) => {
    return (
        <View>
            <Header imageUri={post.user.image} name={post.user.name} />
            <Body imageUri={post.image} />
            <Footer name={post.name} caption={post.caption} likesCount={post.likes} postedAt={post.createdAt} isLiked={post.isLiked} isSaved={post.isSaved} />
        </View>
    );
}

export default Post;