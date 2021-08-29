import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    image: {
        height: 400,
        flex: 1,
        width: null,
        resizeMode: 'cover',

        // maxWidth: Dimensions.get('window').width,
        // height: 400,
        // resizeMode: 'cover',
    }
});

export default styles;