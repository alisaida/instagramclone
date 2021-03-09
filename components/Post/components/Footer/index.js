import React, { useState, useEffect } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


import styles from './styles';

const Footer = ({ caption, likesCount: likesCountProp, postedAt, isLiked: isLikedProp, isSaved: isSavedProp }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const onLikePressed = () => {
        setIsLiked(!isLiked);
        const amount = isLiked ? -1 : 1;
        setLikesCount(likesCount + amount);
    }

    const onSavePressed = () => {
        setIsSaved(!isSaved);
    }

    useEffect(() => {
        setLikesCount(likesCountProp);
        setIsLiked(isLikedProp);
        setIsSaved(isSavedProp);
    }, []);

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
                    <Text style={styles.flipY}><Ionicons name='chatbubble-outline' size={22.5} /></Text>
                    <Ionicons name='paper-plane-outline' size={22.5} />
                </View>
                <View style={styles.iconsRight}>
                    <TouchableWithoutFeedback onPress={onSavePressed}>
                        {
                            isSaved ? <FontAwesome name='bookmark' size={22} color={'black'} />
                                : <FontAwesome name='bookmark-o' size={22} />
                        }
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <Text style={styles.likes} >{likesCount} Likes</Text>
            <Text style={styles.caption} >{caption}</Text>
            <Text style={styles.postedAt} >{postedAt}</Text>
        </View >
    );
}

export default Footer;