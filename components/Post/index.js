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
            <Header imageUri={post.user.imageUri} name={post.user.name} />
            <Body imageUri={post.imageUri} />
            <Footer name={post.name} caption={post.caption} likesCount={post.likesCount} postedAt={post.postedAt} isLiked={post.isLiked} isSaved={post.isSaved} />
        </View>
    );
}

export default Post;