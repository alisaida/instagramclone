import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    iconsLeft: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconsRight: {
        marginRight: 5
    },
    flipY: {
        alignSelf: 'flex-start',
        transform: [{ rotateY: '180deg' }],
    },
    likes: {
        fontWeight: 'bold',
        margin: 3,
    },
    postUser: {
        fontWeight: 'bold',
        margin: 3,
    },
    caption: {
        margin: 3,
    },
    postDetails: {
        flexDirection: 'row',

    },
    comments: {
        color: '#595857',
        margin: 3,
    },
    postedAt: {
        color: '#595857',
        margin: 3,
    },

});

export default styles;