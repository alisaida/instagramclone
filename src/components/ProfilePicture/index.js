import React from 'react';
import { Image, View, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import avatar from '../../assets/images/default-avatar.jpg';
import CacheImage from '../CacheImage';

const ProfilePicture = ({ uri, size = 70 }) => {
  const ringSize = size < 50 ? size * 1.08 : size * 1.05;
  const colors = ['#f2a13f', '#ff0f0f', '#ff0f0f'];
  const start = { x: 0.0, y: 1.0 };
  const end = { x: 1.0, y: 1.0 }

  return (
    <View style={[{ margin: 5 }]}>
      <LinearGradient
        colors={colors} start={start} end={end}
        style={[styles.gradient, { height: ringSize, width: ringSize, borderRadius: ringSize / 2 }]}>
        {!uri || uri === '' ? <Image source={avatar} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} /> :
          <CacheImage showProgress={false} uri={uri} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />}
      </LinearGradient>
    </View>
  )
}

export default ProfilePicture;

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 3
  }
});