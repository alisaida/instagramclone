import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerContactListItem from '../../components/Chat/components/DrawerContactListItem';
import Loading from '../Loading';
import { fetchProfileByName, fetchProfileByUsername } from '../../api/profile';
import { retrieveChatsWithRecipient, createChatRoom } from '../../api/chats/';
import { createMessagePost } from '../../api/chats';

const DrawerSearch = ({ selectedPost, onDismiss }) => {

    const { auth } = useSelector((state) => state);
    const [authUser, setAuthUser] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [message, setMessage] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInput = useRef();
    const messageInput = useRef();

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

            //filter out auth user for chat contact search
            results = results.filter(profile => profile.userId !== authUser);

            setProfiles(results)
        } catch (error) {
            console.log(`SearchScreen: Failed to fetchProfileBy[Name/Username] for id ${userId}`, error);
        }
    }

    const addToSelected = (item) => {
        const newSelectedContacts = [...selectedContacts, item];
        setSelectedContacts(newSelectedContacts);
    }

    const removeFromSelected = (item) => {
        const filteredSelect = selectedContacts.filter(contact => contact._id !== item._id);
        setSelectedContacts(filteredSelect)
    }

    const checkSelected = (item) => {
        return (selectedContacts.some(contact => contact._id === item._id));
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
            setIsSearching(true);
        }
    }

    const handleSendMessage = async () => {
        setIsLoading(true);
        selectedContacts.forEach(contact => {
            sendMessage(contact, selectedPost, message);
        });
        setIsLoading(false);
        onDismiss();
    }

    const sendMessage = async (profile, postId, message) => {
        const chatRoomId = await fetchChatRoomId(profile);
        if (!!chatRoomId) {
            await createMessage(chatRoomId, postId, message);
        }
    }

    const fetchChatRoomId = async (profile) => {
        try {
            const data = await retrieveChatsWithRecipient(profile.userId);
            if (data && data.id) {
                return data.id;
            } else if (data && data.response) {
                if (data.response.status === 404) {
                    console.log('Chat data not found, creating a new chatroom!');
                    const newChatId = await createNewChatRoom(profile);
                    return newChatId;
                }
            }
        } catch (error) {
            console.log(`DrawerSearch: Failed to retrieveChatsWithRecipient profile ${profile.username}`, error);
        }
    }

    const createNewChatRoom = async (profile) => {
        try {
            const data = await createChatRoom(profile.username);

            if (data && data._id) {
                console.log('new chatroom id:', data)
                return data._id;
            }
        } catch (error) {
            console.log(`ChatContactListItem: Failed to createChatRoom for recipient ${profile.username}`, error);
        }
    }

    const createMessage = async (chatRoomId, postId, message) => {
        try {
            const response = await createMessagePost(chatRoomId, postId, message);
            if (response && response.status === 201) {
                console.log('Success');
            }
        } catch (error) {
            console.log(`Feed: Failed to createMessage ${message} for chatRoomId ${chatRoomId}`, error);
        }
    }

    const renderItems = (item, index) => {
        return (
            <TouchableOpacity style={styles.selectedContacts} onPress={() => removeFromSelected(item)}>
                <Text style={{ color: 'white', fontSize: 15 }}>{item.username}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.searchInputContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="magnify" size={22} color="#9e9e9e" style={{ marginHorizontal: 5 }} />
                    </View>
                    <TextInput
                        clearButtonMode="always"
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#9e9e9e"
                        onChange={(e) => onChangeText(e.nativeEvent.text)}
                        onSubmitEditing={search}
                        backgroundColor={'#efefef'}
                        ref={searchInput}
                    />
                    <MaterialIcons name="group-add" size={22} color="#9e9e9e" style={{ transform: [{ rotateY: '180deg' }], marginHorizontal: 10 }} />
                </View>
                {
                    isSearching && <Button title="Cancel" onPress={() => { clearSearch() }} />
                }
            </View>
            <>
                <View style={{ margin: 2 }}>
                    {
                        selectedContacts && selectedContacts.length !== 0 &&
                        <>
                            <Text style={{ fontWeight: '500', fontSize: 15 }}>To:</Text>
                            <FlatList
                                data={selectedContacts}
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
                    <FlatList
                        data={profiles}
                        keyExtractor={(item) => item._id.toString()}
                        renderItem={({ item }) => <DrawerContactListItem profile={item} authUser={authUser} addToSelected={addToSelected} removeFromSelected={removeFromSelected} checkSelected={checkSelected} />}
                        numColumns={1}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 15 }}
                    />
                }
                <View>
                    {
                        ((profiles && profiles.length !== 0 || selectedContacts && selectedContacts.length !== 0) &&
                            selectedContacts && selectedContacts.length !== 0) && <>
                            <View style={styles.bottomContainer}>
                                <View style={styles.messageInputContainer}>
                                    <TextInput
                                        clearButtonMode="always"
                                        style={styles.input}
                                        placeholder="Write a message..."
                                        placeholderTextColor="#9e9e9e"
                                        onChangeText={setMessage}
                                        backgroundColor={'white'}
                                        ref={messageInput}
                                    />
                                </View>

                                <TouchableOpacity onPress={handleSendMessage} style={(selectedContacts && selectedContacts.length !== 0) ? [styles.sendButtonContainer, { backgroundColor: '#4091fa', }] : [styles.sendButtonContainer, { backgroundColor: '#9bdefd', }]}>
                                    <Text style={styles.sendButton}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </View>
            </>
            {isLoading && <Loading isLoading={true} />}
        </View >
    )
}

export default DrawerSearch;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginTop: 2
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        height: 35,
        alignItems: 'center',
        backgroundColor: '#efefef',
    },
    messageInputContainer: {
        width: '100%',
        height: 45,
        borderColor: '#efefef',
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sendButtonContainer: {
        width: '100%',
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10
    },
    sendButton: {
        color: 'white',
        fontSize: 16.5,
        fontWeight: '600',
        marginVertical: 10
    },
    selectedContacts: {
        marginRight: 3,
        marginVertical: 3,
        backgroundColor: '#2b83ef',
        paddingHorizontal: 2,
        borderRadius: 1
    },
    bottomContainer: {
        marginBottom: 25
    }
})
