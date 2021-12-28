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
        marginHorizontal: 3,
        marginVertical: 2,
    },
    caption: {
        marginHorizontal: 3,
        marginVertical: 2,
    },
    postDetails: {
        flexDirection: 'row',

    },
    comments: {
        color: '#595857',
        marginHorizontal: 3,
        marginVertical: 2,
        fontSize: 13
    },
    postedAt: {
        color: '#595857',
        marginHorizontal: 3,
        marginVertical: 2,
        fontSize: 13
    },

});

export default styles;