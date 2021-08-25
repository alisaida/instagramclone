import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
// import { API, graphqlOperation } from 'aws-amplify';

import { listPosts } from '../../graphql/queries';

const data = [
    {
        id: '1',
        user: {
            imageUri: 'https://lh3.googleusercontent.com/ogw/ADGmqu82o3DzQCvGZbM0BGcyAtZN_krbjffps4bNS2mq=s83-c-mo',
            name: 'Said'
        },
        imageUri: 'https://i.natgeofe.com/n/5b7c32fc-c08c-4a01-989c-be1ce4e853bb/tpc18-outdoor-gallery-499335-11707281_11.jpg',
        likesCount: 1648256,
        caption: 'you only live once #yolo',
        postedAt: '4 hours ago',
        isLiked: true,
        isSaved: true
    },
    {
        id: '2',
        user: {
            imageUri: 'https://lh3.googleusercontent.com/ogw/ADGmqu82o3DzQCvGZbM0BGcyAtZN_krbjffps4bNS2mq=s83-c-mo',
            name: 'Abdilahi'
        },
        imageUri: 'https://i.natgeofe.com/n/5b7c32fc-c08c-4a01-989c-be1ce4e853bb/tpc18-outdoor-gallery-499335-11707281_11.jpg',
        likesCount: 256,
        caption: 'you only live once #yolo',
        postedAt: '4 hours ago',
        isLiked: false,
        isSaved: false
    },
    {
        id: '3',
        user: {
            imageUri: 'https://lh3.googleusercontent.com/ogw/ADGmqu82o3DzQCvGZbM0BGcyAtZN_krbjffps4bNS2mq=s83-c-mo',
            name: 'Vardy'
        },
        imageUri: 'https://i.natgeofe.com/n/5b7c32fc-c08c-4a01-989c-be1ce4e853bb/tpc18-outdoor-gallery-499335-11707281_11.jpg',
        likesCount: 256,
        caption: 'you only live once #yolo',
        postedAt: '4 hours ago',
        isLiked: false,
        isSaved: false
    }
]

import Post from '../Post';
import Stories from "../../components/Stories";

const Feed = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const postData = await API.graphql(graphqlOperation(listPosts));
            setPosts(postData.data.listPosts.items);
            console.log(postData.data.listPosts.items);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <FlatList
            data={posts}
            ListHeaderComponent={<Stories />}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <Post post={item} />}
        />
    );
}

export default Feed;