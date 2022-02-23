import React, { useState, useEffect, useCallback, useRef, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button, RefreshControl, KeyboardAvoidingView, FlatList, ActionSheetIOS, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute, NavigationAction } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatRoomHeader from '../../components/Chat/components/ChatRoomHeader';
import MessageListItem from '../../components/Chat/components/MessageListItem';
import { retrieveMessagesByChatRoomId, createMessage, createMessageImage } from '../../api/chats';
import { currentAuthProfile } from '../../api/profile';

import { SocketContext } from '../../contexts/SocketContext';

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
    const [scrollToEndReached, setScrollToEndReached] = useState(false);
    const [page, setPage] = useState(1);
    const [newMessage, setNewMessage] = useState('');
    const [authUser, setAuthUser] = useState(null);
    const messageInput = useRef();
    const flatListRef = useRef();
    const { sendTxtMessage } = useContext(SocketContext);

    useEffect(() => {
        fetchChatMessages();
        fetchAuthProfile();
    }, []);

    const fetchAuthProfile = async () => {
        try {
            const profile = await currentAuthProfile();
            if (profile) {
                setAuthUser(profile);
            }

        } catch (error) {
            console.log(`ChatRoomScreen: Failed to fetch currentAuthProfile`, error);
        }
    }
    const fetchChatMessages = async () => {
        try {
            const response = await retrieveMessagesByChatRoomId(route.params.chatRoomId, 1, 13);
            if (response && response.data) {
                const messages = response.data;
                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);
                setMessages(messages);
            }
        } catch (error) {
            console.log('Fetch User Chat Failed', error)
        }
    };

    const loadMoreOlderMessages = async () => {
        try {
            const response = await retrieveMessagesByChatRoomId(route.params.chatRoomId, page, 13);
            if (response && response.data) {
                const newMessages = response.data;
                //filter out messages that already displayed
                const displayedMessages = messages.map(message => {
                    return message._id;
                });

                const filteredMessages = newMessages.filter(message => !displayedMessages.includes(message._id));

                const nextPage = response.page;
                setPage(parseInt(nextPage) + 1);
                if (filteredMessages && filteredMessages.length > 0) {
                    setMessages((oldMessages) => {
                        return oldMessages.concat(filteredMessages);
                    });
                }
            }
        } catch (error) {
            console.log('Fetch User Chat Failed', error)
        }
    };

    const showActionSheet = () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Cancel", "Camera", "Gallery"],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'light'
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    openCamera();
                } else if (buttonIndex === 2) {
                    openGallery();
                }
            }
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
                    const res = createMessageImage(route.params.chatRoomId, data.Location);
                    res.then(response => {
                        if (response && response.data) {
                            const lastMessage = response.data;
                            setMessages([lastMessage, ...messages]);
                            // messages.unshift(lastMessage);
                            setNewMessage('');
                        }
                    })
                } catch (e) {
                    console.warn(e);
                }
            }
        })
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
                if (response && response.status === 201) {
                    const lastMessage = response.data;

                    const messageData = {
                        from: authUser,
                        to: route.params.recipientProfile,
                        chatRoomId: route.params.chatRoomId,
                        message: lastMessage
                    }

                    sendTxtMessage(messageData);
                    setMessages([lastMessage, ...messages]);
                    // messages.unshift(lastMessage);
                    setNewMessage('');
                    messageInput.current.clear();
                }
            }

        } catch (error) {
            console.log(`ChatRoomScreen: Failed to createMessage ${newMessage} from chatRoomId ${route.params.chatRoomId}`, error);
        }
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={5} >
                <View style={styles.container}>
                    <ChatRoomHeader profile={route.params.recipientProfile} authUserId={route.params.authUser} chatRoomId={route.params.chatRoomId} />
                    <FlatList
                        inverted={true}
                        data={messages}
                        ref={flatListRef}
                        keyExtractor={({ _id }) => _id}
                        renderItem={({ item }) => <MessageListItem message={item} authUser={route.params.authUser} />}
                        onEndReached={() => { setScrollToEndReached(true) }}
                        onMomentumScrollEnd={() => {
                            if (scrollToEndReached) {
                                setRefreshing(true)
                                loadMoreOlderMessages();
                                setScrollToEndReached(false);
                                setRefreshing(false)
                            }
                        }}
                    />
                    <View style={styles.bottomContainer}>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputIcon}>
                                <TouchableOpacity onPress={showActionSheet}>
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
        backgroundColor: '#efefef',
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

