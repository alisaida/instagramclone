import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DotIcon from 'react-native-vector-icons/Entypo'

import ProfilePicture from '../../../ProfilePicture';
import { getLocationById } from '../../../../api/posts';

const Header = ({ profile, locationId }) => {

    const navigation = useNavigation();
    const [place, setPlace] = useState(null);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        fetchLocation();

        return () => { };
    }, [])

    const gotToStories = () => {
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
                <DotIcon name='dots-three-horizontal' size={18} style={styles.actionIcon} />
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