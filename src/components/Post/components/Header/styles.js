import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftHeader: {
        flexDirection: 'row'
    },
    rightHeader: {
        marginRight: 15
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'center'
    },
});

export default styles;