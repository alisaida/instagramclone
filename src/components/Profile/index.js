import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

import ProfilePicture from '../ProfilePicture';
import Stat from './components/Stat';
import Details from './components/Details'
import BottomDrawer from '../../components/BottomDrawer';
import MenuItem from '../../components/BottomDrawer/components/MenuItem'

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import Feed from './components/Feed';

import { retrievePostsByUserId } from '../../api/posts';
import { logout } from '../../redux/actions/authActions';

import Loading from '../../components/Loading';

import { fetchProfileById } from '../../api/profile'

const Profile = ({ userId, isAuthProfile, navigation }) => {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [isSettings, setIsSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState(null);

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    const numColumns = 3;
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if (userId) {
            fetchProfileData();
            fetchPostData();
        }
    }, []);

    const updateProfile = (profilePicture) => {
        const newProfile = { ...profile, profilePicture: profilePicture }
        setProfile(newProfile);
    }

    const fetchProfileData = async () => {
        setIsLoading(true);
        try {
            const profileData = await fetchProfileById(userId);
            setProfile(profileData);
        } catch (e) {
            setIsLoading(false);
            console.log(`ProfileScreen: Failed to load Profile data for userId ${userId}`, e)
        }
        setIsLoading(false);
    }

    const fetchPostData = async () => {
        setIsLoading(true);
        try {
            const postData = await retrievePostsByUserId(userId);
            setPosts(postData);
        } catch (e) {
            setIsLoading(false);
            console.log(`ProfileScreen: Failed to load Post data for userId ${userId}`, e)
        }
        setIsLoading(false);
    }

    const togglePostMenu = () => {
        setIsMenu(true)
        setVisible(true);
    }

    const toggleSettingsMenu = () => {
        setIsSettings(true);
        setVisible(true);
    }

    const dismissMenu = () => {
        setVisible(false);
        setIsMenu(false)
        setIsSettings(false);
    }

    if (!profile) {
        return null;
    }

    const settingsIcon = <EvilIcons name="gear" size={22} color="#900" />;
    const archiveIcon = <MaterialCommunityIcons name="history" size={22} color="#900" />;
    const qrIcon = <Ionicons name="md-qr-code-outline" size={22} color="#900" />;
    const saveIcon = <Feather name='bookmark' size={22} color="#900" />;
    const logoutIcon = <Ionicons name='log-out-outline' size={22} color="#900" />;

    const postIcon = <MaterialCommunityIcons name="grid" size={22} color="#900" />;
    const reelIcon = <Entypo name="youtube-with-circle" size={22} color="#900" />;
    const storyIcon = <MaterialCommunityIcons name="progress-upload" size={22} color="#900" />;
    const storyHighlightIcon = <Ionicons name='md-heart-circle-outline' size={22} color="#900" />;
    const liveIcon = <Ionicons name='ios-radio' size={22} color="#900" />;

    return (
        <>
            <View>
                <Details profile={profile} isAuthProfile={isAuthProfile} navigation={navigation} togglePostMenu={togglePostMenu} toggleSettingsMenu={toggleSettingsMenu} setIsLoading={setIsLoading} updateProfile={updateProfile} />
                <View style={styles.headerButtons}>
                    <Fontisto name='nav-icon-grid' size={20} />
                    <MaterialIcons name='person-pin' size={30} />
                </View>
            </View>
            <FlatList
                data={posts}
                keyExtractor={({ _id }) => _id}
                renderItem={({ item }) => <Feed post={item} />}
                numColumns={numColumns}
                contentContainerStyle={{ flexGrow: 1 }}
            />
            {
                visible && <BottomDrawer onDismiss={dismissMenu} >
                    <>
                        {
                            isMenu && <View>
                                <View style={styles.itemContainer}>
                                    <Text style={styles.drawerHeader}>Create</Text>
                                </View>
                                <MenuItem title='Post' icon={postIcon} />
                                <MenuItem title='Reel' icon={reelIcon} />
                                <MenuItem title='Story' icon={storyIcon} />
                                <MenuItem title='Story highlight' icon={storyHighlightIcon} />
                                <MenuItem title='Live' icon={liveIcon} />
                            </View>}{
                            isSettings && <View>
                                <MenuItem title='Settings' icon={settingsIcon} />
                                <MenuItem title='Archive' icon={archiveIcon} />
                                <MenuItem title='QR Code' icon={qrIcon} />
                                <MenuItem title='Saved' icon={saveIcon} iconSpacing={10} />
                                <MenuItem title='Logout' icon={logoutIcon} callback={() => { dispatch(logout()) }} />
                            </View>
                        }
                    </>
                </BottomDrawer>
            }
            {isLoading && <Loading isLoading={true} />}
        </>

    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    stats: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    profileName: {
        marginVertical: 5,
        marginHorizontal: 15,
        textAlign: 'justify',
        fontWeight: '500'
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 25,
        margin: 5
    },
    drawerHeader: {
        fontSize: 17,
        fontWeight: '500',
        alignSelf: 'center',
        margin: 10
    },
    itemContainer: {
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1,
        marginVertical: 5,
    }
})
