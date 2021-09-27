import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                < TouchableOpacity style={styles.leftHeader} onPress={() => navigation.pop()}>
                    <MaterialIcons name='arrow-back-ios' size={26} />
                </TouchableOpacity>
                <Text style={styles.profileName}>jimxjack26</Text>
                <Entypo name='chevron-thin-down' size={14} />
            </View>
            <View style={styles.right}>
                <Ionicons name='videocam-outline' size={29} style={{ marginRight: 10 }} />
                <Ionicons name='create-outline' size={26} />
            </View>
        </View>

    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    right: {
        flexDirection: 'row',
        marginRight: 15
    },
    profileName: {
        fontSize: 26,
        fontWeight: '700',
        marginRight: 4
    }
})
