import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

import moment from 'moment';


import ProfilePicture from '../../../ProfilePicture';

const CommentItem = ({ profile, comment, createdAt }) => {


    const navigation = useNavigation();

    moment.updateLocale('en', {
        relativeTime: {
            s: '1s',
            ss: '%ds',
            m: "1m",
            mm: "%dm",
            h: "1h",
            hh: "%dh",
            d: '1d',
            dd: (day) => {
                if (day < 7) {
                    return day + 'd';
                }
                else {
                    var weeks = Math.round(day / 7);
                    return weeks + (weeks > 1 ? 'w' : 'w');
                }
            },
            M: () => {
                return 4 + 'w';
            },
            MM: (month) => {
                return month * 4 + 'w';
            },
            y: "y",
            yy: "%dy"
        }
    });

    if (!profile)
        return null;

    const goToProfile = () => {
        navigation.push('Root', { screen: 'ProfileScreen', params: { otherProfile: profile, isAuthProfile: false } });
    }

    return (
        <View>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={goToProfile} >
                    <ProfilePicture uri={profile.profilePicture} size={30} />
                </TouchableWithoutFeedback>
                <View style={styles.commentContainer}>
                    <View style={styles.commentDetails}>
                        <Text style={{ flexShrink: 1 }}>
                            {/* profile name */}
                            <TouchableWithoutFeedback onPress={goToProfile}>

                                <Text style={styles.postBy}>{profile.name}</Text>
                            </TouchableWithoutFeedback>
                            {/* space */}
                            <Text> </Text>
                            {/* comment */}
                            <Text style={styles.comment}>{comment}</Text>
                        </Text>
                    </View>
                    <Text style={styles.postedAt}>{moment(createdAt).fromNow(true)}</Text>
                </View>
            </View>
        </View >
    )
}

export default CommentItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 10,
        // alignItems: 'center',
        width: "80%"
    },
    commentContainer: {
        marginTop: 6,
        marginLeft: 3
    },
    commentDetails: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: 2
    },
    postBy: {
        fontWeight: 'bold',
    },
    comment: {
        fontSize: 14,
    },
    postedAt: {
        fontSize: 14,
        color: '#8d8f91',
    }
})
