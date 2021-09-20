import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import styles from './styles'

const Header = ({ profile, navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <MaterialIcons name='arrow-back-ios' size={25} />
            </TouchableOpacity>
            <View style={styles.profileName}>
                <Text style={styles.name}>{profile.name}</Text>
                <MaterialIcons name='verified' color='#2b82c4' size={16} />
            </View>
            <MCIcons name='dots-horizontal' size={20} />
        </View>
    )
}
export default Header;
