import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ProfilePicture from '../../../ProfilePicture';
import MyHeader from '../MyHeader';
import Stat from '../Stat';

import styles from './styles';

import postsData from '../../../../data/photos'
import Feed from '../../../Feed';
import Header from '../Header';

import { uploadToS3 } from '../../../../utils/s3Helper';
import { updateProfileImage } from '../../../../api/profile';


const Details = ({ profile, isAuthProfile, navigation, togglePostMenu, toggleSettingsMenu, setIsLoading, updateProfile }) => {

    useEffect(() => {
        // Side-effect logic...
        return () => {
            // Side-effect cleanup
        };
    }, []);

    const [userStats, setUserStats] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        setProfilePicture(profile.profilePicture);

        //dummy profile stats
        const userStats = postsData.find(postData => postData.user.id === "1");
        setUserStats(userStats);
    }, []);

    const showAlert = () => Alert.alert(
        "Update profile picture",
        "How would you like to update your profile picture?",
        [{
            text: "Camera",
            onPress: () => openCamera(),
            style: "default",
        },
        {
            text: "Gallery",
            onPress: () => openGallery(),
            style: "default",
        }]
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
        setIsLoading(true);
        console.log('uploadImage to S3')
        uploadToS3(image).then(data => {
            console.log('Uploading image', data)

            if (data && data.Location) {
                try {
                    const res = updateProfileImage(data.Location);
                    res.then(response => {
                        if (response && response.status === 200) {
                            setProfilePicture(data.Location);
                            updateProfile(data.Location);
                        }
                    })
                } catch (e) {
                    console.warn(e);
                    setIsLoading(false);
                }
            }
        })
        setIsLoading(false);
    }


    if (!userStats) {
        return null
    }

    if (!profile) {
        return null;
    }

    return (
        <View >
            {
                // myheader or their header 
                isAuthProfile ?
                    (<MyHeader username={profile.username} navigation={navigation} togglePostMenu={togglePostMenu} toggleSettingsMenu={toggleSettingsMenu} />) :
                    (<Header profile={profile} navigation={navigation} />)
            }
            <View style={styles.container}>
                {isAuthProfile ?
                    <TouchableOpacity onPress={showAlert}>
                        <ProfilePicture uri={profilePicture} size={90} />
                    </TouchableOpacity>
                    :
                    <View>
                        <ProfilePicture uri={profilePicture} size={90} />
                    </View>
                }
                <View style={styles.stats}>
                    <Stat statName='Posts' statCount='4.9 k' />
                    <Stat statName='Followers' statCount='17 k' />
                    <Stat statName='Following' statCount='1,751' />
                </View>
            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
        </View >
    )
}
export default Details;