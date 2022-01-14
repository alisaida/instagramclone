import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import ProfilePicture from '../../../ProfilePicture';
import { createChatRoom, retrieveChatsWithRecipient } from '../../../../api/chats';
const DrawerContactListItem = ({ profile, authUser, addToSelected, removeFromSelected, checkSelected }) => {

    const navigation = useNavigation();
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
                    <ProfilePicture uri={profile.ProfilePicture} size={38} />
                    <View style={styles.profileDetails}>
                        <Text style={styles.username}>{profile.username}</Text>
                        <Text style={styles.profileName}>{profile.name}</Text>
                    </View>
                </View>
                <View style={[styles.rightContainer, isSelected ? { backgroundColor: '#2b83ef', borderColor: '#2b83ef' } : { borderColor: 'grey' }]}>
                    {
                        isSelected && <Octicons name='check' size={20} color={'white'} style={{ marginLeft: 3.5, marginTop: 1.5 }} />}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default DrawerContactListItem

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
        width: 25,
        height: 25,
        borderWidth: 1.5,
        borderRadius: 12.5,
        alignSelf: 'center',
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
