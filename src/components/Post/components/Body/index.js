import React from 'react';
import { Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles'

let lastPress = 0;

const Body = ({ imageUri, onLikePressed }) => {

    onDoubleTap = () => {
        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 400;

        if (delta < DOUBLE_PRESS_DELAY) {
            onLikePressed();
        }

        lastPress = time;
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={onDoubleTap} >
                <Image source={{ uri: `${imageUri}` }} style={styles.image} />
            </TouchableWithoutFeedback>
        </View>
    );
}

export default Body;