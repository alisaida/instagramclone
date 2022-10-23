import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import DotIcon from 'react-native-vector-icons/Entypo'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import ProfilePicture from '../../../ProfilePicture';
import { getLocationById } from '../../../../api/posts';

const Header = ({ profile, locationId }) => {

    const navigation = useNavigation();
    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);
    const [place, setPlace] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);

    const hideMenu = () => setModalVisible(false);
    const showMenu = () => setModalVisible(true);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        setUser();
    }, [auth]);

    useEffect(() => {
        fetchLocation();

        return () => { };
    }, [])

    const setUser = async () => {
        const userId = await auth.userId;
        if (userId && userId === profile.userId) {
            setIsAuthor(true);
        }
    }

    const gotToStories = () => {
        navigation.navigate("Story");
    }

    const deletePost = () => {
        navigation.navigate("Story");
    }

    const navigateToProfileScreen = () => {
        navigation.push('Root', { screen: 'ProfileScreen', params: { otherProfile: profile, isAuthProfile: false } });
    }

    const navigationToLocation = () => {
        navigation.push('Locations', { location: place })
    }

    const fetchLocation = async () => {
        if (!locationId)
            return;
        try {
            const response = await getLocationById(locationId);

            if (response && response.location) {
                setPlace(response);
            }
        } catch (error) {
            console.log(`SearchScreen: Failed to fetchLocations for searchCriteria ${searchCriteria}`, error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftHeader} >

                <TouchableOpacity onPress={gotToStories}>
                    <ProfilePicture uri={profile.profilePicture} size={40} />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={navigateToProfileScreen}>
                        <Text style={styles.name}>{profile.name}</Text>
                    </TouchableOpacity>
                    {place && place.location !== '' && <TouchableOpacity onPress={navigationToLocation}>
                        <Text style={styles.location}>{place.location}</Text>
                    </TouchableOpacity>}
                </View>
            </View>
            <View style={styles.rightHeader} >

                <Menu visible={modalVisible} anchor={<Text onPress={showMenu}>
                    <DotIcon name='dots-three-horizontal' size={18} style={styles.actionIcon} /></Text>} onRequestClose={hideMenu}
                >
                    {
                        isAuthor && <>
                            <MenuItem onPress={() => {
                                deletePost();
                            }}>Edit</MenuItem>
                            <MenuItem onPress={() => {
                                deletePost();
                            }}>Delete</MenuItem></>

                    }
                    <MenuDivider />
                    <MenuItem onPress={() => {
                        deletePost();
                    }}>Hide</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={() => {
                        deletePost();
                    }}>Report</MenuItem>
                </Menu>
            </View>
        </View >
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
    leftHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    rightHeader: {
        marginRight: 15
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
    location: {
        fontSize: 14,
        marginTop: 2,
    },
})