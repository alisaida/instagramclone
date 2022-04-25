import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TagPerson from '../../components/Chat/components/TagPerson';
import { fetchProfileByName, fetchProfileByUsername } from '../../api/profile';

const ContactScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const [profiles, setProfiles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [userInput, setUserInput] = useState('');
    const searchInput = useRef();
    const [image, setImage] = useState({});
    const [selectedProfiles, setSelectedProfiles] = useState([]);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        const image = route.params.image;
        setImage(image);

        const selectedProfiles = route.params.taggedProfiles;
        setSelectedProfiles(selectedProfiles)
    }, []);

    const addToSelected = (item) => {
        const newSelectedContacts = [...selectedProfiles, item];
        setSelectedProfiles(newSelectedContacts);
    }

    const removeFromSelected = (item) => {
        const filteredSelect = selectedProfiles.filter(contact => contact._id !== item._id);
        setSelectedProfiles(filteredSelect)
    }

    const checkSelected = (item) => {
        return (selectedProfiles.some(contact => contact._id === item._id));
    }

    const fetchProfiles = async (searchCriteria) => {
        try {
            const searchByName = await fetchProfileByName(searchCriteria);
            const searchByUsername = await fetchProfileByUsername(searchCriteria);
            var results = searchByName.concat(searchByUsername)

            setProfiles(results)
        } catch (error) {
            console.log(`ContactScreen: Failed to fetchProfileBy[Name/Username]`, error);
        }
    }

    const search = async (value) => {
        if (value === '') {
            searchInput.current.clear();
            setUserInput('');
        } else {
            fetchProfiles(value);
        }
    }

    const saveContacts = () => {
        navigation.navigate('CreatePost', { taggedProfiles: selectedProfiles, image: image });
    }

    const renderItems = (item, index) => {
        return (
            <TouchableOpacity style={styles.selectedProfiles} onPress={() => removeFromSelected(item)}>
                <Text style={{ color: 'white', fontSize: 15 }}>{item.username}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView>
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
                <Button title="Done" onPress={() => { saveContacts() }} />
            </View>
            <View style={{ margin: 2 }}>
                {
                    selectedProfiles && selectedProfiles.length !== 0 &&
                    <>
                        <FlatList
                            data={selectedProfiles}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item, index }) => renderItems(item, index)}
                            numColumns={5}
                            contentContainerStyle={{ flexGrow: 1 }}
                        />
                    </>
                }
            </View>
            {
                profiles && profiles.length !== 0 &&
                <View>
                    <FlatList
                        data={profiles}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item, index }) => <TagPerson profile={item} addToSelected={addToSelected} removeFromSelected={removeFromSelected} checkSelected={checkSelected} />}
                        numColumns={1}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </View>

            }
        </SafeAreaView>
    )
}

export default ContactScreen

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
    },
    selectedProfiles: {
        marginRight: 3,
        marginVertical: 3,
        backgroundColor: '#2b83ef',
        paddingHorizontal: 2,
        borderRadius: 1
    },
})