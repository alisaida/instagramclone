import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';

import { fetchProfileByName, fetchProfileByUsername } from '../../api/profile'

import ProfileListItem from '../Profile/components/ProfileListItem'
import ChatContactListItem from '../Chat/components/ChatContactListItem';
import Feed from '../Profile/components/Feed'



const Search = ({ isSearching, setIsSearching, isContactSearch }) => {

    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const searchInput = useRef();

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        setUser();
    }, [auth]);

    const setUser = async () => {
        const userId = await auth.userId;
        if (userId) {
            setAuthUser(userId);
        } else {
            setAuthUser(null);
        }
    }

    const search = async () => {
        setRefreshing(true);
        fetchProfiles();
        setRefreshing(false);
    }

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

    const clearSearch = () => {
        searchInput.current.clear();
        setSearchCriteria('');
        setProfiles([]);
        Keyboard.dismiss();
        setIsSearching(false);
    }

    const onChangeText = (value) => {
        if (value === '') {
            searchInput.current.clear();
            setSearchCriteria('');
            setProfiles([]);
        } else {
            setSearchCriteria(value);
            setIsSearching(true)
        }
    }

    const renderItems = (item, index) => {
        if (isContactSearch) {
            return <ChatContactListItem profile={item} authUser={authUser} />
        } else {
            return <ProfileListItem profile={item} />
        }
    }

    return (
        <SafeAreaView >

            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        clearButtonMode="always"
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#9e9e9e"
                        onChange={(e) => onChangeText(e.nativeEvent.text)}
                        onSubmitEditing={search}
                        ref={searchInput}
                    />
                </View>
                {
                    isSearching && <Button title="Cancel" onPress={() => { clearSearch() }} />
                }
            </View>
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

        </SafeAreaView >
    );
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginTop: 2
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    input: {
        flex: 1,
    }
})