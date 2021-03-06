import React from 'react';
import { Text, View, Image } from 'react-native';
import DotIcon from 'react-native-vector-icons/Entypo'

import ProfilePicture from '../../../ProfilePicture';
import styles from './styles';

const Header = ({ imageUri, name }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftHeader}>
                <ProfilePicture imageUri={imageUri} size={40} />
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.rightHeader} >
                <DotIcon name='dots-three-horizontal' size={18} style={styles.actionIcon} />
            </View>
        </View >
    );
}

export default Header;