import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';

import ProfilePicture from '../../../ProfilePicture';
import MyHeader from '../MyHeader';
import Stat from '../Stat';

import styles from './styles';

import postsData from '../../../../data/photos'
import Feed from '../../../Feed';
import Header from '../Header';


const Details = ({ profile, isAuthProfile, navigation, togglePostMenu, toggleSettingsMenu }) => {

    useEffect(() => {
        // Side-effect logic...
        return () => {
            // Side-effect cleanup
        };
    }, []);

    const [userStats, setUserStats] = useState(null);

    //dummy profile stats
    useEffect(() => {
        const userStats = postsData.find(postData => postData.user.id === "1");
        setUserStats(userStats);
    }, []);

    if (!userStats) {
        return null
    }

    if (!profile)
        return null;

    return (
        <View >
            {
                // myheader or their header 
                isAuthProfile ?
                    (<MyHeader username={profile.username} navigation={navigation} togglePostMenu={togglePostMenu} toggleSettingsMenu={toggleSettingsMenu} />) :
                    (<Header profile={profile} navigation={navigation} />)
            }
            <View style={styles.container}>
                <View>
                    <ProfilePicture uri={profile.profilePicture} size={100} />
                </View>
                <View style={styles.stats}>
                    <Stat statName='Posts' statCount='4.9 k' />
                    <Stat statName='Followers' statCount='17 k' />
                    <Stat statName='Following' statCount='1,751' />
                </View>
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
        </View >
    )
}
export default Details;