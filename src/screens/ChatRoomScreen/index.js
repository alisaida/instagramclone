import React, { useState, useEffect, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button, RefreshControl, KeyboardAvoidingView, FlatList, Alert, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute, NavigationAction } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatRoomHeader from '../../components/Chat/components/ChatRoomHeader';
import MessageListItem from '../../components/Chat/components/MessageListItem';
import { retrieveMessagesByChatRoomId, createMessage } from '../../api/chats';

import { uploadToS3 } from '../../utils/s3Helper'

const ChatRoomScreen = () => {

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    const route = useRoute();
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const messageInput = useRef();

    useEffect(() => {
        fetchChatMessages();
    }, []);

    const fetchChatMessages = async () => {
        try {
            const messages = await retrieveMessagesByChatRoomId(route.params.chatRoomId);
            if (messages) {
                setMessages(messages);
            }
        } catch (error) {
            console.log('Fetch User Chat Failed', error)
        }
    };

    const showAlert = () => Alert.alert(
        "Upload",
        "How would you like to upload photo?",
        [{
            text: "Camera",
            onPress: () => openCamera(),
            style: "default",
        },
        {
            text: "Gallery",
            onPress: () => openGallery(),
            style: "default",
        }]
    );

    const openGallery = () => {
        setTimeout(() => {
            ImagePicker.openPicker({
                width: 1000,
                height: 800,
                cropping: true,
                compressImageQuality: 1,
                forceJpg: true
            }).then(image => {
                uploadImage(image);
            }).catch(error => { });
        }, 400)
    };

    const openCamera = () => {
        setTimeout(() => {
            ImagePicker.openCamera({
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 800,
                cropping: true,
                compressImageQuality: 1,
                forceJpg: true
            }).then(image => {
                uploadImage(image);
            }).catch(error => { });
        }, 400)
    };

    const uploadImage = (image) => {
        uploadToS3(image).then(data => {
            console.log('Uploading image', data)

            if (data && data.Location) {
                try {
                    const res = createMessage(route.params.chatRoomId, '', data.Location);
                    res.then(response => {
                        if (response && response.data) {
                            //get response and display last message to list
                            const lastMessage = response.data;
                            // setMessages({ ...messages, lastMessage });
                            messages.push(lastMessage);
                            setNewMessage('');
                        }
                    })
                } catch (e) {
                    console.warn(e);
                    // setIsLoading(false);
                }
            }
        })
        // setIsLoading(false);
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        fetchChatMessages();
        setRefreshing(false);
    }, [refreshing]);

    const sendMessage = async () => {
        try {
            if (newMessage !== '') {
                const response = await createMessage(route.params.chatRoomId, newMessage);
                if (response.status === 201) {
                    //get response and display last message to list
                    const lastMessage = response.data;
                    // setMessages({ ...messages, lastMessage });
                    messages.push(lastMessage);
                    setNewMessage('');
                    messageInput.current.clear();
                }
            }

        } catch (error) {
            console.log('Fetch User Chat Failed', error)
        }
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={5} >
                <View style={styles.container}>
                    <ChatRoomHeader profile={route.params.recipientProfile} authUserId={route.params.authUser} chatRoomId={route.params.chatRoomId} />
                    <FlatList
                        data={messages}
                        keyExtractor={({ _id }) => _id}
                        renderItem={({ item }) => <MessageListItem message={item} authUser={route.params.authUser} />}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                    <View style={styles.bottomContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputIcon}>
                                <TouchableOpacity onPress={showAlert}>
                                    <Ionicons name='ios-camera-outline' size={24} color={'white'} style={{ marginHorizontal: 3, marginVertical: 2, padding: 2 }} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView keyboardDismissMode='on-drag'>
                                <TextInput
                                    clearButtonMode="always"
                                    style={styles.input}
                                    placeholder="Message..."
                                    placeholderTextColor="#9e9e9e"
                                    onChangeText={setNewMessage}
                                    ref={messageInput}
                                />
                            </ScrollView>
                            {
                                newMessage ? <Button title="Send" onPress={() => { sendMessage() }} /> : null
                            }
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatRoomScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginBottom: 5
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginTop: 2
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 10,
        height: 45,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10
    },
    inputIcon: {
        backgroundColor: '#2b83ef',
        borderRadius: 50
    }
})

