import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import ProfilePicture from '../../../ProfilePicture';

import Octicons from 'react-native-vector-icons/Octicons';

const TagPerson = ({ profile, addToSelected, removeFromSelected, checkSelected }) => {


    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const isSelected = checkSelected(profile);
        setIsSelected(isSelected);
    }, [checkSelected])

    const handleSelectedItem = async () => {
        if (isSelected) {
            removeFromSelected(profile);
        } else {
            addToSelected(profile);
        }
        setIsSelected(!isSelected);
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={handleSelectedItem}>
                <View style={styles.leftContainer}>
                    <ProfilePicture uri={profile.profilePicture} size={50} />
                    <View style={styles.profileDetails}>
                        <Text style={styles.username}>{profile.username}</Text>
                        <Text style={styles.profileName}>{profile.name}</Text>
                    </View>
                </View>
                <View style={[styles.rightContainer, isSelected ? { backgroundColor: '#2b83ef', borderColor: '#2b83ef' } : { borderColor: 'grey' }]}>
                    {
                        isSelected && <Octicons name='check' size={15} color={'white'} style={{ marginLeft: 3, marginTop: 1.5 }} />}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TagPerson

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        width: 20,
        height: 20,
        borderWidth: 1.5,
        borderRadius: 10,
        alignSelf: 'center',
        marginRight: 10
    },
    profileDetails: {
        marginLeft: 3
    },
    username: {
        fontWeight: '400',
        fontSize: 15
    },
    profileName: {
        fontSize: 13,
        color: '#8d8f91',
    }
})