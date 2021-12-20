import React from 'react';
import { Text, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { DrawerActions } from '@react-navigation/native';




import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyHeader = ({ username, navigation, togglePostMenu, toggleSettingsMenu }) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileName}>
                <Text style={styles.name}>{username}</Text>
                <MaterialIcons name='verified' color='#2b82c4' size={16} />
            </View>
            <View style={styles.iconsRight}>
                <TouchableOpacity onPress={() => { togglePostMenu() }}>
                    <FontAwesome name='plus-square-o' size={25} style={styles.icon} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}> */}
                <TouchableOpacity onPress={() => { toggleSettingsMenu() }}>
                    <Ionicons name='ios-reorder-three-outline' size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default MyHeader;
