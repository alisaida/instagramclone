import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Stat = ({ statName, statCount, isAuthorized }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.statCount, isAuthorized ? { color: 'black' } : { color: 'grey' }]}>{statCount}</Text>
            <Text style={styles.statName}>{statName}</Text>
        </View >
    )
}

export default Stat;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 10
    },
    statCount: {
        fontSize: 20
    },
    statName: {
        marginVertical: 2
    }
});