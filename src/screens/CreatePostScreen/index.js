import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, Button, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { uploadToS3 } from '../../utils/s3Helper';
import { createPost } from '../../api/posts';
import Loading from '../../components/Loading';

const CreatePostScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [caption, setCaption] = useState('');
    const messageInput = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const image = route.params.image;

    const uploadImage = () => {
        setIsLoading(true);
        uploadToS3(image).then(data => {
            console.log('Uploading image', data)

            if (data && data.Location) {
                try {
                    const res = createPost(data.Location, caption);
                    res.then(response => {
                        console.log('uploaded image', response.status);
                        if (response) {
                            navigation.pop(); //close screen after successful create
                        }
                    })
                } catch (e) {
                    console.warn(e);
                }
            }

        })

        setIsLoading(false);
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={5} >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <MaterialIcons name='arrow-back-ios' size={24} />
                        </TouchableOpacity>
                        <Text style={[{ fontSize: 17, fontWeight: '600', marginLeft: 20 }]}>New post</Text>
                        <Button title="Share" onPress={() => { uploadImage() }} />
                    </View>
                    <View style={styles.border} />
                    <View style={styles.content}>
                        <Image source={{ uri: `${image.path}` }} style={styles.image} />
                        <ScrollView keyboardDismissMode='on-drag'>
                            <TextInput
                                clearButtonMode="always"
                                style={styles.input}
                                placeholder="Write a caption..."
                                placeholderTextColor="#9e9e9e"
                                onChangeText={setCaption}
                                ref={messageInput}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.border} />
                </KeyboardAvoidingView>
            </SafeAreaView>
            {isLoading && <Loading isLoading={true} />}
        </>
    )
}

export default CreatePostScreen

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 10
    },
    border: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 1,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        height: 150,
        width: 115,
        marginHorizontal: 10
    },
    input: {
        flex: 1,
        paddingHorizontal: 10
    },
});
