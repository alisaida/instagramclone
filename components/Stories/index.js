import React from 'react';
import { View, FlatList } from 'react-native';

import Story from "../Story";
import styles from './styles'

import storiesData from '../../data/stories'

const Stories = () => {
  return (
    <FlatList
      data={storiesData}
      keyExtractor={({ name }) => name}
      horizontal
      showsHorizontalScrollIndicator='false'
      style={styles.container}
      renderItem={({ item }) => <Story story={item} />}
    />
  );
}

export default Stories;

