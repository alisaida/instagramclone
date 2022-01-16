import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const MenuItem = ({ title, callback, icon }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={callback}>
                <View style={styles.innerContainer}>
                    {icon}
                    <Text style={styles.menu}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MenuItem

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1,
        marginVertical: 5,

    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 5
    },
    icon: {
        marginHorizontal: 5,
        marginBottom: 2,
    },
    menu: {
        fontSize: 15,
        fontWeight: '400',
        padding: 10
    },
})
