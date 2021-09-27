import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    stats: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    profileName: {
        marginVertical: 5,
        marginHorizontal: 15,
        textAlign: 'justify',
        fontWeight: '500'
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 25,
        margin: 5
    }
});

export default styles;