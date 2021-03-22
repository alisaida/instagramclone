import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

import { listStorys } from '../../graphql/queries';

import Story from "../Story";
import styles from './styles'

const Stories = () => {

  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    try {
      const storiesData = await API.graphql(graphqlOperation(listStorys));
      setStories(storiesData.data.listStorys.items);
    } catch (err) {
      console.log('error fetching stories');
    }
  }

  useEffect(() => {
    fetchStories();
  }, [])

  return (
    <FlatList
      data={stories}
      keyExtractor={({ id }) => id}
      horizontal
      showsHorizontalScrollIndicator='false'
      style={styles.container}
      renderItem={({ item }) => <Story story={item} />}
    />
  );
}

export default Stories;

