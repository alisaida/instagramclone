import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    },
    profileName: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontWeight: '700',
        fontSize: 15,
        marginHorizontal: 5
    },
});

export default styles;