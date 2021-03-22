import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

const Stat = ({ statName, statCount }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.statCount}>{statCount}</Text>
            <Text style={styles.statName}>{statName}</Text>
        </View>
    )
}

export default Stat;