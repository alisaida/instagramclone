import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../../ProfilePicture';
import Entypo from 'react-native-vector-icons/Entypo';

import { getPostsByLocationId } from '../../../../api/posts'


const LocationListItem = ({ location }) => {

    const navigation = useNavigation();
    const [count, setCount] = useState(0);

    const navigateToProfileScreen = () => {
        navigation.navigate('Locations', { location: location })
    }

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        fetchCount();
    }, [])

    const fetchCount = async () => {
        try {
            const response = await getPostsByLocationId(location._id, 1, 12);

            if (response) {
                setCount(response.totalDocs);
            }
        } catch (error) {
            console.log(`SearchScreen: Failed to fetchLocations for searchCriteria ${searchCriteria}`, error);
        }
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={navigateToProfileScreen}>
                <View style={styles.iconContainer}>
                    <Entypo name='location-pin' size={30} color={'black'} style={{ marginVertical: 10 }} />
                </View>
                <View style={styles.profileDetails}>
                    <Text style={styles.tagName}>{location.location}</Text>
                    {location.totalPosts === 1 ?
                        < Text style={styles.count}>{count} post</Text> :
                        <Text style={styles.count}>{count} posts</Text>
                    }
                </View>
            </TouchableOpacity >
        </View >
    )
}

export default LocationListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        marginLeft: 15
    },
    iconContainer: {
        borderColor: 'grey',
        borderWidth: .4,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        alignContent: 'center'
    },
    profileDetails: {
        marginLeft: 10
    },
    tagName: {
        fontWeight: '500',
        fontSize: 15
    },
    count: {
        fontSize: 14,
        color: '#8d8f91',
    }
})
