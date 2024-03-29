import React, { useState, useEffect } from 'react';
import { Text, TouchableWithoutFeedback, View, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment'
import styles from './styles';
import { retrievePostById, likePostById, unlikePostById } from '../../../../api/posts';
import { fetchProfileByUsername } from '../../../../api/profile';

const Footer = ({ navigation, authProfile, profile, post, likesCount, commentsCount, isBookmarked, isLiked, onBookmarkPressed, onLikePressed, toggleMenu }) => {

    const [postData, setPostData] = useState(null);
    const [duration, setDuration] = useState(null);

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
        setDuration(duration);
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

    const fetchAndNavigateToTaggedProfile = async (taggedProfile) => {
        const username = taggedProfile.substring(1);
        try {
            const profiles = await fetchProfileByUsername(username);
            if (profiles && profiles.length > 0)
                navigation.push('Root', { screen: 'ProfileScreen', params: { otherProfile: profiles[0], isAuthProfile: false } });
            else
                createUserNotFoundAlert();
        } catch (e) {
            console.log(`Post: Failed to fetchAndNavigateToTaggedProfile for username ${username}`, e);
        }
    }

    const createUserNotFoundAlert = () =>
        Alert.alert(
            "User not found",
            [
                {
                    text: "Close",
                    // onPress: () => closeScreen(),
                    style: "cancel"
                },
            ]
        );

    const hashTagFormatter = (string) => {
        return string.split(/((?:^|\s)(?:#[a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
            if (v.includes('#')) {
                return <Text key={i} style={{ color: '#0d5780' }} onPress={() => navigation.navigate('Tags', { tag: v })}>{v}</Text> //console.log(v)
            } else if (v.includes('@')) {
                return <Text key={i} style={{ color: '#0d5780' }} onPress={() => fetchAndNavigateToTaggedProfile(v)}>{v}</Text> //console.log(v)

            } else {
                return <Text key={i}>{v}</Text>
            }
        })
    };

    if (!duration)
        return null;

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
                    <TouchableWithoutFeedback onPress={() => toggleMenu(post._id)}>
                        <Ionicons name='paper-plane-outline' size={22.5} />
                    </TouchableWithoutFeedback>
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
                {post && !!post.caption && <Text style={styles.caption}>{hashTagFormatter(post.caption)}</Text>}
            </View>
            <TouchableWithoutFeedback onPress={navigateToCommentsScreen}>
                <View>
                    {commentsCount > 0 && (commentsCount == 1 ?
                        (<Text style={styles.comments} >View 1 comment</Text>) :
                        (<Text style={styles.comments} >View all {commentsCount} comments</Text>))}
                </View>
            </TouchableWithoutFeedback>
            {duration.asWeeks() >= 1 ? <Text style={styles.postedAt} >{moment(post.createdAt).format("MMMM Do YYYY")}</Text> :
                <Text style={styles.postedAt} >{moment(post.createdAt).fromNow(false)}</Text>}
        </View >
    );
}

export default Footer;