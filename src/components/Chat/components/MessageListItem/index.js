import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const MessageListItem = ({ message, authUser }) => {

    const [isOutgoing, setIsOutgoing] = useState(false);

    useEffect(() => {
        setDirection();
    }, []);

    const setDirection = () => {
        if (message.userId === authUser) {
            setIsOutgoing(true);
        } else {
            setIsOutgoing(false);
        }
    }

    return (
        <View style={[styles.container, isOutgoing ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]}>
            <View style={styles.bubbleContainer}>
                <View style={[styles.msgBubble, isOutgoing ? { backgroundColor: '#2b83ef' } : { backgroundColor: '#eeeff0' }]}>
                    {
                        message.imageUri && <Image source={{ uri: message.imageUri }} style={styles.image} />
                    }

                    <Text style={styles.text, [isOutgoing ? { color: 'white' } : { color: 'black' }]}>{message.content}</Text>
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
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        shadowColor: 'grey',
    },
    image: {
        height: 250,
        flex: 1,
        width: null
    }
})