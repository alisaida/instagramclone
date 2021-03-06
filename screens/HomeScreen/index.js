import React from 'react';
import { Text } from 'react-native';


import Post from '../../components/Post';

const post = {
  user: {
    imageUri: 'https://lh3.googleusercontent.com/ogw/ADGmqu82o3DzQCvGZbM0BGcyAtZN_krbjffps4bNS2mq=s83-c-mo',
    name: 'Said'
  },
  imageUri: 'https://i.natgeofe.com/n/5b7c32fc-c08c-4a01-989c-be1ce4e853bb/tpc18-outdoor-gallery-499335-11707281_11.jpg',
  likesCount: 256,
  caption: 'you only live once #yolo',
  postedAt: '4 hours ago'
}

import Feed from '../../components/Feed'

const HomeScreen = () => {
  return (
    <>
      <Feed />
    </>
  );
}

export default HomeScreen;

