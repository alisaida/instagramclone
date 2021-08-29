import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
// import { API, graphqlOperation } from 'aws-amplify';

import { listPosts } from '../../graphql/queries';

import { retrievePosts } from '../../api/posts';

import Post from '../Post';
import Stories from "../../components/Stories";

const Feed = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const postData = await retrievePosts();
        setPosts(postData);
    }

    return (
        <FlatList
            data={posts}
            ListHeaderComponent={<Stories />}
            keyExtractor={({ _id }) => _id}
            renderItem={({ item }) => <Post post={item} />}
        />
    );
}

export default Feed;