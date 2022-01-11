import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import CacheImage from '../../../CacheImage';

const MessageListItem = ({ message, authUser }) => {

    const [isOutgoing, setIsOutgoing] = useState(false);
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
        setDirection();
        checkImage();
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

    // console.log(message)

    return (
        <View style={[styles.container, isOutgoing ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]}>
            <View style={styles.bubbleContainer}>
                <View style={[styles.msgBubble, isOutgoing ? { backgroundColor: '#2b83ef' } : { backgroundColor: '#eeeff0' }, !isImage ? { padding: 10, margin: 5, } : { padding: 3, borderRadius: 7 }]}>
                    <>

                        {
                            isImage ? <CacheImage showProgress={true} uri={message.imageUri} style={styles.image} />
                                : <Text style={styles.text, [isOutgoing ? { color: 'white' } : { color: 'black' }]}>{message.content}</Text>
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
    }
})