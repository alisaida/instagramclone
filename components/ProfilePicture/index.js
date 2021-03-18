import React from 'react';
import { Image, View } from 'react-native'
import styles from "./styles";
const ProfilePicture = ({ uri, size = 70 }) => {
  return (
    <View style={[styles.container, { width: size + 5, height: size + 5 }]}>
      <Image
        source={{ uri }}
        style={[styles.image, { width: size, height: size }]}
      />
    </View>
  )
}

export default ProfilePicture;
