import React, { useState, useEffect } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment'
import styles from './styles';
import { retrievePostById, likePostById, unlikePostById } from '../../../../api/posts';

const Footer = ({ navigation, authProfile, profile, post, likesCount, commentsCount, isBookmarked, isLiked, onBookmarkPressed, onLikePressed }) => {

    const [postData, setPostData] = useState(null);

    const [postTime, setPostTime] = useState('');

    moment.updateLocale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: 'a few seconds',
            ss: '%d seconds',
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            w: "a week",
            ww: "%d weeks",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }
    });

    // Side-effect cleanup
    useEffect(() => {
        return () => { };
    }, []);

    useEffect(() => {
        var now = moment(new Date()); //todays date
        var end = moment(post.createdAt); // another date
        var duration = moment.duration(now.diff(end));
        var days = duration.asWeeks();
        if (duration.asWeeks() >= 1) {
            setPostTime(moment(post.createdAt).format("MMMM Do YYYY"));
        } else {
            setPostTime(moment(post.createdAt).fromNow(false));
        }
    }, []);

    const fetchPostData = async () => {
        try {
            const data = await retrievePostById(post._id);
            if (data) {
                setPostData(data);
                setPostCreatedTime();
            }
        } catch (e) {
            console.log(`Post: Failed to retrievePostById for id ${post._id}`, e);
        }
    }

    const setPostCreatedTime = () => {
        var now = moment(new Date()); //todays date
        var end = moment(post.createdAt); // another date
        var duration = moment.duration(now.diff(end));
        var days = duration.asWeeks();
        if (duration.asWeeks() >= 1) {
            setPostTime(moment(post.createdAt).format("MMMM Do YYYY"));
        } else {
            setPostTime(moment(post.createdAt).fromNow(false));
        }
    }

    const navigateToCommentsScreen = () => {
        navigation.push('Comments', { post: post, profile: profile });
    }

    const navigateToLikeScreen = () => {
        navigation.push('Root', { screen: 'Likes', params: { post: post } });
    }

    return (
        <View style={styles.container} >
            <View style={styles.icons}>
                <View style={styles.iconsLeft}>
                    <TouchableWithoutFeedback onPress={onLikePressed} >
                        {
                            isLiked ? <Ionicons name='heart' size={25} color={'red'} />
                                : <Ionicons name='heart-outline' size={25} />
                        }
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={navigateToCommentsScreen}>
                        <Text style={styles.flipY}><Ionicons name='chatbubble-outline' size={22.5} /></Text>
                    </TouchableWithoutFeedback>
                    <Ionicons name='paper-plane-outline' size={22.5} />
                </View>
                <View style={styles.iconsRight}>
                    <TouchableWithoutFeedback onPress={onBookmarkPressed}>
                        {
                            isBookmarked ? <FontAwesome name='bookmark' size={22} color={'black'} />
                                : <FontAwesome name='bookmark-o' size={22} />
                        }
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={navigateToLikeScreen}>
                <Text style={styles.likes} >{likesCount.toLocaleString()} Likes</Text>
            </TouchableWithoutFeedback>
            < View style={styles.postDetails}>
                <Text style={styles.postUser} >{profile.name}</Text>
                {post && !!post.caption && <Text style={styles.caption} >{post.caption}</Text>}
            </View>
            <TouchableWithoutFeedback onPress={navigateToCommentsScreen}>
                <View>
                    {commentsCount > 0 && (commentsCount == 1 ?
                        (<Text style={styles.comments} >View 1 comment</Text>) :
                        (<Text style={styles.comments} >View all {commentsCount} comments</Text>))}
                </View>
            </TouchableWithoutFeedback>
            <Text style={styles.postedAt} >{postTime}</Text>
        </View >
    );
}

export default Footer;