import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import DotIcon from 'react-native-vector-icons/Entypo'

import ProfilePicture from '../../../ProfilePicture';
import styles from './styles';

const Header = ({ profile }) => {

    const navigation = useNavigation();

    const gotToStories = () => {
        navigation.navigate("Story");
    }

    const navigateToProfileScreen = () => {
        navigation.push('Root', { screen: 'ProfileScreen', params: { otherProfile: profile, isAuthProfile: false } });
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftHeader} >

                <TouchableOpacity onPress={gotToStories}>
                    <ProfilePicture uri={profile.imageUri} size={40} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToProfileScreen}>

                    <Text style={styles.name}>{profile.name}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rightHeader} >
                <DotIcon name='dots-three-horizontal' size={18} style={styles.actionIcon} />
            </View>
        </View >
    );
}

export default Header;