import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ChatList from '../../components/Chat/components/ChatList';
import ChatScreenHeader from '../../components/Chat/components/ChatScreenHeader';

const ChatScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ChatScreenHeader />
            <ChatList />
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
