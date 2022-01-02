import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import moment from 'moment'
import CommentItem from '../PostCommentItem';

import { fetchProfileById } from '../../../../api/profile';

const PostCommentList = ({ postComment, navigation }) => {



    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile()
    }, []);

    const fetchProfile = async () => {
        try {
            const profile = await fetchProfileById(postComment.userId);
            setProfile(profile);
        } catch (error) {
            console.log(error);
            console.log(`PostCommentList: Failed to fetchProfileById for userId ${postComment.userId}`, error);
        }
    }

    if (!profile)
        return null;

    return (
        <CommentItem
            profile={profile}
            name={profile.name}
            imageUri={'place.holder'}
            comment={postComment.comment}
            createdAt={postComment.createdAt}
        />

    )
}

export default PostCommentList
