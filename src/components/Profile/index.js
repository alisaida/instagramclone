import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

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

import PostMini from '../PostMini';

import { retrievePostsByUserId } from '../../api/posts';
import { logout } from '../../redux/actions/authActions';

import Loading from '../../components/Loading';

import no_post from '../../assets/images/no-posts.jpg';
import private_account from '../../assets/images/private-account.jpg';

import { fetchProfileById, fetchFollowingsByUserIdAndStatus, fetchFollowersByUserIdAndStatus, fetchFollowingBetweenUsersIds, currentAuthProfile, followUserById, unFollowUserById } from '../../api/profile';
import { createChatRoom, retrieveChatsWithRecipient } from '../../api/chats';

const Profile = ({ userId, isAuthProfile, navigation }) => {

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [isSettings, setIsSettings] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState(null);
    const [postCount, setPostCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingsCount, setFollowingsCount] = useState(0);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [following, setFollowing] = useState(null);
    const [authProfile, setAuthProfile] = useState(null);

    useEffect(() => {
        fetchProfileData();
        fetchUserPostsData();
        fetchFollowings(userId);
        return () => { };
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchFollowings(userId);
            return () => { };
        }, [following])
    );


    const updateProfile = (profilePicture) => {
        const newProfile = { ...profile, profilePicture: profilePicture }
        setProfile(newProfile);
    }

    const fetchProfileData = async () => {
        setIsLoading(true);
        try {
            const profile = await fetchProfileById(userId);
            if (profile) {
                //state too show profile data
                const myProfile = await currentAuthProfile();
                setAuthProfile(myProfile);
                if (isAuthProfile || profile.isPublic) {
                    setIsAuthorized(true);
                }

                const responseFollowing = await fetchFollowingBetweenUsersIds(myProfile.userId, profile.userId);
                setFollowing(responseFollowing);
            }

            setProfile(profile);
        } catch (e) {
            setIsLoading(false);
            console.log(`ProfileScreen: Failed to fetchProfileById: ${userId}`, e)
        }
        setIsLoading(false);
    }

    const fetchFollowings = async (userId) => {
        setIsLoading(true);
        try {
            const followingsResponse = await fetchFollowingsByUserIdAndStatus(userId, 'accepted', 1, 10);
            const followersResponse = await fetchFollowersByUserIdAndStatus(userId, 'accepted', 1, 10);

            if (followingsResponse && followingsResponse.data) {
                const followingsCount = followingsResponse.totalDocs;
                setFollowingsCount(followingsCount)
            }

            if (followersResponse && followersResponse.data) {
                const followersCount = followersResponse.totalDocs;
                setFollowersCount(followersCount)
            }
        } catch (e) {
            setIsLoading(false);
            console.log(`ProfileScreen: Failed to fetchFollowings: ${userId}`, e)
        }
        setIsLoading(false);
    }

    const setUpChat = async () => {
        const chatRoomId = await fetchChatRoomId();
        navigation.push('ChatRoom', { chatRoomId: chatRoomId, authUser: authProfile.userId, recipientProfile: profile })
    }

    const fetchChatRoomId = async () => {
        try {
            const data = await retrieveChatsWithRecipient(profile.userId);
            console.log(data.id)
            if (data && data.id) {
                return data.id;
            } else if (data && data.response) {
                if (data.response.status === 404) {
                    console.log('Chat data not found, creating a new chatroom!');
                    const newChatId = await createNewChatRoom();
                    return newChatId;
                }
            }
        } catch (error) {
            console.log('failed', error);
        }
    }

    const createNewChatRoom = async () => {
        try {
            const data = await createChatRoom(profile.username);

            if (data && data._id) {
                console.log('new chatroom id:', data)
                return data._id;
            }
        } catch (error) {
            console.log(`ChatContactListItem: Failed to createChatRoom for recipient ${profile.username}`, error);
        }
    }

    const fetchUserPostsData = async () => {
        setIsLoading(true);
        try {
            const response = await retrievePostsByUserId(userId);
            if (response && response.data) {
                const postData = response.data;
                const postCount = response.totalDocs;
                if (postData) {
                    setPosts(postData);
                    setPostCount(postCount);
                }
            }
        } catch (e) {
            setIsLoading(false);
            console.log(`ProfileScreen: Failed to retrievePostsByUserId for id ${userId}`, e);
        }
        setIsLoading(false);
    }

    const togglePostMenu = () => {
        // dispatch(logout())
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

    const handleFollow = async () => {
        try {
            const response = await followUserById(userId);
            if (response && response.data && response.status === 201) {
                const follow = response.data;
                setFollowing(follow);
            }

        } catch (error) {
            console.log(error);
            console.log(`FollowsList: Failed to Unfollow`, error);
        }
    }

    const handleUnfollow = async () => {
        try {
            const response = await unFollowUserById(userId);
            if (response && response.data && response.status === 202) {
                const unfollow = response.data;
                setFollowing(null)
            }

        } catch (error) {
            console.log(error);
            console.log(`FollowsList: Failed to Unfollow`, error);
        }
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
        <View>
            <View>
                <Details
                    profile={profile}
                    authProfile={authProfile}
                    isAuthProfile={isAuthProfile}
                    navigation={navigation}
                    togglePostMenu={togglePostMenu}
                    toggleSettingsMenu={toggleSettingsMenu}
                    setIsLoading={setIsLoading}
                    updateProfile={updateProfile}
                    postCount={postCount}
                    followersCount={followersCount}
                    followingsCount={followingsCount}
                    isAuthorized={isAuthorized}
                />
                {isAuthProfile ? <View style={styles.buttonContainer}><TouchableOpacity onPress={() => navigation.push('EditProfile', { authProfile })} style={[styles.contactButtonContainer, { backgroundColor: 'white', borderColor: 'grey', }]}>
                    <Text style={[styles.button, { backgroundColor: 'white', borderColor: 'grey' }]}>Edit Profile</Text>
                </TouchableOpacity></View> : <View style={styles.buttonContainer}>
                    {(!following) ? <TouchableOpacity onPress={() => handleFollow()} style={[styles.contactButtonContainer, { backgroundColor: '#1992fb', borderColor: '#1992fb', }]}>
                        <Text style={[styles.button, { color: 'white', fontWeight: '500' }]}>Follow</Text>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => handleUnfollow()} style={[styles.contactButtonContainer, { backgroundColor: 'white', borderColor: 'grey', }]}>
                            {following && following.status === 'accepted' ? <Text style={[styles.button, { backgroundColor: 'white', borderColor: 'grey' }]}>Following</Text>
                                : <Text style={[styles.button, { backgroundColor: 'white', borderColor: 'grey' }]}>Requested</Text>}
                        </TouchableOpacity>}
                    {following && following.status === 'accepted' && <TouchableOpacity onPress={setUpChat} style={[styles.contactButtonContainer, { backgroundColor: 'white', borderColor: 'grey', }]}>
                        <Text style={[styles.button, { backgroundColor: 'white', borderColor: 'grey' }]}>Message</Text>
                    </TouchableOpacity>}
                </View>}
                <View style={styles.headerButtons}>
                    <Fontisto name='nav-icon-grid' size={20} />
                    <MaterialIcons name='person-pin' size={30} />
                </View>
            </View>
            {!isAuthorized ? <View style={{ backgroundColor: 'white', height: '100%', width: '100%', alignItems: 'center' }}>
                <Image source={private_account} style={{ width: 250, height: 250, alignSelf: 'center', marginVertical: 80 }} />
            </View> :
                (postCount !== 0 ? (<View>
                    <FlatList
                        data={posts}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item }) => <PostMini postId={item} />}
                        numColumns={3}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </View>) :
                    <View style={{ backgroundColor: 'white', height: '100%', width: '100%', alignItems: 'center' }}>
                        <Image source={no_post} style={{ width: 250, height: 250, alignSelf: 'center', marginVertical: 80 }} />
                    </View>)}
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
                                <MenuItem title='Saved' icon={saveIcon} iconSpacing={10} callback={() => {
                                    dismissMenu();
                                    navigation.navigate('Bookmarks', {});
                                }} />
                                <MenuItem title='Logout' icon={logoutIcon} callback={() => { dispatch(logout()) }} />
                            </View>
                        }
                    </>
                </BottomDrawer>
            }
            {isLoading && <ActivityIndicator isLoading={true} />}
        </View>
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
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        alignSelf: 'center',
        paddingVertical: 7.5
    },
    contactButtonContainer: {
        flex: 1,
        borderWidth: 1,
        height: 35,
        borderRadius: 3,
        alignItems: 'center',
        margin: 5
    }
})
