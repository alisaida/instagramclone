import React from 'react';
import { View, Text, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';

const ShoppingScreen = () => {

    const handleNotification = () => {
        PushNotification.localNotification({
            title: 'Test',
            message: 'test',
            playSound: true,
        });
    }

    return (
        <View style={{ height: 1500 }} >
            <>
                <Text style={{ marginTop: 300, fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>Shop</Text>
                <Button
                    // onPress={handleNotification}
                    title="Handle Notification"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </>
        </View >
    );
}

export default ShoppingScreen;