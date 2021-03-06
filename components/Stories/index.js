import React from 'react';
import { View, FlatList } from 'react-native';

import Story from "../Story";
import styles from './styles'

const data = [
  {
    imageUri: 'https://yt3.ggpht.com/yti/ANoDKi585jBh0-kAY3piX6ZiulL6_HbqQESafmkbnNnU-Q=s108-c-k-c0x00ffffff-no-rj',
    name: 'Ali'
  }, {
    imageUri: 'https://lh3.googleusercontent.com/ogw/ADGmqu82o3DzQCvGZbM0BGcyAtZN_krbjffps4bNS2mq=s83-c-mo',
    name: 'Said'
  }, {
    imageUri: 'https://lh3.googleusercontent.com/ogw/ADGmqu9Bvc1v0aPJg5g4V7Qn_CTzaRUSgKLoKvIF5oE=s83-c-mo',
    name: 'Dahir'
  }, {
    imageUri: 'https://yt3.ggpht.com/yti/ANoDKi585jBh0-kAY3piX6ZiulL6_HbqQESafmkbnNnU-Q=s108-c-k-c0x00ffffff-no-rj',
    name: 'si3iid'
  }, {
    imageUri: 'https://lh3.googleusercontent.com/ogw/ADGmqu82o3DzQCvGZbM0BGcyAtZN_krbjffps4bNS2mq=s83-c-mo',
    name: 'Samira'
  }, {
    imageUri: 'https://lh3.googleusercontent.com/ogw/ADGmqu9Bvc1v0aPJg5g4V7Qn_CTzaRUSgKLoKvIF5oE=s83-c-mo',
    name: 'Deeqa'
  }
];

const Stories = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={({ name }) => name}
      horizontal
      showsHorizontalScrollIndicator='false'
      style={styles.container}
      renderItem={({ item }) => <Story imageUri={item.imageUri} name={item.name} />}
    />
  );
}

export default Stories;

