import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ChatList from '../../components/Chat/components/ChatList';
import ChatScreenHeader from '../../components/Chat/components/ChatScreenHeader';
import Search from '../../components/Search';
const ChatScreen = () => {

    const [showSearch, setShowSearch] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const createNewChat = () => {
        setIsSearching(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                isSearching ? <Search isSearching={isSearching} setIsSearching={setIsSearching} isContactSearch={true} /> : <>
                    <ChatScreenHeader createNewChat={createNewChat} />
                    <ChatList />
                </>
            }

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
