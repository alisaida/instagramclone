import { useNavigation, useRoute, NavigationAction } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, ActivityIndicator, TouchableWithoutFeedback, Dimensions, TextInput, StatusBar } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { listStorys } from '../../graphql/queries';
import styles from './styles';
import ProfilePicture from '../../components/ProfilePicture/index';
import storiesData from '../../data/stories'

const StoryScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const userId = route.params.userId;
    const [activeStoryIndex, setActiveStoryIndex] = useState(null);

    const [stories, setStories] = useState([]);

    const fetchStories = async () => {
        try {
            const userStoriesData = await API.graphql(graphqlOperation(listStorys));
            setStories(userStoriesData.data.listStorys.items);
        } catch (err) {
            console.log('error fetching stories');
        }
    }

    useEffect(() => {
        fetchStories();
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
        if (activeStoryIndex >= stories.length - 1) {
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
    const activeStory = stories[activeStoryIndex];

    if (!activeStory || stories.length === 0) {
        return (
            <SafeAreaView>
                <ActivityIndicator />
            </SafeAreaView >
        )
    }

    const exitStories = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
            />
            <TouchableWithoutFeedback onPress={handleStoryNav} >
                <ImageBackground
                    source={{ uri: activeStory.image }}
                    style={styles.image}
                    imageStyle={{ borderRadius: 10 }}
                >
                    <View style={styles.storyHeader}>
                        <View style={styles.headerLeft}>
                            <ProfilePicture uri={activeStory.user.image} size={40} />
                            <Text style={styles.name}>{activeStory.user.username}</Text>
                            <Text style={styles.time}>{moment(activeStory.createdAt).fromNow()}</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <MCIcons name='dots-horizontal' size={25} color={'white'} />
                            <Feather name='x' size={33} color={'white'} onPress={exitStories} />
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