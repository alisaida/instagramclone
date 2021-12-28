import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import SecureStorage from 'react-native-secure-storage';
import Profile from '../../components/Profile';
import { fetchProfileById } from '../../api/profile';
const ProfileScreen = ({ route, navigation }) => {
    const [authProfile, setAuthProfile] = useState(null);
    const [otherProfile, setOtherProfile] = useState(null);

    useEffect(() => {
        loadAuthProfile();
        if (route.params && route.params.otherProfile)
            setOtherProfile(route.params.otherProfile)
    }, []);

    const loadAuthProfile = async () => {

        const userId = await SecureStorage.getItem('userId').catch(() => null);
        try {
            const authProfile = await fetchProfileById(userId);
            setAuthProfile(authProfile);
        } catch (e) {
            console.log(`ProfileScreen: Failed to load authProfile for userId ${auth.userId}`, e)
        }
    }

    if (!(authProfile && authProfile.userId)) {
        return null;
    }

    return (
        <SafeAreaView>
            {(otherProfile && authProfile && authProfile.userId !== otherProfile.userId) ?
                (<Profile userId={otherProfile.userId} isAuthProfile={false} navigation={navigation} />) :
                (<Profile userId={authProfile.userId} isAuthProfile={true} navigation={navigation} />)}
        </SafeAreaView>
    );
}

export default ProfileScreen;