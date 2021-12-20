import React from 'react';
import { Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import avatar from '../../assets/images/default-avatar.jpg';


const ProfilePicture = ({ uri, size = 70 }) => {
  const ringSize = size < 50 ? size * 1.08 : size * 1.05;

  return (
    <View style={[{ margin: 5 }]}>
      <LinearGradient
        colors={['#f2a13f', '#ff0f0f', '#ff0f0f']}
        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
        style={{ height: ringSize, width: ringSize, alignItems: 'center', justifyContent: 'center', borderRadius: ringSize / 2 }}>
        {!!uri ? <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2, alignSelf: 'center', borderColor: '#fff', borderWidth: 3 }} /> :
          <Image source={avatar} style={{ width: size, height: size, borderRadius: size / 2, alignSelf: 'center', borderColor: '#fff', borderWidth: 3 }} />}
      </LinearGradient>
    </View>
  )
}

export default ProfilePicture;