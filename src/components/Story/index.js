import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

import ProfilePicture from "../ProfilePicture";
import styles from "../Story/styles";


const Story = (props) => {

  const {
    story: {
      user: {
        id,
        image,
        username
      }
    }
  } = props;

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Story", { userId: id });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ProfilePicture uri={image} />
      <Text style={styles.name}>{username}</Text>
    </TouchableOpacity>
  )
}

export default Story;
