import React from 'react';
import { Text, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'


import styles from './styles'

const Header = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons name='arrow-back-ios' size={25} />
            <View style={styles.profileName}>
                <Text style={styles.name}>Said Ali</Text>
                <MaterialIcons name='verified' color='#2b82c4' size={16} />
            </View>
            <MCIcons name='dots-horizontal' size={20} />
        </View>
    )
}
export default Header;
