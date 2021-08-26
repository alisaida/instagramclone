import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const index = ({ isLoading }) => {

    if (!isLoading) {
        return <View />
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
