import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    image: {
        height: 500,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
    }
});

export default styles;