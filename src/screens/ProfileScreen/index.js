import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import SecureStorage from 'react-native-secure-storage';
import Profile from '../../components/Profile'

const ProfileScreen = ({ route, navigation }) => {
    const [authProfile, setAuthProfile] = useState(null);
    const [otherProfile, setOtherProfile] = useState(null);

    useEffect(() => {
        loadAuthProfile();
        if (route.params && route.params.otherProfile)
            setOtherProfile(route.params.otherProfile)
    }, []);

    const loadAuthProfile = async () => {
        const auth = await SecureStorage.getItem('authProfile');
        try {
            setAuthProfile(JSON.parse(auth));
        } catch (e) {
            console.log('failed')
        }
    }

    if (!(authProfile && authProfile.userId)) {
        return null;
    }



    return (
        <SafeAreaView>
            {(otherProfile && authProfile && authProfile.userId !== otherProfile.userId) ?
                (<Profile profile={otherProfile} isAuthProfile={false} navigation={navigation} />) :
                (<Profile profile={authProfile} isAuthProfile={true} navigation={navigation} />)}
        </SafeAreaView>
    );
}

export default ProfileScreen;