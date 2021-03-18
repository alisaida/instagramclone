import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, ActivityIndicator, TouchableWithoutFeedback, Dimensions, TextInput } from 'react-native';
import storiesData from '../../data/stories'
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ProfilePicture from '../../components/ProfilePicture/index';

const StoryScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const userId = route.params.userId;
    const [userStories, setUserStories] = useState(null);
    const [activeStoryIndex, setActiveStoryIndex] = useState(null);

    useEffect(() => {
        const userStories = storiesData.find(storyData => storyData.user.id === userId);
        setUserStories(userStories);
        setActiveStoryIndex(0);
    }, []);

    const navigateToPrevUser = () => {
        navigation.push("Story", { userId: (parseInt(userId) - 1).toString() });
    }

    const navigateToNextUser = () => {
        navigation.push("Story", { userId: (parseInt(userId) + 1).toString() });
    }

    const renderPrevStory = () => {
        if (activeStoryIndex <= 0) {
            navigateToPrevUser();
            return;
        }
        setActiveStoryIndex(activeStoryIndex - 1);
    }

    const renderNextStory = () => {
        if (activeStoryIndex >= userStories.stories.length - 1) {
            navigateToNextUser();
            return;
        }
        setActiveStoryIndex(activeStoryIndex + 1);
    }

    const handleStoryNav = (evt) => {
        const deviceWidth = Dimensions.get('window').width;
        if (evt.nativeEvent.locationX > deviceWidth / 2) {
            renderNextStory();
        } else {
            renderPrevStory();
        }
    }

    if (!userStories || userStories.stories.length === 0) {
        return (
            <SafeAreaView>
                <ActivityIndicator />
            </SafeAreaView >
        )
    }

    const exit = () => {

    }

    const activeStory = userStories.stories[activeStoryIndex];
    console.log(`image: ${userStories.user.imageUri}`);
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={handleStoryNav} >
                <ImageBackground source={{ uri: activeStory.imageUri }} style={styles.image} >
                    <View style={styles.storyHeader}>
                        <View style={styles.headerLeft}>
                            <ProfilePicture uri={userStories.user.imageUri} size={40} />
                            <Text style={styles.name}>{userStories.user.name}</Text>
                            <Text style={styles.time}>{activeStory.postedAt}</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <MCIcons name='dots-horizontal' size={25} color={'white'} />
                            <Feather name='x' size={33} color={'white'} onPress={exit} />
                        </View>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
            <View style={styles.bottomContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Send message"
                        placeholderTextColor='white'
                    />
                </View>
                <Ionicons name='paper-plane-outline' size={30} color={'white'} style={styles.dmIcon} />
            </View>

        </SafeAreaView >
    )
}

export default StoryScreen;