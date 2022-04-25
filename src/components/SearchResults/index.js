import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProfileListItem from '../Profile/components/ProfileListItem'
import ChatContactListItem from '../Chat/components/ChatContactListItem';
import { fetchProfileByName, fetchProfileByUsername } from '../../api/profile';
import { getTagsByNameLike, getTagByName, getLocationsByNameLike } from '../../api/posts'
import TagListItem from '../Post/components/TagListItem';
import LocationListItem from '../Post/components/LocationListItem';

const SearchResults = ({ authUser, searchCriteria, isContactSearch, isResultTabbed }) => {

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'accounts', title: 'Accounts' },
        { key: 'tags', title: 'Tags' },
        { key: 'locations', title: 'Places' },
    ]);

    const [tags, setTags] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [locations, setLocations] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const AccountsRoute = () => (
        <View>
            {
                profiles && profiles.length !== 0 &&
                <View>
                    <FlatList
                        data={profiles}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item, index }) => renderItems(item, index)}
                        numColumns={1}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </View>
            }
        </View>
    );

    const TagsRoute = () => (
        <View>
            {
                tags && tags.length !== 0 &&
                <FlatList
                    data={tags}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item, index }) => <TagListItem tag={item} />}
                    numColumns={1}
                    contentContainerStyle={{ flexGrow: 1 }}
                />}
        </View>);

    const LocationsRoute = () => (
        <View>
            {
                locations && locations.length !== 0 &&
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item, index }) => <LocationListItem location={item} />}
                    numColumns={1}
                    contentContainerStyle={{ flexGrow: 1 }}
                />}
        </View>);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (index === 0)
                fetchProfiles();
            else if (index === 1)
                fetchTags();
            else
                fetchLocations();

            return () => { };
        }, [index, searchCriteria])
    );

    const fetchProfiles = async () => {
        try {
            const searchByName = await fetchProfileByName(searchCriteria);
            const searchByUsername = await fetchProfileByUsername(searchCriteria);
            var results = searchByName.concat(searchByUsername)

            if (isContactSearch) {
                //filter out auth user for chat contact search
                results = results.filter(profile => profile.userId !== authUser);
            }

            setProfiles(results)
        } catch (error) {
            console.log(`SearchScreen: Failed to fetchProfileBy[Name/Username] for id ${userId}`, error);
        }
    }

    const fetchTags = async () => {
        try {
            const response = await getTagsByNameLike(searchCriteria, 1, 12);

            if (response && response.data) {
                setTags(response.data);
            }
        } catch (error) {
            console.log(`SearchScreen: Failed to fetchTags for searchCriteria ${searchCriteria}`, error);
        }
    }

    const fetchLocations = async () => {
        try {
            const response = await getLocationsByNameLike(searchCriteria, 1, 12);

            if (response && response.data) {
                setLocations(response.data);
            }
        } catch (error) {
            console.log(`SearchScreen: Failed to fetchLocations for searchCriteria ${searchCriteria}`, error);
        }
    }

    const renderScene = SceneMap({
        accounts: AccountsRoute,
        tags: TagsRoute,
        locations: LocationsRoute
    });

    const renderTitle = (route, focused, color) => {
        return (
            <Text style={[focused ? { color: 'black', fontSize: 11, fontWeight: '700' } : { color: 'grey', fontSize: 11, }, { paddingHorizontal: 10 }]}>{route.title}</Text>
        )
    }

    const renderItems = (item, index) => {
        if (isContactSearch) {
            return <ChatContactListItem profile={item} authUser={authUser} />
        } else {
            return <ProfileListItem profile={item} />
        }
    }

    return (
        <View style={{ height: '100%' }}>
            {isResultTabbed ?
                (
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
                ) :
                (

                    profiles && profiles.length !== 0 &&
                    <View>
                        <FlatList
                            data={profiles}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item, index }) => renderItems(item, index)}
                            numColumns={1}
                            contentContainerStyle={{ flexGrow: 1 }}
                        />
                    </View>

                )
            }
        </View>
    )

}

export default SearchResults;