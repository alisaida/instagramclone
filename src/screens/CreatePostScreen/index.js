import React, { useRef, useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Button, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Modal from "react-native-modal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { uploadToS3 } from '../../utils/s3Helper';
import { createPost } from '../../api/posts';
import * as Progress from 'react-native-progress';

const CreatePostScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [caption, setCaption] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageInput = useRef();
    const [location, setLocation] = useState('');
    const [taggedProfiles, setTaggedProfiles] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const location = route.params.location;
            if (location)
                setLocation(location);

            const taggedProfiles = route.params.taggedProfiles;
            if (taggedProfiles)
                setTaggedProfiles(taggedProfiles);

            return () => { };
        }, [route.params?.location, route.params?.taggedProfiles])
    );

    const uploadImage = () => {
        setIsLoading(true);

        const people = taggedProfiles.map(profile => {
            return profile.userId
        })

        uploadToS3(route.params.image).then(data => {
            // console.log('Uploading image', data)

            if (data && data.Location) {
                try {
                    const res = createPost(data.Location, caption, location, people);
                    res.then(response => {
                        console.log('uploaded image', response.status);
                        if (response) {
                            navigation.pop(); //close screen after successful create
                        }
                    })
                } catch (e) {
                    console.warn(e);
                }
            }

        })
    }

    const navigateToSearchLocation = () => {
        navigation.navigate('PostLocationScreen', { image: route.params.image });
    }

    const navigateToSearchContact = () => {
        navigation.navigate('ContactScreen', { image: route.params.image, taggedProfiles: taggedProfiles });
    }

    const taggedPeople = () => {
        if (taggedProfiles.length === 0)
            return "";
        else return taggedProfiles.length === 1 ? taggedProfiles[0].username : taggedProfiles.length + ' people';
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={5} >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <MaterialIcons name='arrow-back-ios' size={24} />
                        </TouchableOpacity>
                        <Text style={[{ fontSize: 17, fontWeight: '600', marginLeft: 20 }]}>New post</Text>
                        <Button title="Share" onPress={() => { uploadImage() }} />
                    </View>
                    <View style={styles.border} />
                    <View style={styles.content}>
                        <ImageBackground source={{ uri: `${route.params.image.path}` }} style={styles.image} >
                            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                {isLoading && <Progress.Circle indeterminate={true} size={50} />}
                            </View>
                        </ImageBackground>
                        <ScrollView keyboardDismissMode='on-drag'>
                            <TextInput
                                clearButtonMode="always"
                                style={styles.input}
                                placeholder="Write a caption..."
                                placeholderTextColor="#9e9e9e"
                                onChangeText={setCaption}
                                ref={messageInput}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.border} />

                <TouchableOpacity style={styles.rowContainer}
                    onPress={() => navigateToSearchContact()}>
                    <Text style={styles.rowTextFont}>Tag People</Text>
                    <View style={styles.rightContainer}>
                        <Text style={styles.rightContainerFont}>{taggedPeople()}</Text>
                        <MaterialIcons name='arrow-forward-ios' size={15} color={'grey'} />
                    </View>
                </TouchableOpacity>
                <View style={styles.border} />
                {location ?
                    <View style={styles.rowContainer}>
                        <Text style={styles.rowTextFont}>{location}</Text>
                        <TouchableOpacity onPress={() => setLocation(null)}>
                            <AntDesign name='close' size={15} color={'grey'} />
                        </TouchableOpacity>
                    </View> :
                    <TouchableOpacity style={styles.rowContainer} onPress={() => navigateToSearchLocation()}>
                        <Text style={styles.rowTextFont}>Add Location</Text>
                        <MaterialIcons name='arrow-forward-ios' size={15} color={'grey'} />
                    </TouchableOpacity>
                }
                <View style={styles.border} />
            </SafeAreaView >
        </>
    )
}

export default CreatePostScreen

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 10
    },
    border: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: .3,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        height: 150,
        width: 115,
        marginHorizontal: 15
    },
    input: {
        flex: 1,
        paddingHorizontal: 10
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        marginHorizontal: 15
    },
    rowTextFont: {
        fontWeight: '400', fontSize: 15.5
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightContainerFont: {
        fontSize: 14,
    }
});
