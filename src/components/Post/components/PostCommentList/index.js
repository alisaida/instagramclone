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
        }
    }

    if (!profile || !profile.name)
        return null;



    return (
        <CommentItem
            name={profile.name}
            imageUri={'place.holder'}
            comment={postComment.comment}
            createdAt={postComment.createdAt}
        />

    )
}

export default PostCommentList
