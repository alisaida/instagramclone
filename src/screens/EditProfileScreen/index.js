import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, ScrollView, Button, useWindowDimensions, Input, Switch, ActionSheetIOS, ImageBackground, Image } from 'react-native'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';

import { uploadToS3 } from '../../utils/s3Helper';
import { updateProfile, currentAuthProfile } from '../../api/profile';
import FollowListItem from '../../components/FollowListItem';
import ProfilePicture from '../../components/ProfilePicture';

const EditProfileScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const nameInput = useRef();
    const bioInput = useRef();
    const usernameInput = useRef();
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
        return () => {
            setProfile(null);
        };
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await currentAuthProfile();
            if (response) {
                setName(response.name);
                setUsername(response.username);
                setBio(!!response.bio ? response.bio : '');
                setIsPrivate(!response.isPrivate);
                setProfilePicture(!!response.profilePicture ? response.profilePicture : '');
                setProfile(response);
            }
        } catch (e) {
            console.log(`Edit Profile Screen: Failed to fetchProfile for profileId current user`, e);
        }
    }

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
                setIsLoading(true);
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
                setIsLoading(true);
                uploadImage(image);
            }).catch(error => { });
        }, 400)
    };

    const uploadImage = (image) => {
        uploadToS3(image).then(data => {
            if (data && data.Location) {
                setProfilePicture(data.Location);
                setIsLoading(false);
            }
        })
    }

    //rabitmq???
    const saveProfile = async () => {
        if (!username || username === '') {
            setErrorMessage('Username field is mandatory');
        } else if (!name || name === '') {
            setErrorMessage('Name field is mandatory');
        } else {
            setErrorMessage('');
            setIsLoading(true);
            try {
                const response = await updateProfile(username, name, profilePicture, bio, !isPrivate);
                if (response && response.data && response.status === 200) {
                    console.log('Profile successfully updated')
                    navigation.pop();
                }
            } catch (e) {
                setIsLoading(false);
                console.log(`EditProfile Screen: Failed to update profile: ${profile.userId}`, e)
            }
            setIsLoading(false);
        }
    }

    if (!profile)
        return null;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Button title='Cancel' onPress={() => navigation.pop()} />
                    <Text style={styles.headerText}>Edit Profile</Text>
                    <Button title='Done' onPress={() => saveProfile()} />
                </View>
                <View style={styles.profilePic}>
                    <View style={{ alignItems: 'center' }}>
                        <ImageBackground source={profilePicture ? { uri: profilePicture } : null} key={profilePicture} style={styles.image} >
                            {isLoading && <Progress.Circle indeterminate={true} size={50} style={{ margin: 50 }} />}
                        </ImageBackground>
                    </View>
                    <Button title='Change profile photo' onPress={() => showActionSheet()} />
                    <View style={{ height: 15 }}>

                        {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                    </View>
                </View>
                <View style={styles.details}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder={'Name'}
                            placeholderTextColor="#9e9e9e"
                            onChangeText={setName}
                            backgroundColor={'white'}
                            ref={nameInput}
                            value={name}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder={'Username'}
                            placeholderTextColor="#9e9e9e"
                            onChangeText={setUsername}
                            backgroundColor={'white'}
                            ref={usernameInput}
                            value={username}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Bio</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder={'Bio'}
                            placeholderTextColor="#9e9e9e"
                            onChangeText={setBio}
                            backgroundColor={'white'}
                            ref={bioInput}
                            value={bio}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Private account</Text>
                        <Switch
                            style={styles.switch}
                            value={isPrivate}
                            onValueChange={() => setIsPrivate(previousState => !previousState)}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 17,
        fontWeight: '500'
    },
    profilePic: {
        paddingVertical: 15,
        alignItems: 'center',
        borderTopColor: '#dbdbdb',
        borderBottomColor: '#f0f0f0',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    errorMessage: {
        color: 'red'
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 75,
        overflow: 'hidden',
        margin: 10
    },
    profilePicButton: {
        fontSize: 8
    },
    details: {
        marginHorizontal: 15
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {

    },
    textField: {
        paddingVertical: 15,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        textAlign: 'left',
        width: 220,
    },
    switch: {
        paddingVertical: 15,
        marginVertical: 15
    }
})
