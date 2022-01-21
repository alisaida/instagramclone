import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import { fetchFollowersByUserIdAndStatus, fetchFollowingsByUserIdAndStatus, fetchPendingFollowersByUserId } from '../../api/profile';
import FollowListItem from '../../components/FollowListItem';

const FollowScreen = () => {

    useEffect(() => {
        fetchFollowings();
        return () => {
            setFollowings([]);
        };
    }, []);

    useEffect(() => {
        fetchFollowers();
        return () => {
            setFollowers([]);
        };
    }, []);


    const FollowersRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <FlatList
                data={followers}
                extraData={followers}
                keyExtractor={({ _id }) => _id}
                renderItem={({ item }) => <FollowListItem follow={item} authProfile={route.params.authProfile} removeItemFromList={removeItemFromList} routeName={'follower'} />}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    );

    const FollowingRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <FlatList
                data={followings}
                extraData={followings}
                keyExtractor={({ _id }) => _id}
                renderItem={({ item }) => <FollowListItem follow={item} authProfile={route.params.authProfile} removeItemFromList={removeItemFromList} routeName={'following'} />}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </View>
    );

    const renderScene = SceneMap({
        followers: FollowersRoute,
        Following: FollowingRoute,
    });

    const layout = useWindowDimensions();

    const route = useRoute();
    const navigation = useNavigation();
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const [index, setIndex] = useState(route.params.index);
    const [routes] = useState([{ key: 'followers', title: 'Followers', count: route.params.followersCount }, { key: 'Following', title: 'Following', count: route.params.followingsCount },]);

    const renderTitle = (route, focused, color) => {
        return (
            <Text style={[focused ? { color: 'black', fontSize: 11, fontWeight: '700' } : { color: 'grey', fontSize: 11, }, { paddingHorizontal: 10 }]}>{route.count ? route.count + ' ' + route.title : 0 + ' ' + route.title}</Text>
        )
    }

    const removeItemFromList = (follow, listName) => {
        if (listName === 'follower') {
            console.log('removing from the follower list')
            const filteredData = followers.filter(item => item._id !== follow._id);
            setFollowers(filteredData);
        } else if (listName === 'following') {
            console.log('removing from the following list')
            const filteredData = followings.filter(item => item._id !== follow._id);
            setFollowings(filteredData);
        }
    }

    const fetchFollowers = async () => {
        try {
            const resFollowers = await fetchFollowersByUserIdAndStatus(route.params.profile.userId, 'accepted', 1, 10);

            if (resFollowers && resFollowers.data) {
                const followers = resFollowers.data;
                setFollowers(followers);
            }
        } catch (e) {
            console.log(`Followers Component: Failed to fetchFollowersByUserIdAndStatus for profileId ${route.params.profile._id}`, e);
        }
    }

    const fetchFollowings = async () => {
        try {
            const resFollowings = await fetchFollowingsByUserIdAndStatus(route.params.profile.userId, 'accepted', 1, 10);

            if (resFollowings && resFollowings.data) {
                const followings = resFollowings.data;
                setFollowings(followings);
            }
        } catch (e) {
            console.log(`Followings Component: Failed to fetchFollowingsByUserIdAndStatus for profileId ${route.params.profile._id}`, e);
        }
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}

            renderTabBar={
                props =>
                    <TabBar {...props}
                        style={{ shadowColor: 'transparent' }}
                        tabStyle={{ backgroundColor: 'white', minHeight: 20, minWidth: '50%' }}
                        renderLabel={({ route, focused, color }) => (
                            renderTitle(route, focused, color)
                        )}
                    />
            }
        />
    );
}

export default FollowScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})