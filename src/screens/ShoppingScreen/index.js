import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import PushNotification from 'react-native-push-notification';
import CacheImage from '../../components/CacheImage'
import * as fs from 'react-native-fs';

const ShoppingScreen = () => {

    const handleNotification = () => {
        PushNotification.localNotification({
            title: 'Test',
            message: 'test',
            playSound: true,
        });
    }

    const deleteFile = () => {
        const path = fs.CachesDirectoryPath + '/instagram-clone/NEx77';

        fs.exists(`${path}`).then((exists) => {
            if (exists) {
                fs.unlink(path).catch(error => {
                    console.log(error)
                })
                console.log('file deleted')
            }
        })


    }

    return (
        <View style={{ height: 1000 }} >
            <>
                <Text style={{ marginTop: 200, fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>Shop</Text>
                <CacheImage showProgress={true} style={{ width: 200, height: 200, marginHorizontal: 40 }}
                    uri={'https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg'} />
                <Button
                    onPress={deleteFile}
                    title="Handle Notification"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </>
        </View >
    );
}

export default ShoppingScreen;