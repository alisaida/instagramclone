import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import CacheImage from '../../../CacheImage';
import ProfilePicture from '../../../ProfilePicture'
import { fetchProfileById } from '../../../../api/profile';
import { retrievePostById } from '../../../../api/posts';

const index = ({ postId }) => {

    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [post, setPost] = useState(null);


    useEffect(() => {
        fetchPostData();

        return () => { };
    }, [])

    const fetchPostData = async () => {
        try {
            const response = await retrievePostById(postId);
            if (response && response.data) {
                const post = response.data;
                const profile = await fetchProfileById(post.userId);
                if (profile) {
                    setPost(post);
                    setProfile(profile);
                }
            }
        } catch (e) {
            console.log(`Post: Failed to fetchProfileById for id ${postId}`, e);
        }
    }

    if (!post || !profile) {
        return null
    }

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('PostScreen', { post: post, profile: profile, screenName: 'Posts' })}>
            <View>
                <View style={styles.header}>
                    <View style={styles.profileContainer}>
                        <ProfilePicture uri={profile.profilePicture} size={30} />
                        <Text style={styles.profileName}>{profile.name}</Text>
                    </View>
                    <AntDesign name='right' size={18} style={{ marginHorizontal: 5 }} />
                </View>
                <CacheImage showProgress={true} uri={post.imageUri} style={styles.image} />
                < View style={styles.postDetails}>
                    <Text style={styles.postUser} >{profile.name}</Text>
                    {post && !!post.caption && <Text style={styles.caption} >{post.caption}</Text>}
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default index

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileContainer: {
        flexDirection: 'row',
    },
    profileName: {
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center'
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 5
    },
    caption: {
        marginVertical: 2,
    },
    postUser: {
        fontWeight: 'bold',
        marginHorizontal: 3,
        marginVertical: 2,
    },
    postDetails: {
        flexDirection: 'row',

    },
})
