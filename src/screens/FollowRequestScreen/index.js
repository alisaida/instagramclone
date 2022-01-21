import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { fetchFollowersByUserIdAndStatus, currentAuthProfile } from '../../api/profile';
import FollowListItem from '../../components/FollowListItem';

const FollowRequestScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [followers, setFollowers] = useState([]);
    const [authProfile, setAuthProfile] = useState(null);

    useEffect(() => {
        fetchFollowers();
        return () => {
            setFollowers([]);
        };
    }, []);

    const removeItemFromList = (follow) => {
        console.log('accepted and removing')
        const filteredData = followers.filter(item => item._id !== follow._id);
        setFollowers(filteredData);
    }

    const fetchFollowers = async () => {
        try {
            const profile = await currentAuthProfile();
            if (profile) {
                const response = await fetchFollowersByUserIdAndStatus(profile.userId, 'pending', 1, 10);
                if (response && response.data) {
                    const followers = response.data;
                    setFollowers(followers);
                    setAuthProfile(profile);
                }
            }
        } catch (e) {
            console.log(`Followers Component: Failed to fetchFollowersByUserIdAndStatus for profileId current user`, e);
        }

    }

    if (!followers)
        return null;

    if (!authProfile)
        return null

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <FlatList
                    data={followers}
                    extraData={followers}
                    keyExtractor={({ _id }) => _id}
                    renderItem={({ item }) => <FollowListItem follow={item} authProfile={authProfile} removeItemFromList={removeItemFromList} />}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>
        </SafeAreaView >
    )
}

export default FollowRequestScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
