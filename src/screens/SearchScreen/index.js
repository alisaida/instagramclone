import React, { useEffect, useState, useCallback, useRef } from 'react';

import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, KeyboardAvoidingView } from 'react-native';

import { retrievePosts } from '../../api/posts';
import { fetchProfileByName, fetchProfileByUsername } from '../../api/profile';

import Feed from '../../components/Profile/components/Feed';
import ProfileListItem from '../../components/Profile/components/ProfileListItem';

const SearchScreen = () => {

    const [searchCriteria, setSearchCriteria] = useState('');
    const [posts, setPosts] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const searchInput = useRef();

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        fetchPosts();
    }, []);

    const search = async () => {
        fetchProfiles();
    }

    const fetchPosts = async () => {
        try {
            const postData = await retrievePosts();
            if (postData)
                setPosts(postData);
        } catch (error) {
            console.log('failed');
        }
    }

    const fetchProfiles = async () => {
        try {
            var searchByName = await fetchProfileByName(searchCriteria);
            var searchByUsername = await fetchProfileByUsername(searchCriteria);

            setProfiles(searchByName.concat(searchByUsername));
        } catch (error) {
            console.log('failed');
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        fetchPosts();
        setRefreshing(false);
    }, [refreshing])

    const clearSearch = () => {
        searchInput.current.clear();
        setSearchCriteria('');
        setProfiles([])
    }

    const onChangeText = (value) => {
        if (value === '') {
            clearSearch();
        } else {
            setSearchCriteria(value);
        }
    }

    return (
        <SafeAreaView >

            <View style={styles.bottomContainer}>
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
                    searchCriteria !== '' ? <Button title="Cancel" onPress={() => { clearSearch() }} /> : null
                }
            </View>

            <>
                {

                    searchCriteria === '' &&
                    <View>
                        <FlatList
                            data={posts}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item }) => <Feed post={item} />}
                            numColumns={3}
                            contentContainerStyle={{ flexGrow: 1 }}
                        />
                    </View>
                }{
                    profiles && profiles.length !== 0 &&
                    <View>
                        <FlatList
                            data={profiles}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item }) => <ProfileListItem profile={item} />}
                            numColumns={1}
                            contentContainerStyle={{ flexGrow: 1 }}
                        />
                    </View>
                }
            </>
        </SafeAreaView >
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    bottomContainer: {
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