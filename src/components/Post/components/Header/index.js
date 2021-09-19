import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import DotIcon from 'react-native-vector-icons/Entypo'

import ProfilePicture from '../../../ProfilePicture';
import styles from './styles';

const Header = ({ profile }) => {

    const navigation = useNavigation();

    const onPress = () => {
        // navigation.navigate("Story");
        navigation.push('Root', { screen: 'ProfileScreen', params: { otherProfile: profile, isAuthProfile: false } });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftHeader} onPress={onPress}>
                <ProfilePicture uri={profile.imageUri} size={40} />
                <Text style={styles.name}>{profile.name}</Text>
            </TouchableOpacity>
            <View style={styles.rightHeader} >
                <DotIcon name='dots-three-horizontal' size={18} style={styles.actionIcon} />
            </View>
        </View >
    );
}

export default Header;