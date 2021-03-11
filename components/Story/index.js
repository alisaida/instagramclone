import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

import ProfilePicture from "../ProfilePicture";
import styles from "../Story/styles";


const Story = ({ imageUri, name }) => {

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Story");
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ProfilePicture imageUri={imageUri} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Story;
