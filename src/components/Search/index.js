import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchResults from '../SearchResults';

const Search = ({ isSearching, setIsSearching, isContactSearch, isResultTabbed }) => {

    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('');
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

    const search = async (value) => {
        if (value === '') {
            searchInput.current.clear();
            setUserInput('');
        } else {
            setUserInput(value);
            setIsSearching(true)
            setSearchCriteria(value);
        }
    }

    const clearSearch = () => {
        searchInput.current.clear();
        setUserInput('');
        Keyboard.dismiss();
        setIsSearching(false);
        setSearchCriteria('');
    }

    return (
        <SafeAreaView >
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="magnify" size={22} color="#9e9e9e" style={{ marginHorizontal: 5 }} />
                    </View>
                    <TextInput
                        clearButtonMode="always"
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#9e9e9e"
                        onSubmitEditing={(e) => search(e.nativeEvent.text)}
                        ref={searchInput}
                        backgroundColor={'#efefef'}
                    />
                </View>
                {
                    isSearching && <Button title="Cancel" onPress={() => { clearSearch() }} />
                }
            </View>
            {searchCriteria !== '' && <SearchResults authUser={authUser} searchCriteria={searchCriteria} isContactSearch={isContactSearch} isResultTabbed={isResultTabbed} />
            }

        </SafeAreaView >
    );
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 2
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        // paddingHorizontal: 20,
        height: 35,
        alignItems: 'center',
        backgroundColor: '#efefef',
    },
    input: {
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})