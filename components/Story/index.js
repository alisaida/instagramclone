import React from 'react';
import { View, Text } from 'react-native'

import ProfilePicture from "../ProfilePicture";
import styles from "../Story/styles";

const Story = ({ imageUri, name }) => {
  return (
    <View>
      <ProfilePicture imageUri={imageUri} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

export default Story;
