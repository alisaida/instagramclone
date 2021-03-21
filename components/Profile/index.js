import React from 'react';
import { Text, View } from 'react-native';


import ProfilePicture from '../ProfilePicture';
import MyHeader from './components/MyHeader';
import Stat from './components/Stat';
import GridFeed from './components/GridFeed';
import styles from './styles';

const Profile = () => {
    return (
        <View >
            {/* myheader or header */}
            <MyHeader />
            <View style={styles.container}>
                <View>
                    <ProfilePicture uri='https://drive.google.com/thumbnail?id=1R4YSF9fyvyvw6IkaxnaDSZttMGMRTqbt' size={100} />
                </View>
                <View style={styles.stats}>
                    <Stat statName='Posts' statCount='40.9 k' />
                    <Stat statName='Followers' statCount='8.7 M' />
                    <Stat statName='Following' statCount='1,751' />
                </View>
            </View>
            <Text style={styles.profileName}>Said Ali</Text>
            <GridFeed />

        </View >
    )
}
export default Profile;