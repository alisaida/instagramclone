import React from 'react';
import { Text, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'



import styles from './styles'

const MyHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileName}>
                <Text style={styles.name}>si3iid</Text>
                <MaterialIcons name='verified' color='#2b82c4' size={16} />
            </View>
            <View style={styles.iconsRight}>
                <FontAwesome name='plus-square-o' size={25} style={styles.icon} />
                <Ionicons name='ios-reorder-three-outline' size={30} />
            </View>
        </View>
    )
}
export default MyHeader;
