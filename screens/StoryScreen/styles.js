import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginBottom: 20,

    },
    storyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },
    time: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: '300',
        color: 'white'
    },
    bottomContainer: {
        flexDirection: 'row',
        marginHorizontal: 20
    },
    textInputContainer: {
        flex: 1,
        marginRight: 10,

    },
    textInput: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 40,
        height: 45,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 16.5
    },
    dmIcon: {
        alignSelf: 'center'
    },
});

export default styles;