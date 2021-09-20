import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
    leftHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
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