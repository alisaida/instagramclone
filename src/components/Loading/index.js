import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const index = ({ isLoading }) => {

    if (!isLoading) {
        return <View />
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>

                <ActivityIndicator color={'black'} />
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
    }, background: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
