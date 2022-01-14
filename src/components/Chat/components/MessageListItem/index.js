import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import CacheImage from '../../../CacheImage';
import PostChatMessage from '../PostChatMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MessageListItem = ({ message, authUser }) => {

    const [isOutgoing, setIsOutgoing] = useState(false);
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
        setDirection();
        if (message.type === 'default') {
            checkImage();
        }
    }, []);

    const setDirection = () => {
        if (message.userId === authUser) {
            setIsOutgoing(true);
        } else {
            setIsOutgoing(false);
        }
    }

    const checkImage = () => {
        if (message.imageUri) {
            setIsImage(true);
        } else {
            setIsImage(false);
        }
    }

    return (
        <View style={[styles.container, isOutgoing ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]}>
            <View style={styles.bubbleContainer}>
                <View style={[styles.msgBubble, (isOutgoing && message.type !== 'post' && message.type !== 'call') ? { backgroundColor: '#2b83ef' } : { backgroundColor: '#eeeff0' }, (!isImage && message.type !== 'post') ? { padding: 10, margin: 5, } : { padding: 3, borderRadius: 7, }]}>
                    <>
                        {
                            /*image or txt*/
                            message.type === 'default' ? (isImage ? <CacheImage showProgress={true} uri={message.imageUri} style={styles.image} /> : <Text style={styles.text, [isOutgoing ? { color: 'white' } : { color: 'black' }]}>{message.content}</Text>) :
                                (
                                    /*call or post*/
                                    message.type === 'call' ?
                                        <View style={styles.callContainer}>
                                            <TouchableOpacity style={styles.callIcon}>
                                                {message.callType === 'audio' ? <Ionicons name='ios-call' size={22} color={'white'} style={styles.icon} /> : <Ionicons name='md-videocam' size={22} color={'white'} style={styles.icon} />}
                                            </TouchableOpacity>
                                            <View>
                                                <Text style={[isOutgoing ? { marginBottom: 2, color: 'black' } : { color: 'black' }]}>{message.callType}</Text>
                                                <Text style={[isOutgoing ? { fontSize: 11, color: 'black' } : { color: 'black' }]}>{message.callDuration}</Text>
                                            </View>
                                        </View> : (<TouchableOpacity>

                                            <PostChatMessage postId={message.postId} />
                                        </TouchableOpacity>

                                        )
                                )
                        }
                    </>
                </View>
            </View>
        </View >
    )
}

export default MessageListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    bubbleContainer: {
        flex: 1,
        maxWidth: '70%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    msgBubble: {
        marginVertical: 5,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowColor: 'grey',
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 10
    },
    icon: {
        margin: 5
    },
    callIcon: {
        // alignSelf: "center",
        backgroundColor: '#787878',
        width: 35,
        height: 35,
        borderRadius: 17.5,
        alignItems: 'center',
        marginRight: 7,
    },
    callContainer: {
        flexDirection: 'row',
    },
    smallText: {
        fontSize: 5,
    },
    largeText: {
        fontSize: 18,
    }
})